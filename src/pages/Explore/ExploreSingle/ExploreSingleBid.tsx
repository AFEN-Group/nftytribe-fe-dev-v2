import { useEffect, useContext } from 'react'
import useState from 'react-usestateref'
import { useNavigate, useParams } from 'react-router-dom'
import { ThemeContext } from '../../../context/ThemeContext'
// import { AuthContext } from '../../../context/AuthContext'
import ContractContext from '../../../context/ContractContext'
import { publicRequest } from '../../../utils/requestMethods'
//import { format } from 'timeago.js'
import { CircularProgress } from '@material-ui/core'
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
import moment from 'moment'
// import Eye from './assets/eye.svg'
// import Eye2 from './assets/eye2.svg'
import Container from '../../../components/Container/Container'
import UpdatePrompt from '../../../components/Modals/UpdatePrompt/UpdatePrompt'
import erc20 from '../../../smart_contracts/afenToken.json'

import { TwitterShareButton } from 'react-share'
import toast from 'react-hot-toast'

import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc1155Abi from '../../../smart_contracts/erc1155Mintable.json'
import erc1155MarketplaceAbi from "../../../smart_contracts/erc1155Market.json"
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import erc1155MintableAbi from '../../../smart_contracts/erc1155Mintable.json'
import erc721MarketplaceAbi from '../../../smart_contracts/erc721Market.json'
//import erc1155MarketplaceAbi from '../../../smart_contracts/erc1155Market.json'
import Web3 from 'web3'
import contracts from '../../../web3-Service/contractAddress'
import globals from '../../../utils/globalVariables'

// import { shortenAddress } from '../../../utils/formatting'

import Loader from '../../../components/Loader/Loader'
//import BuyModal from './BuyModal'
import BidModal from './BidModal'
import { shortenAddress } from '../../../utils/formatting'
import PutOnSaleModal from './PutOnSaleModal'
import { UserContext } from '../../../context/UserContext'
import UseAxios from '../../../hooks/AxiosConfig/useAxios'
import Protected from '../../../hooks/AxiosConfig/axiosInstance'
import { ModeCommentSharp } from '@material-ui/icons'
import { ChainContext } from '../../../context/chain'
declare const window: any


