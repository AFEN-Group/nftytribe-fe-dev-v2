import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ThemeContext } from '../../../context/ThemeContext'
import { publicRequest } from '../../../utils/requestMethods'
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
import User from './assets/user.svg'
import Eye from './assets/eye.svg'
import Eye2 from './assets/eye2.svg'
import Container from '../../../components/Container/Container'

import erc721Abi from '../../../smart_contracts/erc721Mintable.json'
//import marketPlaceAbi from '../../../smart_contracts/erc721Market.json'
import Web3 from 'web3'
// import { shortenAddress } from '../../../utils/formatting'

import Loader from '../../../components/Loader/Loader'
import BuyModal from './BuyModal'
declare const window: any

const ExploreSingle = () => {
  const { collectionAddress, id } = useParams()
  const params = new URLSearchParams(window.location.search)
  const lazy_mint = params.get('lazy_mint')

  const navigate = useNavigate()
  //const [priceType, setPriceType] = useState('auction')
  const [tab, setTab] = useState('art')
  const [isLoading, setIsLoading] = useState(true)
  //const [isLoaded, setIsLoaded] = useState(false)
  const [nft, setNft] = useState<any>()
  const [nftDetails, setNftDetails] = useState<any>()
  //const [nftPrice, setNftPrice] = useState<any>()
  const [showBuy, setShowBuy] = useState(false)
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark

  useEffect(() => {
    window.scrollTo(0, 0)
    const getTokenDetails = async () => {
      if (lazy_mint) {
        try {
          const details = await publicRequest.get(
            `/collectibles/${collectionAddress}/${id}?lazy_mint=true`,
          )
          console.log(details)
          const nft = details
          setNftDetails(nft.data._doc)
          //setNftPrice(nft.data._doc.price)
          setIsLoading(false)
          //setIsLoaded(true)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      } else {
        //const contract_address = '0xa58f3a74541Aca24393cA0D00d4BBa491B6b9777'
        let erc721Contract
        //let marketPlaceContract
        if (window.ethereum) {
          let web3: any = new Web3(window.ethereum)
          erc721Contract = new web3.eth.Contract(erc721Abi, collectionAddress)
          // marketPlaceContract = new web3.eth.Contract(
          //   marketPlaceAbi,
          //   contract_address,
          // )
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
            console.log(data)
          } catch (err) {}
        }

        const owner = await erc721Contract.methods.ownerOf(id).call()
        nft.owner_of = owner
        setNft(nft)
        console.log(nft)

        // const getPrices = await marketPlaceContract.methods
        //   .auctions(collectionAddress, id)
        //   .call()
        //console.log('pricee >>', getPrices.buyPrice)
        //setNftPrice(getPrices.buyPrice)
        setIsLoading(false)
      }
    }
    getTokenDetails()

    const getNftDetails = async () => {
      try {
        const details = await publicRequest.get(
          `/collectibles/${collectionAddress}/${id}`,
        )
        // console.log('check>>>', details.data)
        setNftDetails(details?.data?.data?._doc)

        setIsLoading(false)
        //setIsLoaded(true)
      } catch (error) {
        setIsLoading(false)
      }
    }
    //contract call on auctions to get price
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

  const handleSubmit = () => {
    const wallet_address = localStorage.getItem('currentAccount')
    if (wallet_address) {
      setShowBuy(true)
    } else {
      //setShowConnect(true)
    }
  }

  const handleClose = () => {
    //setShowConnect(false)
    setShowBuy(false)
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
                <p>from the {nft?.name} collection.</p>
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
                      // <div className={style.loaderBx}>
                      //   <CircularProgress color="inherit" size="65px" />
                      // </div>
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
                    <img src={User} alt="user" />
                    <p>Michael Carson</p>
                  </div>
                  <div className={style.bronze}>
                    <p>||| Benin Broxnze</p>
                  </div>
                  <div className={style.eyes}>
                    <img src={dark === 'true' ? Eye2 : Eye} alt="seen" />
                    <p>1215</p>
                  </div>
                </div>
                {tab === 'art' && (
                  <div
                    className={`${style.info} animate__animated animate__fadeIn`}
                  >
                    <div className={style.description}>
                      <h2>Description</h2>
                      {/* <p>
                        This is a one in a kind bot, yours truly Afen bot
                        special NFT. Blockchain has the potential to adequately
                        transform African society. Offering insurmountable
                        opportunities to those leveraging it to build a new
                        structure in diverse sectors.{' '}
                      </p> */}
                      <p>
                        {nft?.metadata?.description ||
                          nftDetails?.description ||
                          'No description.'}{' '}
                      </p>
                    </div>
                    <div className={style.prices}>
                      {/* <div
                        //className={style.bidPrices}
                        className={`${style.bidPrices} ${
                          dark === 'true' ? 'darkGradient' : 'lightGradient'
                        } `}
                      >
                        <div className={style.bids}>
                          <div className={style.bidBx}>
                            <div className={style.bidBlue}>Current bid</div>
                            <p>2800 BNB</p>
                          </div>
                          <div className={style.bidBx2}>
                            <div className={style.bidBlue}>Highest bid</div>
                            <p>2800 BNB</p>
                          </div>
                        </div>
                        <div className={style.time}>
                          <p>2d 13h 23m 19s</p>
                        </div>
                      </div> */}
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
                    </div>
                    <div className={style.Btns}>
                      <button
                        className={`${
                          nftDetails?.on_sale ? style.regBtn : style.regBtn2
                        } ${dark === 'true' ? 'lightBorder' : 'darkBorder'} ${
                          dark === 'true' ? 'lightTxt' : 'darkTxt'
                        }`}
                        onClick={handleSubmit}
                      >
                        {!nftDetails?.on_sale ? 'Not On Sale' : 'Buy'}
                      </button>
                      {/* <button
                        className={`${style.gradBtn} ${
                          dark === 'true' ? 'darkGradient' : 'lightGradient'
                        } `}
                      >
                        Bid
                      </button> */}
                    </div>
                  </div>
                )}
                {tab === 'activity' && <div className={style.activity}></div>}
                {tab === 'offers' && (
                  <div
                    className={`${style.offers} animate__animated animate__fadeIn`}
                  >
                    <div className={style.offersContent}>
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

export default ExploreSingle
