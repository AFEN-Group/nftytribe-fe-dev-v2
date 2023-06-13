import { useEffect, useContext } from 'react'
import useState from 'react-usestateref'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ThemeContext } from '../../../context/ThemeContext'
// import { AuthContext } from '../../../context/AuthContext'
import './index.scss'
import { publicRequest } from '../../../utils/requestMethods'
//import { format } from 'timeago.js'
import Close from './assets/close.svg'
import erc20 from '../../../smart_contracts/afenToken.json'

import axios from 'axios'
import style from './ExploreSingle.module.scss'
import Back from './assets/arrow.svg'
import Back2 from './assets/arrow2.svg'
import ItemImg from './assets/kl.png'
import Twitter from './assets/twitter.svg'
import Twitter2 from './assets/twitter2.svg'
import Header from '../../../components/Header/Header'
import Share from './assets/share.svg'
import Share2 from './assets/share2.svg'
import Dots2 from './assets/dots2.svg'
import Dots from './assets/dots.svg'
import User from './assets/user3.svg'
import User2 from './assets/user4.svg'
import { motion } from 'framer-motion'
import Happy from './assets/happy.svg'

import Container from '../../../components/Container/Container'
import UpdatePrompt from '../../../components/Modals/UpdatePrompt/UpdatePrompt'

import globals from '../../../utils/globalVariables'
import { TwitterShareButton } from 'react-share'
import toast from 'react-hot-toast'

// import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc1155Abi from '../../../smart_contracts/erc1155Mintable.json'
// import erc1155MarketplaceAbi from "../../../smart_contracts/erc1155Market.json"
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import physicalMarket from '../../../smart_contracts/physicalMarket.json'
import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc721MarketplaceAbi from '../../../smart_contracts/erc721Market.json'
//import erc721CollectionAbi from '../../../smart_contracts/erc721Collection.json'
import erc1155MintableAbi from '../../../smart_contracts/erc1155Mintable.json'
import erc1155MarketplaceAbi from '../../../smart_contracts/erc1155Market.json'
import Web3 from 'web3'
import contracts from '../../../web3-Service/contractAddress'

// import { shortenAddress } from '../../../utils/formatting'

import Loader from '../../../components/Loader/Loader'
import BuyModal from './BuyModal'
//import BidModal from './BidModal'
import { shortenAddress } from '../../../utils/formatting'
import PutOnSaleModal from './PutOnSaleModal'
import { UserContext } from '../../../context/UserContext'
import UseAxios from '../../../hooks/AxiosConfig/useAxios'
import Protected from '../../../hooks/AxiosConfig/axiosInstance'
import { ChainContext } from '../../../context/chain'
import TextInput from 'src/components/Inputs/TextInput'
import SelectOption from 'src/components/Inputs/SelectOption'
import { TokenContext } from 'src/App'
declare const window: any

// const erc721Mintable_address = contracts.erc721MintableAddress
// const erc721Marketplace_address = contracts.erc721MarketplaceAddress
// const erc1155Mintable_adddress = contracts.erc1155MintableAdddress



