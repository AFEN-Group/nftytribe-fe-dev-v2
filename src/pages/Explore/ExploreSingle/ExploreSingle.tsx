import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ThemeContext } from '../../../context/ThemeContext'
import ContractContext from '../../../context/ContractContext'
import { publicRequest } from '../../../utils/requestMethods'
//import { format } from 'timeago.js'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import style from './ExploreSingle.module.scss'
import Back from './assets/arrow.svg'
import Back2 from './assets/arrow2.svg'
import ItemImg from './assets/kl.png'
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

import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import Web3 from 'web3'
// import { shortenAddress } from '../../../utils/formatting'

import Loader from '../../../components/Loader/Loader'
import BuyModal from './BuyModal'
import BidModal from './BidModal'
import { shortenAddress } from '../../../utils/formatting'
declare const window: any

const ExploreSingle = () => {
  const { collectionAddress, id } = useParams()
  const params = new URLSearchParams(window.location.search)
  const lazy_mint = params.get('lazy_mint')

  const navigate = useNavigate()
  //const [priceType, setPriceType] = useState('auction')
  const [tab, setTab] = useState('art')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [nft, setNft] = useState<any>()
  const [nftDetails, setNftDetails] = useState<any>()
  const [activities, setActivities] = useState<any>()
  const [auctionData, setAuctionData] = useState<any>()
  const [showBuy, setShowBuy] = useState(false)
  const [showBid, setShowBid] = useState(false)
  const [collectedNft, setCollectedNft] = useState(false)
  const [endDate, setEndDate] = useState<any>()
  const [walletAddress, setWalletAddress] = useState('')
  const [itemCollected, setItemCollected] = useState(false)
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const { handleAuctionBid, checkIfBIdTimePasses, collectNft } = useContext(
    ContractContext,
  )
  const [timeLeft, setTimeLeft] = useState<any>({
    hours: '',
    minutes: '',
    seconds: '',
  })
  const [timeDifference, setTimeDifference] = useState<any>()

  useEffect(() => {
    window.scrollTo(0, 0)
    const wallet_address = localStorage.getItem('currentAccount')
    //console.log(wallet_address)
    if (wallet_address) {
      setWalletAddress(wallet_address)
    }
    const getTokenDetails = async () => {
      if (lazy_mint) {
        try {
          const details = await publicRequest.get(
            `/collectibles/${collectionAddress}/${id}?lazy_mint=true`,
          )
          //console.log(details)
          const nft = details
          setNftDetails(nft.data.data._doc)
          console.log('show img>>', nft.data.data._doc)
          //setNftPrice(nft.data._doc.price)
          setIsLoading(false)
          setIsLoaded(true)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      } else {
        const contract_address = '0xd5582083916dc813f974ce4ca3f27e6977e161cf'
        let erc721Contract
        let marketPlaceContract
        if (window.ethereum) {
          let web3: any = new Web3(window.ethereum)
          erc721Contract = new web3.eth.Contract(erc721Abi, collectionAddress)
          marketPlaceContract = new web3.eth.Contract(
            marketPlaceAbi,
            contract_address,
          )
        } else {
          alert('connect to meta mask wallet')
        }
        let uri = await erc721Contract.methods.tokenURI(id).call()
        const moralis_uri = `https://deep-index.moralis.io/api/v2/nft/${collectionAddress}/${id}?chain=rinkeby&format=decimal&offset=0&limit=20`
        const { data } = await axios({
          method: 'get',
          url: moralis_uri,
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `PUX3SuXcL8sop16uK0fMwFsbqiBrZE0ty7buGH0SDV155W6tcoksEiUQaPG5FVMd`,
          },
        })

        const nft = data
        console.log('nft>>', nft)
        if (nft.metadata) {
          nft.metadata = JSON.parse(nft.metadata)
        } else {
          if (uri.includes('ipfs/')) {
            // eslint-disable-next-line
            uri = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
          }
          if (uri.includes('ipfs://')) {
            // eslint-disable-next-line
            uri = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
          }
          try {
            const data = await axios({
              method: 'get',
              url: uri,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                  'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'content-type': 'application/json',
              },
            })
            nft.metadata = data
            //console.log(data)
          } catch (err) {}
        }

        const owner = await erc721Contract.methods.ownerOf(id).call()
        nft.owner_of = owner
        setNft(nft)
        console.log(nft)

        const auctionInfo = await marketPlaceContract.methods
          .auctions(collectionAddress, id)
          .call()
        console.log('auction Info', auctionInfo)
        setAuctionData(auctionInfo)
        setIsLoading(false)
        setIsLoaded(true)

        const timestamp = auctionInfo.closingTime
        const date = new Date(timestamp * 1000)
        const datevalues = [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
        ]
        setEndDate(datevalues)
        console.log('>>', datevalues)
        //alert(datevalues) //=>

        //const timeDiffCalc = (dateFuture: any, dateNow: any) => {
        const dateFuture = auctionInfo.closingTime
        //const dateNow: any = new Date()
        const dateNow = auctionInfo.startingTime
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000
        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400)
        diffInMilliSeconds -= days * 86400
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24
        diffInMilliSeconds -= hours * 3600
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60
        diffInMilliSeconds -= minutes * 60
        // calculate minutes
        const seconds = Math.floor(diffInMilliSeconds)
        setTimeLeft({
          hours,
          minutes,
          seconds,
        })
        // setMinutesLeft(minutes);
        // setSecondsLeft(seconds);

        let difference = ''
        if (days > 0) {
          difference += days === 1 ? `${days}d, ` : `${days}d, `
        }

        difference += hours === 0 || hours === 1 ? `${hours}h, ` : `${hours}h, `

        difference +=
          minutes === 0 || hours === 1 ? `${minutes}m` : `${minutes}m`
        console.log('difference >>', difference)
        setTimeDifference(difference)
      }

      //return difference;
    }
    getTokenDetails()

    const getNftDetails = async () => {
      try {
        const details = await publicRequest.get(
          `/collectibles/${collectionAddress}/${id}`,
        )
        console.log('check>>>', details.data)
        setNftDetails(details?.data?.data?._doc)
        setActivities(details?.data?.data?.activities)
        console.log('<<< cu ', details?.data?.data?.activities)
        const ifToBeCollected = await checkIfBIdTimePasses(
          id,
          collectionAddress,
        )
        setCollectedNft(ifToBeCollected)
        console.log('available?>>', ifToBeCollected)
        setIsLoading(false)
        setIsLoaded(true)
      } catch (error) {
        setIsLoading(false)
      }
    }

    getNftDetails()
  }, [collectionAddress, id, lazy_mint])

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
    if (nftDetails?.on_sale) {
      const wallet_address = localStorage.getItem('currentAccount')
      console.log(nftDetails?.marketplace_type)
      if (wallet_address) {
        if (nftDetails?.marketplace_type === 2) {
          setShowBid(true)
        } else {
          setShowBuy(true)
        }
      } else {
        //setShowConnect(true)
        alert('Please connect wallet')
      }
    } else {
      console.log('not available')
    }
  }

  const handleCollect = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const wallet_address = localStorage.getItem('currentAccount')
    const result = await collectNft(
      wallet_address,
      nftDetails?.token_id,
      nftDetails?.collection_address,
    )
    if (result.data) {
      console.log(result)
      setIsLoading(false)
      setItemCollected(true)
      setShowBid(true)

      return
    }
  }

  const handleClose = () => {
    //setShowConnect(false)
    setShowBuy(false)
    setShowBid(false)
  }

  return (
    <>
      <Header />
      {showBuy && (
        <BuyModal
          handleClose={handleClose}
          nft={nft}
          nftDetails={nftDetails}
          //nftPrice={nftPrice}
          //saleType={saleType}
        />
      )}
      {showBid && (
        <BidModal
          handleClose={handleClose}
          nft={nft}
          nftDetails={nftDetails}
          itemCollected={itemCollected}
        />
      )}
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
                <h2>{nft?.metadata?.name || nftDetails?.title}</h2>
                <p>from the {nft?.name || 'Afen'} collection.</p>
              </div>
            </div>
            <div className={style.body}>
              <div className={style.left}>
                {lazy_mint ? (
                  <div className={style.itemImg}>
                    {!isLoading ? (
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
                      ) : nftDetails?.cardImage ? (
                        <img src={nftDetails.cardImage} alt="ItemImg" />
                      ) : (
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
                    {!isLoading ? (
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
                      ) : nftDetails?.cardImage ? (
                        <img src={nftDetails.cardImage} alt="ItemImg" />
                      ) : (
                        <img src={ItemImg} alt="itemImg" />
                      )
                    ) : (
                      // <div className={style.loaderBx}>
                      //   <CircularProgress color="inherit" size="65px" />
                      // </div>
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
                  <div className={style.rightIcons}>
                    <img src={dark === 'true' ? Share2 : Share} alt="share" />
                    <img src={dark === 'true' ? Dots2 : Dots} alt="dots" />
                  </div>
                </div>
                <div className={style.rightTitles}>
                  <div className={style.userBx}>
                    <img src={dark === 'true' ? User : User2} alt="user" />
                    {nftDetails && (
                      <p>{shortenAddress(nftDetails?.wallet_address)}</p>
                    )}
                  </div>
                  {/* <div className={style.bronze}>
                    <p>||| Benin Broxnze</p>
                  </div> */}
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
                          nftDetails?.description ||
                          'No description.'}{' '}
                      </p>
                    </div>
                    <div className={style.prices}>
                      {nftDetails?.marketplace_type === 2 ? (
                        auctionData && (
                          <div
                            //className={style.bidPrices}
                            className={`${style.bidPrices} ${
                              dark === 'true' ? 'darkGradient' : 'lightGradient'
                            } `}
                          >
                            {!collectedNft && (
                              <div className={style.bids}>
                                <div className={style.bidBx}>
                                  <div className={style.bidBlue}>
                                    Current bid
                                  </div>
                                  {/* <p>2800 BNB</p> */}
                                  <p>
                                    {Web3.utils.fromWei(
                                      auctionData?.currentBid,
                                      'ether',
                                    ) || ''}{' '}
                                    ETH
                                    {/* {auctionData?.currentBid} */}
                                  </p>
                                </div>
                                <div className={style.bidBx2}>
                                  <div className={style.bidBlue}>
                                    Starting price
                                  </div>
                                  <p>
                                    {Web3.utils.fromWei(
                                      auctionData?.startingPrice,
                                      'ether',
                                    ) || ''}{' '}
                                    ETH
                                    {/* {auctionData?.currentBid} */}
                                  </p>
                                </div>
                              </div>
                            )}
                            {
                              //auctionData?.startingPrice !== '0' ||
                              !collectedNft ? (
                                <div className={style.time}>
                                  {/* <p>2d 13h 23m 19s</p> */}
                                  <p>
                                    {/* {endDate[2] +
                                    ' ' +
                                    endDate[1] +
                                    ' ' +
                                    endDate[0]} */}
                                    {timeDifference}
                                  </p>
                                  {/* <p>
                                  {endDate[3] +
                                    ' . ' +
                                    endDate[4] +
                                    ' . ' +
                                    endDate[5] +
                                    '0'}
                                </p> */}
                                  {/* <p>{format(auctionData?.closingTime)}</p> */}
                                </div>
                              ) : (
                                <div className={style.time}>
                                  <p>Bid ended</p>
                                </div>
                              )
                            }
                          </div>
                        )
                      ) : (
                        <div className={style.fixedPrices}>
                          <div className={style.priceGreen}>Fixed sale</div>
                          {/* <p>{nft?.amount} BNB</p> */}
                          {nftDetails?.price ? (
                            <p>
                              {Web3.utils.fromWei(nftDetails?.price, 'ether') ||
                                ''}{' '}
                              ETH
                            </p>
                          ) : (
                            <p>0.01 ETH</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={style.Btns}>
                      {nftDetails?.marketplace_type === 2 ? (
                        //&& collectedNft
                        // &&
                        //auctionData?.startingPrice !== '0'
                        <>
                          <button
                            disabled={!isLoaded || !collectedNft}
                            className={`${style.gradBtn} ${
                              dark === 'true' ? 'darkGradient' : 'lightGradient'
                            } `}
                            onClick={handleSubmit}
                          >
                            Bid
                          </button>
                          {collectNft &&
                            nftDetails?.wallet_address.toLowerCase() ===
                              walletAddress?.toLowerCase() && (
                              <button
                                style={{ marginLeft: '50px' }}
                                className={style.regBtn}
                                disabled={!isLoaded}
                                onClick={handleCollect}
                              >
                                {!isLoading ? (
                                  ' Collect Nft'
                                ) : (
                                  <CircularProgress
                                    color="inherit"
                                    size="20px"
                                  />
                                )}
                              </button>
                            )}
                        </>
                      ) : (
                        <button
                          disabled={
                            !isLoaded
                            //|| auctionData?.startingPrice === '0'
                          }
                          className={`${
                            nftDetails?.on_sale ? style.regBtn : style.regBtn2
                          } ${dark === 'true' ? 'lightBorder' : 'darkBorder'} ${
                            dark === 'true' ? 'lightTxt' : 'darkTxt'
                          }`}
                          onClick={handleSubmit}
                        >
                          {!nftDetails?.on_sale
                            ? //||
                              //auctionData?.startingPrice === '0'
                              'Not On Sale'
                            : 'Buy'}
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

export default ExploreSingle
