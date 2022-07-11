import { useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AuthContext } from '../context/AuthContext'
import { publicRequest } from '../utils/requestMethods'
//import networks from './networks.json'
declare const window: any

const networks: any = {
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
}

const UserConnect = () => {
  const [web3, setWeb3] = useState<any>(null)
  const [walletError, setWalletError] = useState('')
  const [walletType, setWalletType] = useState('')
  const [userInfo, setUserInfo] = useState<any>({
    account: '',
    chain: '',
  })
  const [authState, setAuthState] = useContext<any>(AuthContext)
  const provider: any = new WalletConnectProvider({
    // rpc: {
    //   '0xfa2': 'https://rpc.testnet.fantom.network',
    // },
    // rpc: {
    //   '0x1' : 'https://mainnet.infura.io/v3/45b5a21bfa5b4429af59109069821ed3'
    // }
    // rpc: {
    //   56: "https://bsc-dataseed1.binance.org",
    // }
    // infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    infuraId: "45b5a21bfa5b4429af59109069821ed3",
  })
  const [currentAccount, setCurrentAccount] = useState<any>(
    localStorage.getItem('currentAccount') || undefined,
  )
  const [chain, setChain] = useState()

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (window.ethereum.chainId === '0x4' || window.ethereum.chainId === '0x61') { // for both eth and bnb
          //if (window.ethereum.chainId === '0x4') { // for testnet
          //if (window.ethereum.chainId === '0x1') { // for eth only
          console.log(window.ethereum.chainId)
          localStorage.setItem('chain', window.ethereum.chainId)
          localStorage.setItem('currentAccount', accounts[0])
          setUserInfo({
            ...userInfo,
            account: accounts[0],
            chain: window.ethereum.chainId,
          })
          try {
            const user = {
              params: {
                wallet_address: localStorage.getItem('currentAccount'),
              },
            }
            const logUserReq = await publicRequest.post(
              `/user/create-user`,
              user,
            )
            console.log('user>>', logUserReq.data.data)
            setAuthState({
              ...authState,
              user: logUserReq.data.data,
              isFetching: false,
              error: false,
            })
            setWalletType("MetaMask")
            localStorage.setItem("walletType", 'MetaMask')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } catch (err) {
            console.log(err)
            setAuthState({
              ...authState,
              isFetching: false,
              error: true,
            })
          }
          //window.location.reload()
          setWalletError('')
        } else {
          //setWalletError('Wrong network, please switch to ethereum mainnet!')
          setWalletError('Wrong network, please switch to recommended networks!')
        }
        console.log("network1 >> ", window.ethereum.chainId);
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Pls install metamask and try again')
    }
  }

  const handleNetworkSwitch = async (networkName: string) => {
    const changeNetwork = async (networkName: string) => {
      try {
        if (!window.ethereum) throw new Error('No wallet found');
        await await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              ...networks[networkName]
            }
          ]
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const disableEthereum = () => {
    return new Promise(async (resolve, reject) => {
      try {
        delete window.web3
        localStorage.removeItem('currentAccount')
        localStorage.removeItem('chain')
        localStorage.removeItem('user')
        window.location = '/'
        //window.location.reload()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const enableWalletConnect = async () => {
    try {
      await provider.enable()
      console.log("enable", provider)
      if (provider.chainId === 1) {
        console.log("guyyy")
        localStorage.setItem('currentAccount', provider.accounts[0])
        setUserInfo({
          ...userInfo,
          account: provider.accounts[0],
          chain: provider.chainId,
        })

        try {

          const user = {
            params: {
              wallet_address: localStorage.getItem('currentAccount'),
            },
          }
          const logUserReq = await publicRequest.post(
            `/user/create-user`,
            user,
          )
          console.log('user>>', logUserReq.data.data)
          setAuthState({
            ...authState,
            user: logUserReq.data.data,
            isFetching: false,
            error: false,
          })
          setWalletType("WalletConnect")
          localStorage.setItem("walletType", 'WalletConnect')
          setTimeout(() => {
            window.location.reload()
          }, 500)
        } catch (err) {
          console.log(err)
          setAuthState({
            ...authState,
            isFetching: false,
            error: true,
          })
        }
      } else {
        setWalletError('Wrong network, please switch to ethereum mainnet!')
      }

      setWeb3(new Web3(provider))
      provider.on("connect", (accounts: any) => {
        console.log("account?", accounts)
      })
      // Subscribe to accounts change
      provider.on('accountsChanged', (accounts: any) => {
        console.log(accounts)
        localStorage.setItem('currentAccount', accounts[0])
        setCurrentAccount(localStorage.getItem('currentAccount'))
        console.log("account was set>>>", currentAccount)
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: any) => {
        console.log('chainId>>>>', chainId)
        setChain(chainId)
        localStorage.setItem('chain', chainId)
      })

      // Subscribe to session disconnection
      provider.on('disconnect', (code: any, reason: any) => {
        console.log(code, reason)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const disconnectWalletConnect = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await provider.disconnect()
        localStorage.removeItem('currentAccount')
        localStorage.removeItem('chain')
        localStorage.removeItem('user')
        localStorage.removeItem('walletType')
        window.location = '/'
        //window.location.reload()
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
          //localStorage.removeItem('user')
          setUserInfo({
            ...userInfo,
            account: ' ',
          })
          console.log(userInfo.balance, '<<<< wallet balance')
          window.location = '/'
          //window.location.reload()
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
          //localStorage.removeItem('user')
          setUserInfo({
            ...userInfo,
            chain: ' ',
          })
          window.location = '/'
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
    walletError,
    walletType,
    enableWalletConnect,
    disconnectWalletConnect
  }
}

export default UserConnect