const ExploreSingleBuy = () => {
  const url = window.location.href
  const { collectionAddress, id } = useParams()
  const params = new URLSearchParams(window.location.search)
  const lazy_mint = params.get('lazy_mint')
  // const seller = params.get('seller')
  const { loading, Response, error, fetchData } = UseAxios()

  const navigate = useNavigate()
  const [tab, setTab] = useState('art')
  /*@ts-ignore*/
  const nft= Response?.data
  const [showPrompt, setShowPrompt] = useState(false)
  //const [nftDetails, setNftDetails] = useState<any>()
  const [nftDetails, setNftDetails, nftDetailsRef] = useState<any>()
  const [activities, setActivities] = useState<any>()
  const [showBuy, setShowBuy] = useState(false)
  const [showPutOnSale, setShowPutOnSale] = useState(false)
  //const [showBid, setShowBid] = useState(false)
  const [collectedNft, setCollectedNft] = useState(false)
  const [endDate, setEndDate] = useState<any>()
  const [walletAddress, setWalletAddress] = useState('')
  const [itemCollected, setItemCollected] = useState(false)
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
 
  // network
 
  const [chainId, setChainId, chainIdRef] = useState<string>()
  // erc721 addresses
  const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
  const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
  // erc 1155 addresses
  const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
  const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')

  
  
  const [showDrop, setShowDrop] = useState(false)
  const { userState,setUserState}= useContext(UserContext)
  const {pathname}=useLocation()
  // const params= useParams()
  const closePrompt = () => {
    setShowPrompt(false)
  }
  const {chain}=useContext(ChainContext)
  console.log(chain);
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const wallet_address = sessionStorage.getItem('currentAccount')
    const currentChainId = sessionStorage.getItem('chain')
    
    //

    if (currentChainId === '0x1') {
     
      setErc721MintableAddress(contracts.erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
    }
    else if (currentChainId === '0x38'||currentChainId==='0x61') {
      
      setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.BSC_erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
    }
    if (wallet_address) {
      setWalletAddress(wallet_address)
    }
    
    if(pathname.includes('item')){
      fetchData({
        method: 'get',
        url: `/api/nft/meta-data?tokenId=${id}&chain=${currentChainId}&contractAddress=${collectionAddress}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
      })
    }
     else   fetchData({
          method:'get',
          url:`/api/nft/listings/${id}`,
          axiosInstance:Protected(sessionStorage.getItem('token'))
        })
   

  }, [collectionAddress, id, lazy_mint,userState])
  /*@ts-ignore*/
 
  
  const getImage = (uri: any) => {
    let url
    if (uri.includes('ipfs/')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
    } else if (uri.includes('ipfs://')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
    }
    return url
  }
 
  
  const handleSubmit = async () => {
    if (userState.user.email ) {
      const currentChainId = sessionStorage.getItem('chain')
      console.log(currentChainId);   
      if (currentChainId === chain.filter((chain :any)=>{return chain.id=== nft.chainId})[0].chain)
        if (nft && nft?.listingType) {
          const wallet_address = sessionStorage.getItem('currentAccount')
          console.log(nft?.listingType)
          if (wallet_address) {
            setShowBuy(true)
          } else {
           
            toast.error(` Please connect wallet`,
              {
                duration: 3000,
              }
            )
          }
        } else {
          console.log('not available')
        }
      else {
        console.log(currentChainId,nft.chainId);
        toast.error(` Wrong chain!, Please switch to the chain of this NFT`,
          {
            duration: 3000,
          }
        )
      }
    } else {
      setShowPrompt(true)
    }
  }
   const web3= new Web3(window.ethereum)
  const handleSale = async (e: any) => {
    //  @ts-ignore
    
    const TokenContract = new web3.eth.Contract(erc721Abi, collectionAddress)
    // @ts-ignore
    const marketPlaceContract = new web3.eth.Contract(marketPlaceAbi,
      erc721MarketplaceAddress,
    )

    if(nft.isListed ||nft.listingType){
     await marketPlaceContract.methods.putSaleOff(nft.tokenId,collectionAddress).send({from:walletAddress})
      

      window.location.reload()
    }
    else{
       setShowPutOnSale(!showPutOnSale)
    }
   
    
        
  
  }

  const getImageUrl = (uri: any) => {
    // console.log(uri);
    let url
    if (uri?.includes('ipfs://')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
    }
    else url = uri
    return url


  }

  const handleClose = () => {
    setShowBuy(false)
    setShowPutOnSale(false)
    
  }
console.log(nft,userState);
  const [purchaseDt,setPDT]=useState(false)
 const PurchaseDt=(e:any)=>{
  e.preventDefault()
  if(userState.user.email){
      setPDT(true)
  }
  else setShowPrompt(true)
 }
 const [step,setStep]=useState(1) 
  return (
    <>
    {purchaseDt &&<DTPopUp close={()=>setPDT(false)} nft={nft} changeStep={(e:any)=>setStep(e)} step={step}/>}
      {/* <Header /> */}
      {showBuy && (
        <BuyModal
          handleClose={handleClose}
          nft={nft}
          collectionAddress={collectionAddress}
          nftDetails={nftDetails}
          

        />
      )}
      {showPutOnSale && (
        <PutOnSaleModal
          handleClose={handleClose}
          nft={nft}
          id={id}
          nftDetails={nftDetails}
          collectionAddress={collectionAddress}
        />
      )}
      {showPrompt && <UpdatePrompt closePrompt={closePrompt} />}
      <Container>
        <div
          className={`${style.container} animate__animated animate__fadeInLeft`}
        >
          <div className={style.content}>
            <div className={style.top}>
              <div className={style.backBx} onClick={() => navigate(-1)}>
                <img src={dark === 'true' ? Back2 : Back} alt="back" />
                <p>Back</p>
              </div>
              <div className={style.titleBx + "  header_container"}>
                <div >
                    <h2>{nft?.metadata?.name || nft?.name}</h2>
                <p>from the {nft?.name || 'Afen'} collection.</p>
                </div>
                {nft?.physical &&<div className='nb'>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#52525B" stroke-width="2" />
                    <path d="M11 15.5V16M11 6V12V6Z" stroke="#52525B" stroke-width="2" stroke-linecap="round" />
                  </svg>
                  This NFT has a Physical Item
                </div>}
              
              </div>
            </div>
            <div className={style.body}>
              <div className={style.left}>
                {lazy_mint ? (
                  <div className={style.itemImg}>
                    {!loading ? (
                     
                        <img
                          src={getImageUrl(nft?.url||nft?.metadata.image)}
                          alt="itemImg"
                        />
                     ) : (
                      <div className={style.loaderBx}>
                        <Loader />
                      </div>
                    )}
                  </div>
                ) : (
                    <div className={style.itemImg}>
                      {!loading ? (

                        <img
                          src={getImageUrl(nft?.url||nft?.metadata.image)}
                          alt="itemImg"
                        />
                      ) : (
                        <div className={style.loaderBx}>
                          <Loader />
                        </div>
                      )}
                    </div>
                )}
              </div>
              <div className={style.right}>
                <div className={style.rightTop}>
                  <div className={style.rightNav}>
                    <div
                      className={
                        tab === 'art' ? style.navItemActive : style.navItem
                      }
                      onClick={() => setTab('art')}
                    >
                      <p>The Art</p>
                    </div>
                    <div
                      className={
                        tab === 'activity' ? style.navItemActive : style.navItem
                      }
                      onClick={() => setTab('activity')}
                    >
                      <p>The Activity</p>
                    </div>
                   
                  </div>
                  <div className={style.rightIcons} onClick={() => setShowDrop(!showDrop)}>
                    <img src={dark === 'true' ? Share2 : Share} alt="share" />
                    {/* <img src={dark === 'true' ? Dots2 : Dots} alt="dots" /> */}
                  </div>
                  {showDrop && (
                    <>

                      <div className={`${style.drop} ${dark === 'true' ? 'darkTheme' : 'lightTheme'} animate__animated animate__fadeInUp animate__faster`}
                      //onClick={() => setShowDrop(!showDrop)}
                      >
                        
                        <div className={style.dropContent2}>
                          <h3>Share NFT</h3>
                          <TwitterShareButton
                            title={"Check out this NFT on Nftytribe"}
                            hashtags={['nftytribe']}
                            url={url}

                          >
                            <div className={style.dropItem}>
                              <p>Twitter</p>
                              <img src={`${dark === 'true' ? Twitter2 : Twitter}`} alt="twitter" />
                            </div>
                          </TwitterShareButton>
                          <div className='copy' onClick={()=>navigator.clipboard.writeText(url)}>Copy URL</div>
                        </div>
                        {/* )} */}

                      </div>
                    </>
                  )}
                </div>
                <div className={style.rightTitles}>
                  {!pathname.includes('item') && <div className={style.userBx}>
                    <img src={dark === 'true' ? User : User2} alt="user" />
                    {nft && (
                      <p>{shortenAddress(nftDetails?.owner || nft?.user.walletAddress)}</p>
                    )}
                  </div>}
                    {pathname.includes('item') && <div className={style.userBx}>
                    <img src={dark === 'true' ? User : User2} alt="user" />
                    {nft && (
                      <p>{shortenAddress(nft?.ownerOf)}</p>
                    )}
                  </div>} 
                  <div className={style.bronze}>
                    <p>{nft?.amount>1 ? 'Multiple Items' : 'Single Item'}{' '}</p>
                  </div>
                  {/* <div className={style.eyes}>
                    <img src={dark === 'true' ? Eye2 : Eye} alt="seen" />
                    <p>1215</p>
                  </div> */}
                </div>
                {tab === 'art' && (
                  <div
                    className={`${style.info} animate__animated animate__fadeIn`}
                  >
                    <div className={style.description}>
                      <h2>Description</h2>

                      <p>
                        {nft?.metadata?.description ||
                          nft?.description ||
                          'No description.'}{' '}
                      </p>
                    </div>
                    <div className={style.prices}>

                      <div className={style.fixedPrices}>
                        <div className={style.priceGreen}>{nft?.listingType} Sale</div>
                        {/* <p>{nft?.amount} BNB</p> */}
                        {nft?.price ? (
                          <p>
                            {Number(nft?.price).toString() ||
                              ''}{' '}
                            {nft.moreInfo.erc20TokenName}
                          </p>
                        ) : (
                          <p>0.00 </p>
                        )}
                      </div>

                    </div>
                    {nft?.amount>1 && (
                      <p>Number of copies : {nft.amount}</p>
                    )}
                   {pathname.includes('item')&& <div className={style.Btns}>
                      {nft?.ownerOf !== walletAddress ? (
                       <button
                          // disabled={
                          //   isLoading
                          // }
                          className={`${nft?.listingType ? style.regBtn : style.regBtn2
                            } ${dark === 'true' ? 'yellowBtn' : 'blueBtn'} `}
                          onClick={handleSubmit}
                        >
                          {!nft?.listingType ?
                            'Not On Sale'
                            : 'Buy'}
                        </button>
                        
                       
                      ) : (
                        <button
                          // disabled={
                        
                          //   // || nftDetails?.on_sale // remove on sale check
                          // }
                          className={`${style.regBtn} ${dark === 'true' ? 'lightBorder' : 'darkBorder'} 
                                                        ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                            }`}
                          onClick={handleSale}
                        >
                          {(!nft?.isListed) ?
                            'Put On Sale'
                            : 'Remove from Sale'}
                        </button>
                      )}


                    </div>}
                    {!pathname.includes('item')&&<div className={style.Btns}>
                      {nft?.user.walletAddress !== walletAddress ? (
                        <>{!nft?.physical && <button
                          // disabled={
                          //   isLoading
                          // }
                          className={`${nft?.listingType ? style.regBtn : style.regBtn2
                            } ${dark === 'true' ? 'yellowBtn' : 'blueBtn'} `}
                          onClick={handleSubmit}
                        >
                          {!nft?.listingType ?
                            'Not On Sale'
                            : 'Buy'}
                        </button>}

                          {
                            nft?.physical && <>
                              <button
                                style={{background:'white'}}
                                className={`${nft?.listingType ? style.regBtn : style.regBtn2
                                  } `}
                                onClick={handleSubmit}
                              >
                                {!nft?.listingType ?
                                  'Not On Sale'
                                  : 'Buy'}
                              </button>
                              <button
                                
                                className={`${nft?.listingType ? style.regBtn : style.regBtn2
                                  } ${dark === 'true' ? 'yellowBtn' : 'blueBtn'}  `}
                                onClick={PurchaseDt}
                              >
                                Rrequest DT item
                              </button>
                            </>
                          }
                        </>
                      ) : (
                        <button
                         
                          className={`${style.regBtn} ${dark === 'true' ? 'lightBorder' : 'darkBorder'} 
                                                        ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                            }`}
                          onClick={handleSale}
                        >
                          {(!nft?.listingType)?
                            'Put On Sale'
                            : 'Remove from Sale'}
                        </button>
                      )}


                    </div>}
                  </div>
                )}
                {tab === 'activity' && (
                  <div
                    className={`${style.activity} animate__animated animate__fadeIn`}
                  >
                    <div className={style.activitySingle}>
                      <div className={style.aAddress}>
                        <p>Address</p>
                      </div>
                      <div className={style.aType}>
                        <p>Activity type</p>
                      </div>
                      <div className={style.aDate}>
                        <p>Date</p>
                      </div>
                    </div>
                    {activities?.map((activity: any, i: any) => (
                      <div className={style.activitySingle} key={activity._id}>
                        <div className={style.aAddress}>
                          {activity.to ? (
                            <p>{shortenAddress(activity?.to)}</p>
                          ) : (
                            <p>{shortenAddress(activity?.from)}</p>
                          )}
                        </div>
                        <div className={style.aType}>
                          <p>{activity?.type}</p>
                        </div>
                        <div className={style.aDate}>
                          <p>{activity?.timeStamp.substr(0, 10)}</p>
                        
                        </div>
                      </div>
                    ))}
             
                  </div>
                )}
                {tab === 'offers' && (
                  <div
                    className={`${style.offers} animate__animated animate__fadeIn`}
                  >
                    <div className={style.offersContent}>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <p>No offers</p>
                        </div>
                  
                      </div>
                    
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ExploreSingleBuy


const DTPopUp=(props:any)=>{
  const [completed,setCompleted]=useState(false)
  const [onsaleParams,setParams]=useState<any>({})
  const Verify=UseAxios()
  const rates=UseAxios()
  const { collectionAddress, id } = useParams()
  const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
  const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
  // erc 1155 addresses
  const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
  const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')
  const [chainId, setChainId, chainIdRef] = useState<string>()

  useEffect(() => {

    const currentChain = sessionStorage.getItem('chain')

    if (currentChain === '0x1') {

      setErc721MintableAddress(contracts.erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
    }
    if (currentChain === '0x38' || currentChain === '0x61') {
      // setChain('bsc testnet')
      setChainId('bsc')
      setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.physical_market)
      setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
    }
  }, [])
  const verify=(e:any)=>{
     e.preventDefault()
    Verify.fetchData({
      method: 'post',
      url: 'api/shipment/verify-address',
      axiosInstance: Protected(sessionStorage.getItem('token')),
      requestConfig: {

        "name": onsaleParams.name,
        "phone": onsaleParams.phone,
        "address": `${onsaleParams.address},${onsaleParams.country},${onsaleParams.state}`
      }
    })
  }

  useEffect(()=>{rates.fetchData({
    method:'get',
    url:`api/shipment/${id}/rates`,
    axiosInstance:Protected(sessionStorage.getItem('token')),

  })},[Verify.Response])

  
  const [rate,setRate]=useState<any>()
  useEffect(()=>{if(Verify.Response)props.changeStep(2)},[Verify.Response])

  const book= UseAxios()
  useEffect(()=>{if(book.Response)props.changeStep(3)},[book.Response])
  const [isLoading,setIsLoading]=useState(false)
  const userWallet =sessionStorage.getItem('currentAccount')
  const tokenInfo:any= useContext(TokenContext)

  // console.log(tokenInfo,props?.nft.price);
  const delp = () => {
    

    const erc20 = tokenInfo?.filter((token: any) => {


      return token.tokenAddress === props.nft.moreInfo.erc20TokenAddress
    })
    const priceIntoken = onsaleParams.rates / (erc20[0]?.usdPrice + 0.2)

    return priceIntoken
  } 
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    let PhysicalMarket
    let erc721Contract
    let erc1155Contract
    let erc20token
    let web3: any
    if (window.ethereum && userWallet) {

      web3 = new Web3(window.ethereum)

      erc721Contract = new web3.eth.Contract(
        erc721Abi,
        props.nft.moreInfo.collectionAddress || erc721MintableAddress,
      )
      console.log(physicalMarket,
        erc721MarketplaceAddress,);
      
      PhysicalMarket = new web3.eth.Contract(
        physicalMarket,
        erc721MarketplaceAddress,
      )
       const deliveryInToken=()=>{
        console.log(tokenInfo);
        
         const erc20= tokenInfo?.filter((token:any)=>{
          
          
          return token.tokenAddress===props.nft.moreInfo.erc20TokenAddress})
         const priceIntoken= onsaleParams.rates/(erc20[0]?.usdPrice + 0.2)

         return priceIntoken
        } 
       
      erc20token = new web3.eth.Contract(erc20.abi, props.nft.moreInfo.erc20TokenAddress)
      // console.log(erc20.abi, props.nft.moreInfo.erc20TokenAddress)

      if (props?.nft?.amount < 2) {
        try {

          // console.log(erc20token)
          const decimal = await erc20token.methods.decimals().call(
            { from: userWallet }
          )
          // console.log(decimal);
          const amount = (Number(props.nft.price)+(deliveryInToken()?deliveryInToken():0)) * (10 ** decimal)
          // console.log(amount);

          console.log(amount);
          
          await erc20token.methods.approve(erc721MarketplaceAddress, `${amount}`).send({ from: userWallet })


          const buyItem = await PhysicalMarket.methods
            .buy(props?.nft.tokenId, props.nft.moreInfo.contractAddress,`${amount}`)
            .send({ from: userWallet })
          console.log(buyItem)
          setIsLoading(false)
          setCompleted(true)
        } catch (err) {
          console.log(err)
          setIsLoading(false)
        }
      }
     
   
      setIsLoading(false)

    } else {
      setIsLoading(false)
    }

  }
  
  
  return(
    <div className='dt_overlay'>
      {completed && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.7,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.1,
                //delay: 0.3,
                scale: {
                  duration: .01,
                },
              },
            },
          }}
          className={`${style.modal} `}
        >
          <div className={style.modalTop}>
            <h1>Congratulations</h1>
            <p className={style.mText}>
              You have successfully purchased item{' '}
              <strong> {' ' + props.nft?.name} </strong>, with a digital twin, go to “collected items” to claim item.
            </p>
            <img src={Close} alt="close" onClick={props.close} />
          </div>
          <div className={style.modalBody2}>
            <div className={style.successImg}>
              <img src={Happy} alt="success" />
            </div>
          </div>
          <Link to="/profile" className={style.modalBtnSingle}>
            <button>View Profile</button>
          </Link>
        </motion.div>
      )}
    { !completed&&<> {props.step < 3 && <form action="">
        <h2>
          Digital twin delivery information
        </h2>
        {props.step === 1 && <><p>
          Verify your details for recieving the physical item
        </p>
          <p style={{ fontSize: '10px', color: 'red', textAlign: 'center' }}>{Verify.error?.data?.message&&Verify.error?.data?.message?.errors[0]}</p>
          <div className="inputs">
            <div className={style.fieldBx}>
              <TextInput
                type="tel"
                inputName="name"
                holder="Name"
                inputHandler={(e: any) => {
                  setParams({ ...onsaleParams, [e.target.name]: e.target.value })
               
                }}
                value={onsaleParams.name}
                required
              />
            </div>   <div className={style.fieldBx}>
              <TextInput
                type="tel"
                inputName="phone"
                holder="Phone Number"
                inputHandler={(e: any) => {
                  setParams({ ...onsaleParams, [e.target.name]: e.target.value })
                }}
                value={onsaleParams['phone']}
                required
              />
            </div>   <div className={style.fieldBx}>
              <TextInput
                type=""
                inputName="country"
                holder="Country"
                inputHandler={(e: any) => {
                  setParams({ ...onsaleParams, [e.target.name]: e.target.value })

                }}
                value={onsaleParams.country}
                required
              />
            </div>   <div className={style.fieldBx}>
              <TextInput
                type="tel"
                inputName="state"
                holder="State"
                inputHandler={(e: any) => {
                  setParams({ ...onsaleParams, [e.target.name]: e.target.value })

                }}
                value={onsaleParams.state}
                required
              />
            </div><div className={style.fieldBx}>
              <TextInput
                type="tel"
                inputName="address"
                holder="Street Address"
                inputHandler={(e: any) => {
                  setParams({ ...onsaleParams, [e.target.name]: e.target.value })

                }}
                value={onsaleParams.address}
                required
              />
            </div>
          </div>
          <div className={'Btns'}>
            <button
              disabled={Verify.loading}
              style={{ background: 'white' }}
              className={'regBtn'}
              onClick={props.close}
            >
              Cancel
            </button>
            <button
              disabled={Verify.loading}
              className={`regBtn
                      blueBtn`}
              onClick={verify}
            >
              Verify
            </button>





          </div></>}
        {props.step === 2 && <><p>
            Kindly choose your mode of delivery that comes with its rate
          </p>
            <div className="inputs">
              <div className={'fieldBx'}>
                <p>Mode Of delivery</p>
                <SelectOption
                options={rates.Response?.data?.data?.couriers.map((data:any) => {
                  console.log(data);
                  
                  return {
                    text: data.courier_name,
                    value:JSON.stringify({total:data.totalUsd,courier_id:data.courier_id,service_code:data.service_code,service:data.courier_name})}})}
                inputHandler={(e: any) => {
                 let value= JSON.parse(e.target.value);
                  
                  setParams({ ...onsaleParams, rates: value.total,service:value.service }); setRate(value)}}
                value={onsaleParams.rates}
                />
              </div>   <div className={'fieldBx'}>
                <p>Rate Of delivery</p>
                <TextInput
                  type="tel"
                  inputName="rates"
                  holder="Phone Number"
                 
                  value={`$${onsaleParams.rates}`}
                  required
                />
              </div>
            </div>
            <div className={'Btns'}>
              <button
                style={{ background: 'white' }}
                className={'regBtn'}
                onClick={props.close}
              >
                Cancel
              </button>
              <button

                className={`regBtn
                      blueBtn`}
                onClick={(e) => {
                        e.preventDefault()
                      book.fetchData({
                        method:'post',
                        url:'api/shipment/book/'+ id,
                        axiosInstance:Protected(sessionStorage.getItem('token')),
                        requestConfig:{
                          "request_token": rates.Response?.data?.data?.request_token ,
                          "service_code": rate?.service_code,
                          "courier_id": rate?.courier_id
                        }
                      })
                }
                }
              >
                Confirm
              </button>





            </div></>}

      </form>} 
       {props.step === 3 && <form action="">
        <h2>
          Digital twin delivery checkout
        </h2>
     <p>
          Please ,review your delivery mode for the purchase of {props?.nft.name + props.nft.tokenId} digital Item
          </p>
         
         <div className="checkout">
          <div><span>Delivery Mode</span> <span>{onsaleParams?.service}</span></div>
            <div><span>Delivery Fee</span><span>${onsaleParams?.rates}</span></div>
            <div><span>Total Fee</span><span>${(Number(props.nft.price) + delp()).toFixed(2)}</span></div>
         </div>
        <p>Item can be shipped to Nigeria, Ghana, South Africa only.</p>
            <div className={'Btns'}>
              <button
              disabled={isLoading}
                style={{ background: 'white' }}
                className={'regBtn'}
                onClick={props.close}
              >
                Cancel
              </button>
              <button
              disabled={isLoading}
                className={`regBtn
                      blueBtn`}
                onClick={handleSubmit
                }
              >
                Confirm
              </button>





            </div>

      </form>}</>}
    </div>
  )
}