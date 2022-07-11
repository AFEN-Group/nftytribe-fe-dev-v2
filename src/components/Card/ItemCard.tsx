import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'
//import { publicRequest } from '../../utils/requestMethods'
import { getUsdPrice } from '../../utils/exchangeRate'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import user from './assets/user3.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'
//import Logo from './assets/logo.svg'
import eth from './assets/eth.svg'
import bnb from './assets/binance.svg'
import Web3 from 'web3'
import { ThemeContext } from '../../context/ThemeContext'

const ItemCard = (data: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark

  const [showFull, setShowFull] = useState(false)
  const [usdPrice, setUsdPrice] = useState<any>()
  const getImageUrl = (uri: any) => {
    let url
    if (uri.includes('ipfs/')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
    } else if (data?.nftData?.cardImage.includes('ipfs://')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
    }
    return url
  }
  // const getExploreCollectibles = async () => {
  //   try {
  //     const explore = await publicRequest.get(`/collectibles/explore/filter?on_sale=true&nft_type=${tab}${filterQuery}`)
  //     const exploreData = explore.data
  //     console.log(exploreData)
  //     setData(exploreData?.data?.collectibles)
  //     //setTotalCount(exploreData?.data?.total_count)
  //     setIsLoading(false)
  //   } catch (error) {
  //     setIsLoading(false)
  //   }
  // }
  useEffect(() => {
    const getUsdPriceValue = async () => {
      if (data?.nftData?.chain === 'rinkeby') {
        const usdPrice = await getUsdPrice("ethereum")
        const price = Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether')
        const convertedPrice = parseFloat(price) * usdPrice.ethereum.usd
        setUsdPrice(convertedPrice)
      }
      if (data?.nftData?.chain === 'bsc testnet') {
        const usdPrice = await getUsdPrice("binancecoin")
        const price = Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether')
        const convertedPrice = parseFloat(price) * usdPrice.binancecoin.usd
        setUsdPrice(convertedPrice)
      }
    }
    getUsdPriceValue()
  }, [])
  const currentAddress: any = localStorage.getItem('currentAccount')

  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        {/* <div className={style.cardImgBx}> */}
        {data?.nftData?.marketplace_type === 2 ? (
          <Link
            //to={`/explore/22/22`}
            to={
              data?.nftData?.is_lazy_mint
                ? `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner}&lazy_mint=true`
                : `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.token_id}?seller=${data?.nftData?.owner}`
            }
          >
            <div className={style.cardImg}>
              {data?.nftData?.cardImage !== '' && (
                <img
                  //className={style.imgBg}
                  src={
                    data?.nftData?.cardImage.includes('/ipfs') ||
                      data?.nftData?.cardImage.includes('ipfs://')
                      ? `${getImageUrl(data?.nftData?.cardImage)}`
                      : data?.nftData?.cardImage
                  }
                  alt="item"
                />
              )}
              {data?.nftData?.cardImage === '' && (
                <img
                  //className={style.imgBg}
                  src={koala}
                  alt="item"
                />
              )}
              {/* <img src={koala} alt="item" /> */}
            </div>
            {/* <div className={style.cardTop}>
              <img src={dots} alt="options" />
              <img src={like} alt="like" />
            </div> */}
          </Link>) : (
          <Link
            //to={`/explore/22/22`}
            to={
              data?.nftData?.is_lazy_mint
                ? `/exploreBuy/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner}&lazy_mint=true`
                : `/exploreBuy/${data?.nftData?.collection_address}/${data?.nftData?.token_id}?seller=${data?.nftData?.owner}`
            }
          >
            <div className={style.cardImg}>
              {data?.nftData?.cardImage !== '' && (
                <img
                  //className={style.imgBg}
                  src={
                    data?.nftData?.cardImage.includes('/ipfs') ||
                      data?.nftData?.cardImage.includes('ipfs://')
                      ? `${getImageUrl(data?.nftData?.cardImage)}`
                      : data?.nftData?.cardImage
                  }
                  alt="item"
                />
              )}
              {data?.nftData?.cardImage === '' && (
                <img
                  //className={style.imgBg}
                  src={koala}
                  alt="item"
                />
              )}
              {/* <img src={koala} alt="item" /> */}
            </div>
            {/* <div className={style.cardTop}>
              <img src={dots} alt="options" />
              <img src={like} alt="like" />
            </div> */}
          </Link>
        )}
        {!showFull && (
          <div
            //className={style.descBox1}
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
            <div className={style.userInfo} onClick={() => setShowFull(true)}>
              <img src={user} alt="user" />
              {data.nftData && (
                <p>{shortenAddress(data?.nftData?.wallet_address)}</p>
              )}
              <img src={arrow} alt="arrow" />
            </div>
            <div className={style.itemInfo}>
              <p>{data?.nftData?.title}</p>
            </div>
          </div>
        )}
        {showFull && (
          <div
            className={`${style.descBox2} animate__animated animate__fadeIn `}

          >
            <div className={style.itemInfo2}
              onClick={() => setShowFull(false)}>
              <div
                className={style.itemSubtxt}
                onClick={() => setShowFull(false)}
              >
                <h3>{data?.nftData?.title}</h3>
                <div className={style.userBx}>
                  <img src={user} alt="user" />
                  {data.nftData && (
                    <p>{shortenAddress(data?.nftData?.wallet_address)}</p>
                  )}
                </div>
              </div>
              {data?.nftData?.marketplace_type === 2 ? (
                <Link
                  //to={`/explore/22/22`}
                  to={
                    data?.nftData?.is_lazy_mint
                      ? `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner}&lazy_mint=true`
                      : `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.token_id}?seller=${data?.nftData?.owner}`
                  }
                  className={style.buyBtnSm}
                >
                  <button className={` ${dark === 'true' ? 'yellowBtn' : 'blueBtn'}`}>
                    {data?.nftData?.marketplace_type === 2 &&
                      data?.nftData?.wallet_address !== currentAddress
                      ? 'Bid'
                      : data?.nftData?.marketplace_type !== 2 &&
                        data?.nftData?.wallet_address !== currentAddress
                        ? 'Buy'
                        : data?.nftData?.wallet_address === currentAddress
                          ? 'View'
                          : ''}
                  </button>
                </Link>) : (
                <Link
                  //to={`/explore/22/22`}
                  to={
                    data?.nftData?.is_lazy_mint
                      ? `/exploreBuy/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner}&lazy_mint=true`
                      : `/exploreBuy/${data?.nftData?.collection_address}/${data?.nftData?.token_id}?seller=${data?.nftData?.owner}`
                  }
                  className={style.buyBtnSm}
                >
                  <button className={` ${dark === 'true' ? 'yellowBtn' : 'blueBtn'}`}>
                    {data?.nftData?.marketplace_type === 2 &&
                      data?.nftData?.wallet_address !== currentAddress
                      ? 'Bid'
                      : data?.nftData?.marketplace_type !== 2 &&
                        data?.nftData?.wallet_address !== currentAddress
                        ? 'Buy'
                        : data?.nftData?.wallet_address === currentAddress
                          ? 'View'
                          : ''}
                  </button>
                </Link>
              )}
            </div>
            <div className={style.actionBx}>
              <div className={style.aBcontent}>
                {/* {!data?.nftData?.is_lazy_mint && ( */}
                <div className={style.aleft}>
                  <img src={data?.nftData?.chain === 'rinkeby' ? eth : data?.nftData?.chain === 'bsc testnet' ? bnb : ''} alt="chain" />
                  {data?.nftData?.price ? (
                    <p>
                      {' '}
                      {Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether') ||
                        '0.00'}{' '}
                    </p>
                  ) : (
                    <p>0.00</p>
                  )}
                  {/* <p>2800 Afen</p> */}
                </div>
                {/* )} */}
                <div className={style.aright}>

                  <p>${usdPrice?.toFixed(2) || '0.00'} </p>
                  {/* <p>{getUsdPrice(data?.nftData?.price.toString())}</p>
                  <p>{shortenAddress(data?.nftData?.wallet_address)}</p> */}
                </div>
              </div>
              <div className={style.aleft}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCard
