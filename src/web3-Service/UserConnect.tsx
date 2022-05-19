import { useState, useEffect } from 'react'
//import web3 from 'web3'
declare const window: any

const UserConnect = () => {
  //const [web3, setWeb3] = useState<any>(null);
  //const [walletError, setWalletError] = useState('')
  const [userInfo, setUserInfo] = useState<any>({
    account: '',
    chain: '',
  })

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        //if (window.ethereum.chainId === '0x1') {
        localStorage.setItem('chain', window.ethereum.chainId)
        localStorage.setItem('currentAccount', accounts[0])
        setUserInfo({
          ...userInfo,
          account: accounts[0],
          chain: window.ethereum.chainId,
        })
        window.location.reload()
        //setWalletError('')
        // } else {
        //   setWalletError('Wrong Chain Selected!')
        // }
        // console.log("network1 >> ", window.ethereum.chainId);
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Pls install metamask and try aagain')
    }
  }

  const disableEthereum = () => {
    return new Promise(async (resolve, reject) => {
      try {
        delete window.web3
        localStorage.removeItem('currentAccount')
        localStorage.removeItem('chain')
        //window.location = '/'
        window.location.reload()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  useEffect(() => {
    const onWalletChange = async () => {
      window.ethereum.on('accountsChanged', (accounts: string) => {
        try {
          localStorage.removeItem('currentAccount')
          localStorage.removeItem('chain')
          setUserInfo({
            ...userInfo,
            account: ' ',
          })
          console.log(userInfo.balance, '<<<< wallet balance')
          //window.location = '/'
        } catch (err) {
          console.log(err)
        }
      })
    }
    const onChainChange = async () => {
      window.ethereum.on('chainChanged', (chainId: string) => {
        //console.log()
        try {
          localStorage.removeItem('currentAccount')
          localStorage.removeItem('chain')
          setUserInfo({
            ...userInfo,
            chain: ' ',
          })
          window.location.reload()
        } catch (err) {
          console.log(err)
        }
      })
    }
    onWalletChange()
    onChainChange()
  }, [userInfo])

  return {
    connectToMetaMask,
    disableEthereum,
    //walletError,
  }
}

export default UserConnect
