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
// import Eye from './assets/eye.svg'
// import Eye2 from './assets/eye2.svg'
import Container from '../../../components/Container/Container'
import UpdatePrompt from '../../../components/Modals/UpdatePrompt/UpdatePrompt'

import globals from '../../../utils/globalVariables'
import { TwitterShareButton } from 'react-share'
import toast from 'react-hot-toast'

// import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import erc1155Abi from '../../../smart_contracts/erc1155Mintable.json'
// import erc1155MarketplaceAbi from "../../../smart_contracts/erc1155Market.json"
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
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
  //const [priceType, setPriceType] = useState('auction')
  const [tab, setTab] = useState('art')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  /*@ts-ignore*/
  // const [nft, setNft] = useState<any>(Response?.data)
  const nft= Response?.data
  const [showPrompt, setShowPrompt] = useState(false)
  //const [nftDetails, setNftDetails] = useState<any>()
  const [nftDetails, setNftDetails, nftDetailsRef] = useState<any>()
  const [activities, setActivities] = useState<any>()
  const [auctionData, setAuctionData] = useState<any>()
  const [showBuy, setShowBuy] = useState(false)
  const [showPutOnSale, setShowPutOnSale] = useState(false)
  //const [showBid, setShowBid] = useState(false)
  const [collectedNft, setCollectedNft] = useState(false)
  const [endDate, setEndDate] = useState<any>()
  const [walletAddress, setWalletAddress] = useState('')
  const [itemCollected, setItemCollected] = useState(false)
  // const [authState] = useContext<any>(AuthContext)
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const { handleAuctionBid, checkIfBIdTimePasses, collectNft } = useContext(
    ContractContext,
  )
  // network
  const [chain, setChain, chainRef] = useState<string>()
  const [chainId, setChainId, chainIdRef] = useState<string>()
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

  // const [timeDifference, setTimeDifference] = useState<any>()
  // const {id}=useParams()
  const [showDrop, setShowDrop] = useState(false)
  const { userState,setUserState}= useContext(UserContext)
  const closePrompt = () => {
    setShowPrompt(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const wallet_address = sessionStorage.getItem('currentAccount')
    const currentChainId = sessionStorage.getItem('chain')
    //console.log(wallet_address)
    //

    if (currentChainId === '0x1') {
      setChain('eth')
      setChainId('eth')
      setErc721MintableAddress(contracts.erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.erc1155MarketplaceAddress)
    }
    else if (currentChainId === '0x38') {
      setChain('bsc')
      setChainId('bsc')
      setErc721MintableAddress(contracts.BSC_erc721MintableAddress)
      setErc721MarketplaceAddress(contracts.BSC_erc721MarketplaceAddress)
      setErc1155MintableAddress(contracts.BSC_erc1155MintableAdddress)
      setErc1155MarketplaceAddress(contracts.BSC_erc1155MarketplaceAdddress)
    }
    if (wallet_address) {
      setWalletAddress(wallet_address)
    }
    
        fetchData({
          method:'get',
          url:`/api/nft/listings/${id}`,
          axiosInstance:Protected(sessionStorage.getItem('token'))
        })
   

  }, [collectionAddress, id, lazy_mint])
  /*@ts-ignore*/
  console.log(nft);
  
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
  console.log(userState?.user);
  
  const handleSubmit = async () => {
    // const verified = userState?.user?.verified
    if (userState.user.email ) {
      const currentChainId = sessionStorage.getItem('chain')
      console.log(currentChainId);
      
      if (currentChainId === '0x1') {
        setChain('eth')
      }
      if (currentChainId === '0x38') {
        setChain('bsc')
      }
      const itemChain = nftDetails?.chain
      console.log('me', chainRef.current)
      console.log('them', itemChain)
      if (chainRef.current === itemChain)
        if (nft && nft?.listingType) {
          const wallet_address = sessionStorage.getItem('currentAccount')
          console.log(nft?.listingType)
          if (wallet_address) {
            setShowBuy(true)
          } else {
            //setShowConnect(true)
            //alert('Please connect wallet')
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
        console.log(chainRef.current,itemChain);
        
        //alert("Wrong chain!, Please switch to the chain of this NFT")
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
  const handleSale = async (e: any) => {
    //const itemChain = nftDetails?.chain
    //if (chainRef.current === itemChain) {
    e.preventDefault();
    if (nft && !nft?.listingType) {
      //put on sale
      setShowPutOnSale(true)

    } else {
      //put off sale
      if (nft?.amount>1) {
        try {
          setIsLoading(true)
          let erc1155Contract
          let marketplace_contract
          let web3: any
          if (window.ethereum) {
            web3 = new Web3(window.ethereum)

            erc1155Contract = new web3.eth.Contract(
              erc1155MintableAbi,
              erc1155MintableAddress,
            )
            marketplace_contract = new web3.eth.Contract(
              erc1155MarketplaceAbi,
              erc1155MarketplaceAddress,
            )
          } else {
            //alert('connect to meta mask wallet')
            toast.error(` Please connect wallet`,
              {
                duration: 3000,
              }
            )

            //setShowConnect(true)
          }

          const data = nftDetails
         
          if (data.market_type !== '0') {
            data.on_sale = true
          }

          let updatableData
          if (data.on_sale) {

            if (data.market_type === '2') {
              data.starting_time =
                new Date(data.starting_time).getTime() / 1000
              data.ending_time = new Date(data.ending_time).getTime() / 1000
            }
            //console.log(web3.utils.toWei(data.price.toString(), 'ether'), 'price', returnvalues.id)
            const putOffSale = await marketplace_contract.methods
              .putOffSale(
                data?.collection_address,
                parseInt(data?.token_id),

              )
              .send({ from: walletAddress })
            console.log(putOffSale)


            updatableData = {
              token_id: data.token_id,
              wallet_address: walletAddress,
              collection_address:
                data.collection_address,
              file: data.file,
              transaction_hash: data.transactionHash,
              type: 'putOffSale',
              chain_id: data.chain,

              on_sale: false,
              marketplace_type: data.marketplace_type,
              order_detail: {
                starting_price: web3.utils.toWei(
                  data.price.toString(),
                  'ether',
                ),
                start_time: data.starting_time,
                expiration_time: data.ending_time,
              },
              price: web3.utils.toWei(data.price.toString(), 'ether'),
            }
          } else {
            updatableData = {
              token_id: data.token_id,
              wallet_address: walletAddress,
              collection_address:
                data.collection_address,
              file: data.file,
              transaction_hash: data.transactionHash,
              type: 'putOffSale',
              chain_id: data.chain,
              on_sale: false
            }
          }

          const updateCollectible = await fetch(
            `${globals.baseURL}/collectibles/update-collectible`,
            {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(updatableData),
            },
          )

          const res = await updateCollectible.json()

          console.log(res.data)
          setIsLoading(false)

          window.location.reload()
          setIsLoading(false)

        } catch (err) {
          console.log(err)

          setIsLoading(false)
        }
      }
      if (nft.amount===1) {
        try {
          setIsLoading(true)
          let erc721Contract
          let marketplace_contract
          let web3: any
          if (window.ethereum) {
            web3 = new Web3(window.ethereum)

            erc721Contract = new web3.eth.Contract(
              erc721Abi,
              erc721MintableAddress,
            )
            marketplace_contract = new web3.eth.Contract(
              marketPlaceAbi,
              erc721MarketplaceAddress
            )
          } else {
            //alert('connect to meta mask wallet')
            toast.error(` Please connect wallet`,
              {
                duration: 3000,
              }
            )
            //setShowConnect(true)
          }

          const data = nftDetails
          // data.wallet_address = wallet_address
          // data.chain = chain
          // data.collection_address =
          //   userInput.collection_address || erc721Mintable_address
          // data.upload = imageFile
          // data.is_multiple = false
          // data.nft_type = userInput.category
          // data.cardImage = cardImage

          if (data.market_type !== '0') {
            data.on_sale = true
          }

          let updatableData
          if (data.on_sale) {
            //console.log(parseInt(returnvalues.token_id), 'hello')

            if (data.market_type === '2') {
              data.starting_time =
                new Date(data.starting_time).getTime() / 1000
              data.ending_time = new Date(data.ending_time).getTime() / 1000
            }
            try {
              const putOffSale = await marketplace_contract.methods
                .putSaleOff(
                  data?.collection_address,
                  parseInt(data?.token_id),

                )
                .send({ from: walletAddress })
            } catch (err) {
              console.log("actual err", err)
            }


            
            

            updatableData = {
              token_id: data.token_id,
              wallet_address: walletAddress,
              collection_address:
                data.collection_address,
              file: data.file,
              transaction_hash: data.transactionHash,
              type: 'putOffSale',
              chain_id: data.chain,
              //order_type: data.market_type,

              on_sale: false,
              price: 0,
            }
          } else {
            updatableData = {
              token_id: data.token_id,
              wallet_address: walletAddress,
              collection_address:
                data.collection_address,
              file: data.file,
              transaction_hash: data.transactionHash,
              type: 'putOffSale',
              chain_id: data.chain,
            }
          }

          const updateCollectible = await fetch(
            `${globals.baseURL}/collectibles/update-collectible`,
            {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(updatableData),
            },
          )

          const res = await updateCollectible.json()

          console.log(res.data)
          setIsLoading(false)
          window.location.reload()
          setIsLoading(false)
        } catch (err) {
          console.log(err)

          setIsLoading(false)
        }
      }

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
    // console.log(url);
    return url


  }

  const handleClose = () => {
    //setShowConnect(false)
    setShowBuy(false)
    setShowPutOnSale(false)
    //setShowBid(false)
  }

  return (
    <>
      {/* <Header /> */}
      {showBuy && (
        <BuyModal
          handleClose={handleClose}
          nft={nft}
          nftDetails={nftDetails}

        />
      )}
      {showPutOnSale && (
        <PutOnSaleModal
          handleClose={handleClose}
          nft={nft}
          nftDetails={nftDetails}
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
                <h2>{nft?.metadata?.name || nft?.name}</h2>
                <p>from the {nft?.name || 'Afen'} collection.</p>
              </div>
            </div>
            <div className={style.body}>
              <div className={style.left}>
                {lazy_mint ? (
                  <div className={style.itemImg}>
                    {!loading ? (
                     
                        <img
                          src={getImageUrl(nft?.url)}
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
                          src={getImageUrl(nft?.url)}
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
                    <div
                      className={
                        tab === 'offers' ? style.navItemActive : style.navItem
                      }
                      onClick={() => setTab('offers')}
                    >
                      <p>Offers</p>
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
                        {/* {!showShare ? ( */}
                        {/* <div className={style.dropContent}>
                                                        <p onClick={() => setShowShare(!showShare)}>
                                                            Share
                                                        </p>
                                                        <p className='disable_link'>Report</p> */}
                        {/* </div>) : ( */}
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
                      <p>{shortenAddress(nftDetails?.owner||nft.user.walletAddress)}</p>
                    )}
                  </div>
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
                            {parseInt(nft?.price, 10).toString() ||
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
                    <div className={style.Btns}>
                      {nft?.user.walletAddress !== walletAddress ? (
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
                          disabled={
                            !isLoaded || isLoading
                            // || nftDetails?.on_sale // remove on sale check
                          }
                          className={`${style.regBtn} ${dark === 'true' ? 'lightBorder' : 'darkBorder'} 
                                                        ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                            }`}
                          onClick={handleSale}
                        >
                          {!nft?.listingType ?
                            'Put On Sale'
                            : 'Remove from Sale'}
                        </button>
                      )}


                    </div>

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
                          {/* <p>{activity.timestamp}</p> */}
                        </div>
                      </div>
                    ))}
                    {/* <div className={style.activitySingle}></div> */}

                    {/* <div>
                      {activities?.map((activity: any, i: any) => {
                        return (
                          activity?._id && (
                            <div
                              className={style.activitySingle}
                              key={activity._id}
                            >
                              <div className={style.aAddress}>
                                <p>{activity.from}</p>
                              </div>
                              <div className={style.aType}>
                                <p>{activity.type}jjjjj</p>
                              </div>
                              <div className={style.aDate}>
                                <p>{activity.timestamp.substr(0, 10)}</p>
                              </div>
                              <div className="">
                                <p>hhhhh</p>
                              </div>
                            </div>
                          )
                        )
                      })}
                    </div> */}
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
                        {/* <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div> */}
                      </div>
                      {/* <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div> */}
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
