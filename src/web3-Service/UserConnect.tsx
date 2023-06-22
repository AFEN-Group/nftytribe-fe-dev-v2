import { useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
// import { AuthContext } from '../context/AuthContext'
import { publicRequest } from '../utils/requestMethods'
import toast from 'react-hot-toast'
import UseAxios from '../hooks/AxiosConfig/useAxios'
import { disconnect } from 'process'
import { UserContext } from '../context/UserContext'
//import networks from './networks.json'
declare const window: any

const chainss: any = {
  rinkeby: {
    chainId: `0x${Number(4).toString(16)}`
  }
}
const networks: any = {
  bsc: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "tBNB",
      decimals: 18
    },
    rpcUrls: [
      "https://data-seed-prebsc-1-s1.binance.org:8545",
      "https://data-seed-prebsc-2-s1.binance.org:8545",
      "https://data-seed-prebsc-1-s2.binance.org:8545",
      "https://data-seed-prebsc-2-s2.binance.org:8545",
      "https://data-seed-prebsc-1-s3.binance.org:8545",
      "https://data-seed-prebsc-2-s3.binance.org:8545"

    ],
    blockExplorerUrls: ["https://testnet.bscscan.com"]
  },
  bscMain: {
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
  },


  ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    rpcUrls: [
      "https://mainnet.infura.io/v3/45b5a21bfa5b4429af59109069821ed3",
      "wss://mainnet.infura.io/ws/v3/45b5a21bfa5b4429af59109069821ed3",
      "https://api.mycryptoapi.com/eth",
      "https://cloudflare-eth.com"
    ],
    blockExplorerUrls: ["https://etherscan.io"]
  },


  rinkeby: {
    chainId: `0x${Number(4).toString(16)}`,
    chainName: "Ethereum Testnet Rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "RIN",
      decimals: 18
    },
    rpcUrls: [
      "https://rinkeby.infura.io/v3/45b5a21bfa5b4429af59109069821ed3",
      "wss://rinkeby.infura.io/ws/v3/45b5a21bfa5b4429af59109069821ed3"
    ],
    blockExplorerUrls: ["https://rinkeby.etherscan.io"]
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
  // const [authState, setAuthState] = useContext<any>(AuthContext)
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
  const { userState,setUserState}=useContext(UserContext)
  const [currentAccount, setCurrentAccount] = useState<any>(
    sessionStorage.getItem('currentAccount') || undefined,
  )
  const [chain, setChain] = useState()
  const { loading, Response, error, fetchData } = UseAxios()
  
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      console.log(window.ethereum.chainId);
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (window.location.host.includes('localhost') || window.location.host.includes('staging')){
          if (window.ethereum.chainId === '0x4' || window.ethereum.chainId === '0x61') { // for both testnet eth and bn
            //if (window.ethereum.chainId === '0x61') { // for testnet bsc
            //if (window.ethereum.chainId === '0x1') { // for eth only
            // console.log(window.ethereum.chainId)
            sessionStorage.setItem('chain', window.ethereum.chainId)
            sessionStorage.setItem('currentAccount', accounts[0])
            setUserInfo({
              ...userInfo,
              account: accounts[0],
              chain: window.ethereum.chainId,
            })
            setUserState({ ...userState, currentAccount: accounts[0], walletType: 'Metamask' })

            console.log('connected');

            setWalletType("MetaMask")




            setWalletError('')
          } else {
            toast.error(`Wrong network, please switch to recommended networks!`,
              {
                duration: 5000,
              }
            )
            //console.log(window.ethereum.chainId);

          }
        }

        else{
          if (window.ethereum.chainId === '137' || window.ethereum.chainId === '0x38' || window.ethereum.chainId === '0x89') { // for both eth and bnb on mainnet
         // if (window.ethereum.chainId === '0x4' || window.ethereum.chainId === '0x61') { // for both testnet eth and bn
          //if (window.ethereum.chainId === '0x61') { // for testnet bsc
          //if (window.ethereum.chainId === '0x1') { // for eth only
          // console.log(window.ethereum.chainId)
          sessionStorage.setItem('chain', window.ethereum.chainId)
          sessionStorage.setItem('currentAccount', accounts[0])
          setUserInfo({
            ...userInfo,
            account: accounts[0],
            chain: window.ethereum.chainId,
          })
        setUserState({...userState,currentAccount:accounts[0],walletType:'Metamask'})

        console.log('connected');
        
          setWalletType("MetaMask")
          



          setWalletError('')
        } else {
          toast.error(`Wrong network, please switch to recommended networks!`,
            {
              duration: 5000,
            }
          )
          //console.log(window.ethereum.chainId);

        }
        }
       
        // console.log("network1 >> ", window.ethereum.chainId);
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Pls install metamask and try again')
    }
  }
 

  // const connectSafePal = async()=>{
  //   if(window.safepal && !window.safepal.isConnected){
  //     //  await window.safepal.connect()
  //     const account =await window.safepalProvider.enable()
  //     if (window.safepalProvider.chainId === '0x1' || window.safepalProvider.chainId === '0x38') { // for both eth and bnb on mainnet
  //       // if (window.ethereum.chainId === '0x4' || window.ethereum.chainId === '0x61') { // for both testnet eth and bn
  //       //if (window.ethereum.chainId === '0x61') { // for testnet bsc
  //       //if (window.ethereum.chainId === '0x1') { // for eth only
  //       // console.log(window.ethereum.chainId)
  //       sessionStorage.setItem('chain', window.safepalProvider.chainId)
  //       sessionStorage.setItem('currentAccount', account[0])
  //       setUserInfo({
  //         ...userInfo,
  //         account: account[0],
  //         chain: window.ethereum.chainId,
  //       })
  //       setUserState({...userState,currentAccount:account[0]})

        
  //       setWalletType("MetaMask")
  //       sessionStorage.setItem("walletType", 'safePal')

     
  //       setWalletError('')
  //     } else {
  //       toast.error(`Wrong network, please switch to recommended networks!`,
  //         {
  //           duration: 5000,
  //         }
  //       )
  //       //console.log(window.ethereum.chainId);

  //     }
      
  //   }
  // }
  const disconnectSafePal= async()=>{
    if(window?.safepal?.isConnected){
      delete window.web3
    delete window.safepal
    await  window.safepal.disconnect()
    }
  }
  const handleNetworkSwitch = async (networkName: string) => {

    try {
      if (!window.ethereum) throw new Error('No wallet found');
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            ...networks[networkName]
          }
        ]
      })
      toast.success(`Switched Networks.`,
        { duration: 5000 })
    } catch (err) {
      console.log(err)

    }

  }
  const handleNetworkSwitch2 = async (networkName: string) => {

    try {
      if (!window.ethereum) throw new Error('No wallet found');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            ...chainss[networkName]
          }
        ]
      })
      toast.success(`Switched Networks.`,
        { duration: 5000 })
    } catch (err: any) {
      console.log(err)
      toast.error(`${err.message}.`,
        { duration: 5000 })
    }

  }


  const disableEthereum = () => {
    return new Promise(async (resolve, reject) => {
      try {
        delete window.web3
        sessionStorage.removeItem('currentAccount')
        sessionStorage.removeItem('chain')
        sessionStorage.removeItem('user')
        //window.location = '/'
        //window.location.reload()
        toast.success(`Disconnected .`,
          { duration: 3000 })
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
        // console.log("guyyy")
        sessionStorage.setItem('currentAccount', provider.accounts[0])
        setUserInfo({
          ...userInfo,
          account: provider.accounts[0],
          chain: provider.chainId,
        })
        setUserState({...userState,currentAccount:provider.accounts[0],walletType:'WalletConnect'})
        setWalletType("WalletConnect")
        
    
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
        sessionStorage.setItem('currentAccount', accounts[0])
        setCurrentAccount(sessionStorage.getItem('currentAccount'))
        console.log("account was set>>>", currentAccount)
      })

      // Subscribe to chainId change
      provider.on('chainChanged', (chainId: any) => {
        console.log('chainId>>>>', chainId)
        setChain(chainId)
        sessionStorage.setItem('chain', chainId)
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
        sessionStorage.removeItem('currentAccount')
        sessionStorage.removeItem('chain')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('walletType')
        // toast.success(`Disconnected .`,
        //   { duration: 3000 })
        // window.location = '/'
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
          sessionStorage.removeItem('currentAccount')
          sessionStorage.removeItem('chain')
          //sessionStorage.removeItem('user')
          setUserInfo({
            ...userInfo,
            account: ' ',
          })
          console.log(userInfo?.balance, '<<<< wallet balance')
          //window.location = '/'
          window.location.reload()

        } catch (err) {
          console.log(err)
        }
      })
    }
    const onChainChange = async () => {
      window.ethereum.on('chainChanged', (chainId: string) => {
        //console.log()
        try {
          sessionStorage.removeItem('currentAccount')
          sessionStorage.removeItem('chain')
        
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
    walletError,
    walletType,
    enableWalletConnect,
    handleNetworkSwitch,
    handleNetworkSwitch2,
    disconnectWalletConnect,
    
    // connectSafePal,
    disconnectSafePal
  }
}

export default UserConnect