const ExploreSingle = () => {
    const url = window.location.href
    const { collectionAddress, id } = useParams()
    const params = new URLSearchParams(window.location.search)
    const lazy_mint = params.get('lazy_mint')
    const seller = params.get('seller')

    const navigate = useNavigate()
    //const [priceType, setPriceType] = useState('auction')
    const [tab, setTab] = useState('art')
  
    
    
    const [showPrompt, setShowPrompt] = useState(false)
    
    const [activities, setActivities] = useState<any>()
    const [auctionData, setAuctionData] = useState<any>()
    //const [showBuy, setShowBuy] = useState(false)
    const [showBid, setShowBid] = useState(false)
    const [showPutOnSale, setShowPutOnSale] = useState(false)
    // const [collectedNft, setCollectedNft] = useState(false)
    // const [endDate, setEndDate] = useState<any>()
    const [countX, setCountX] = useState<any>()
    const [walletAddress, setWalletAddress] = useState('')
    const [itemCollected, setItemCollected] = useState(false)
    // const [authState] = useContext<any>(AuthContext)
    const [themeState] = useContext<any>(ThemeContext)
    const [isBidActive, setIsBidActive] = useState<any>()
    const [canCollect, setCanCollect] = useState<any>()
    const dark = themeState.dark
   
    // network
    
    
    // erc721 addresses
    const [erc721MintableAddress, setErc721MintableAddress] = useState<any>('')
    const [erc721MarketplaceAddress, setErc721MarketplaceAddress] = useState<any>('')
    // erc 1155 addresses
    const [erc1155MintableAddress, setErc1155MintableAddress] = useState<any>('')
    const [erc1155MarketplaceAddress, setErc1155MarketplaceAddress] = useState<any>('')

    const [timeLeft, setTimeLeft] = useState<any>({
        hours: '',
        minutes: '',
        seconds: '',
    })
   
    const [showDrop, setShowDrop] = useState(false)
    const [showShare, setShowShare] = useState(false)

    const closePrompt = () => {
        setShowPrompt(false)
    }
    
 const wallet_address = sessionStorage.getItem('currentAccount')
  const currentChain = localStorage.getItem('chain')
    useEffect(() => {
        window.scrollTo(0, 0)
       
       
        //console.log(wallet_address)

        // if (currentChain === globals.mainnetEth.chainId) {
           
        //     setErc721MintableAddress(contracts.erc721MintableAddress)
        //     setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
        //     setErc1155MintableAddress(contracts.erc1155MintableAdddress)
        //     setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
        // }
        // else if (currentChain === '0x38'||'0x61') {
          
            setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
            setErc721MarketplaceAddress(contracts.BSC_erc721MarketplaceAddress)
            setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
            setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
        // }
        if (wallet_address) {
            setWalletAddress(wallet_address)
        }
    }, [])
    const { loading, Response, error, fetchData } = UseAxios()

  useEffect(()=>{
    fetchData({
        method: 'get',
        url: `/api/nft/listings/${id}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
    })

  },[])
    
// console.log(collectionAddress);
/*@ts-ignore*/
const nft:any= Response?.data
const timeout= new Date(nft?.timeout).getTime()-moment.now()
// const timeleft= new Date(timeout-moment.now())


const getTimeleft=()=>{
    const day = Math.floor(timeout/86400000)
    const hours= Math.floor((timeout-(day*86400000))/3600000)
    const min= Math.floor((timeout-((day*86400000)+(hours*3600000)))/60000)

    return `${day}d ${hours}h ${min}m`
}
   const [tokenName,setTokenName]=useState('')
   

   const auctionFetch = async () => {
        console.log('starting');
        
        let erc721Contract

        let marketPlaceContract

        let web3: any = new Web3(window.ethereum)
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);

            erc721Contract = new web3.eth.Contract(
                erc721Abi,
                collectionAddress,
            )

            marketPlaceContract = await new web3.eth.Contract(
                marketPlaceAbi,
                erc721MarketplaceAddress,
            )


        } else {
            toast.error(`Please connect wallet!`,
                {
                    duration: 3000,
                }
            )
        }

       console.log('continue')
        const erc20token = new web3.eth.Contract(erc20.abi, nft.moreInfo.erc20TokenAddress)
        const owner = await erc721Contract.methods.ownerOf(nft?.tokenId).call()
        
       console.log(await erc20token.methods);
        
        const name = await erc20token.methods.symbol().call()
        // console.log("ownerr", owner)
        const auctionInfo = await marketPlaceContract.methods.auctions(collectionAddress, nft.tokenId).call()
        //alert('ggg')
        // console.log("infoo>>>>", auctionInfo)
        setTokenName(name)
        setAuctionData(auctionInfo)

        if (auctionInfo.highestBidder.toLocaleUpperCase() === walletAddress.toLocaleUpperCase()) {
            setCanCollect(true)
        } else {
            setCanCollect(false)
        }


    }

    useEffect(() => {
        auctionFetch()
    }, [collectionAddress,id,erc721MarketplaceAddress,countX,Response])


  const {userState,setUserState}=useContext(UserContext)

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
    const {chain}=useContext(ChainContext)
    const handleSubmit = async () => {
        const verified = userState?.user?.email
        if (verified) {
        const currentChainId = sessionStorage.getItem('chain')
       
        
      
             
            if (currentChainId === chain.filter((chain: any) => { return chain.id === nft.chainId })[0].chain){

                const wallet_address = sessionStorage.getItem('currentAccount')
             
                if (wallet_address) {
                    console.log(walletAddress);
                    
                    setShowBid(true)
                } else {
                   
                    toast.error(` Please connect wallet`,
                        {
                            duration: 3000,
                        }
                    )

                }
            }
        else {
           
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
    const timeOut= new Date(nft?.timeout).getTime()>moment.now()

    const handleClose = () => {
        //setShowConnect(false)
        setShowBid(false)
        setShowPutOnSale(false)
    }
    const [bids,setBids]=useState([])
    const getOffers=async()=>{
       let offers= await Protected(sessionStorage.getItem('token'))['get'](`api/nft/bids/${id}`)
       console.log(offers);
       setBids(offers.data.results)
       
    }

    const getDate=(data:string)=>{
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    } 
    const time = (data: string) => {
        const date = new Date(data)
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

//    console.log(auctionData);
   
    return (
        <>
            {/* <Header /> */}
            {showPutOnSale && (
                <PutOnSaleModal
                    handleClose={handleClose}
                    nft={nft}
                   
                />
            )}
            {showBid && (
                <BidModal
                    handleClose={handleClose}
                    nft={nft}
                 
                    itemCollected={itemCollected}
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
                            <div className={style.titleBx}>
                                <h2>{nft?.name }</h2>
                                <p>from the {nft?.name || 'Afen'} collection.</p>
                            </div>
                        </div>
                        <div className={style.body}>
                            <div className={style.left}>
                                {lazy_mint ? (
                                    <div className={style.itemImg}>
                                        {!loading ? (
                                            nft?.cardImage ? (
                                                <img
                                                    src={
                                                        nft?.metadata?.image.includes('ipfs/') ||
                                                            nft?.metadata?.image.includes('ipfs://')
                                                            ? getImage(nft?.metadata?.image)
                                                            : nft?.metadata?.image
                                                    }
                                                    alt="itemImg"
                                                />
                                            )  : (
                                                <img src={ItemImg} alt="itemImg" />
                                            )
                                        ) : (
                                            <div className={style.loaderBx}>
                                                <Loader />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={style.itemImg}>
                                        {!loading ? (
                                            nft?.url ? (
                                                <img
                                                    src={
                                                            nft?.sImg ?`data:image/png;base64,${nft.sImg}`:  nft?.url.includes('ipfs/') ||
                                                            nft?.url.includes('ipfs://')
                                                            ? getImage(nft?.url)
                                                            : nft?.metadata?.image
                                                    }
                                                    alt="itemImg"
                                                />
                                            )  : (
                                                <img src={ItemImg} alt="itemImg" />
                                            )
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
                                        {/* <div
                                            className={
                                                tab === 'activity' ? style.navItemActive : style.navItem
                                            }
                                            onClick={() => setTab('activity')}
                                        >
                                            <p>The Activity</p>
                                        </div> */}
                                        <div
                                            className={
                                                tab === 'offers' ? style.navItemActive : style.navItem
                                            }
                                            onClick={() =>{
                                                getOffers()
                                                setTab('offers')}}
                                        >
                                            <p>Offers</p>
                                        </div>
                                    </div>
                                    <div onClick={()=>setShowDrop(!showDrop)} className={style.rightIcons}>
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
                                                    <div className={style.dropItem} onClick={() => {
                                                        navigator.clipboard.writeText(url);
                                                        toast.success('Copied!!')
                                                    }}>Copy URL
                                                    
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11 17H7C5.61667 17 4.43767 16.5123 3.463 15.537C2.48767 14.5623 2 13.3833 2 12C2 10.6167 2.48767 9.43733 3.463 8.462C4.43767 7.48733 5.61667 7 7 7H11V9H7C6.16667 9 5.45833 9.29167 4.875 9.875C4.29167 10.4583 4 11.1667 4 12C4 12.8333 4.29167 13.5417 4.875 14.125C5.45833 14.7083 6.16667 15 7 15H11V17ZM8 13V11H16V13H8ZM13 17V15H17C17.8333 15 18.5417 14.7083 19.125 14.125C19.7083 13.5417 20 12.8333 20 12C20 11.1667 19.7083 10.4583 19.125 9.875C18.5417 9.29167 17.8333 9 17 9H13V7H17C18.3833 7 19.5627 7.48733 20.538 8.462C21.5127 9.43733 22 10.6167 22 12C22 13.3833 21.5127 14.5623 20.538 15.537C19.5627 16.5123 18.3833 17 17 17H13Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {/* )} */}

                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={style.rightTitles}>
                                    <div className={style.userBx}>
                                        <img src={dark === 'true' ? User : User2} alt="user" />
                                        {nft && (
                                            <p>{nft?.user?.username}</p>
                                        )}
                                    </div>
                                    <div className={style.bronze}>
                                        <p>{nft?.amount>1 ? 'Multiple Items' : 'Single Item'}{' '}</p>
                                    </div>
                                   
                                </div>
                                {tab === 'art' && (
                                    <div
                                        className={`${style.info} animate__animated animate__fadeIn`}
                                    >
                                        <div className={style.description}>
                                            <h2>Description</h2>

                                            <p>
                                                {nft?.description ||
                                                 
                                                    'No description.'}{' '}
                                            </p>
                                        </div>
                                        <div className={style.prices}>
                                            {!loading && (
                                                <div

                                                    className={`${style.bidPrices} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                                                        } `}
                                                >
                                                    {(timeOut && !loading) && (
                                                        <div className={style.bids}>
                                                            <div className={style.bidBx}>
                                                                <div className={style.bidBlue}>
                                                                    Current bid
                                                                </div>

                                                                {auctionData?.currentBid && (
                                                                    <p>
                                                                        {Web3.utils.fromWei(
                                                                            auctionData?.currentBid?.toString(),
                                                                            'ether'
                                                                        ) || ''}{' '}
                                                                        {tokenName}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className={style.bidBx2}>
                                                                <div className={style.bidBlue}>
                                                                    Starting price
                                                                </div>
                                                                {auctionData?.startingPrice && (
                                                                    <p>
                                                                        {Web3.utils.fromWei(
                                                                            auctionData?.startingPrice?.toString(),
                                                                            'ether'
                                                                        ) || ''}{' '}
                                                                       {tokenName}
                                                                    </p>)}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {
                                                        //auctionData?.startingPrice !== '0' ||
                                                        timeOut ? (
                                                            <div className={style.time}>
                                                                {/* <p>2d 13h 23m 19s</p> */}
                                                                <p>
                                                                    {getTimeleft()}
                                                                </p>

                                                            </div>
                                                        ) : (
                                                            <div className={style.time}>
                                                                <p>Bid ended</p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )}


                                        </div>
                                        {nft?.amount>1 && (
                                            <p>Number of copies : {nft.amount}</p>
                                        )}
                                        <div className={style.Btns}>


                                            <>
                                             
                                                    <button
                                                        disabled={loading || !timeOut}
                                                        className={`${style.gradBtn} 
                                                        
                                                        ${dark === 'true' ? 'yellowBtn' : 'blueBtn'} `}
                                                        onClick={handleSubmit}
                                                    >
                                                        Bid
                                                     </button> 
                                            </>

                                        </div>

                                    </div>
                                )}
                               
                                {tab === 'offers' && (
                                    <div
                                        className={`${style.offers} animate__animated animate__fadeIn`}
                                    >
                                        <div className={style.offersContent}>
                                            <div style={{fontWeight:'bolder'}} className={style.offer}>
                                                <div style={{ width: '15%' }} className={style.offerUser}>

                                                    <p>User Name</p>
                                                </div>
                                                <div style={{ width: '25%' }} className={style.offerAddr}>
                                                    <p>Wallet Address</p>
                                                </div>
                                                <div style={{ width: '15%' }} className={style.offerAddr}>
                                                    <p>Bid</p>
                                                </div>
                                                <div style={{ width: '15%' }} className={style.offerAddr}>
                                                    <p>Date</p>
                                                </div>
                                                <div className={style.offerAddr}>
                                                    <p>time</p>
                                                </div>
                                            </div>
                                           {
                                          bids.length>0 &&  bids?.map((result:any)=>(
                                                <div className={style.offer}>
                                                    <div style={{width:'15%'}} className={style.offerUser}>
                                                       
                                                        <p>{result?.user.username}</p>
                                                    </div>
                                                  <div style={{ width: '25%' }} className={style.offerAddr}>
                                                        <p>{shortenAddress(result?.user.walletAddress)}</p>
                                                    </div>
                                                  <div style={{ width: '15%' }} className={style.offerAddr}>
                                                        <p>{result.amount}</p>
                                                    </div>
                                                    <div style={{ width: '15%' }} className={style.offerAddr}>
                                                        <p>{getDate(result.createdAt)}</p>
                                                    </div>
                                                    <div className={style.offerAddr}>
                                                        <p>{time(result.createdAt)}</p>
                                                    </div>
                                                </div>
                                            ))
                                           }
                       
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

export default ExploreSingle
