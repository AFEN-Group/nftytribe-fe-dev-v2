import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'
import { publicRequest } from '../../utils/requestMethods'
import { getUsdPrice } from '../../utils/exchangeRate'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import Like from '../../assets/svgs/like'
import user from './assets/user3.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'
//import Logo from './assets/logo.svg'
import eth from './assets/eth.svg'
import bnb from './assets/binance.svg'
import Web3 from 'web3'
import { ThemeContext } from '../../context/ThemeContext'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'


const ItemCard = (data: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark

  const [showFull, setShowFull] = useState(false)
  const [usdPrice, setUsdPrice] = useState<any>()
  const [userName, setUserName] = useState<any>()
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
 
  const {Response, error,fetchData,loading}=UseAxios()
  

 
  useEffect(() => {
    const getUsdPriceValue = async () => {
      if (data?.nftData?.chain === 'eth') {
        const usdPrice = await getUsdPrice("ethereum")
        const price = Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether')
        const convertedPrice = parseFloat(price) * usdPrice.ethereum.usd
        setUsdPrice(convertedPrice)
      }
      if (data?.nftData?.chain === 'bsc') {
        const usdPrice = await getUsdPrice("binancecoin")
        const price = Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether')
        const convertedPrice = parseFloat(price) * usdPrice.binancecoin.usd
        setUsdPrice(convertedPrice)
      }
    }
    const getUser = async () => {
      //data?.nftData?.owner
      const ownerAddress = data?.nftData?.owner
      try {
        const userInfo: any = await publicRequest.get(`/user/${ownerAddress}`)
        console.log("userInfo>>", userInfo?.data?.data?.name)
        setUserName(userInfo?.data?.data?.name)
      } catch (error) {
        console.log(error)
      }
    }

    getUsdPriceValue()
    //getUser()

  }, [])
  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const navigate=useNavigate()
  // const [selected,setData]=useState()
  const open=(data: any)=>{
    navigate( data?.nftData?.is_lazy_mint
      ? `/exploreBuy/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner}&lazy_mint=true`
      : `/exploreBuy/${data?.nftData?.collection_address}/${data?.nftData?.token_id}?seller=${data?.nftData?.owner}`)
  }
  const open2=(data: any)=>{
    navigate(
      data?.nftData?.is_lazy_mint
      ? `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner}&lazy_mint=true`
      : `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.token_id}?seller=${data?.nftData?.owner}`)
  }
  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        {/* <div className={style.cardImgBx}> */}
        {data?.nftData?.marketplace_type === 2 ? (
          <div
            //to={`/explore/22/22`}
            onClick={()=>open2(data)}
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
            <div onClick={(e)=>e.stopPropagation()} className={style.cardTop}>
              {/* <img src={dots} alt="options" /> */}
              {/* <img src={like} alt="like" />
               */}
            </div>
          </div>) : (
          <div onClick={()=>open(data) }
            //to={`/explore/22/22`}
           
          >
            <div className={style.cardImg}>
              {data?.nftData?.cardImage !== '' && (
                <img
                  //className={style.imgBg}
                  src={
                    data?.nftData?.cardImage?.includes('/ipfs') ||
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
            <div  style={{justifyContent:'right'}} onClick={(e)=>e.stopPropagation()} className={style.cardTop}>
              {/* <img src={dots} alt="options" /> */}
              {/* <img onClick={(e)=>console.log(data.nftData.isLiked)} src={like} alt="like" /> */}
              <Like onClick={()=>fetchData({
                method:'put',
                url:`collectibles/likes/${data.nftData._id}`,
                axiosInstance:Protected(sessionStorage.getItem('token'))
              })} fill={data.nftData.isLiked?'#ff0000':'none'}/>
            </div>
          </div>
        )}
        {!showFull && (
          <div
            //className={style.descBox1}
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
            <div className={style.userInfo} onClick={() => setShowFull(true)}>
              <img src={user} alt="user" />
              {data.nftData && (
                <p>{userName || shortenAddress(data?.nftData?.owner)}</p>
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
                    <p>{userName || shortenAddress(data?.nftData?.owner)}</p>
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
             {data?.nftData?.price && <div className={style.aBcontent}>
                {/* {!data?.nftData?.is_lazy_mint && ( */}
                <div className={style.aleft}>
                  <img src={data?.nftData?.chain === 'eth' ? eth : data?.nftData?.chain === 'bsc' ? bnb : ''} alt="chain" />
                  {data?.nftData?.price ? (
                    <p>
                      {' '}
                      {Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether') ||
                        '0.00'}{' '}
                    </p>
                  ) : (
                    <p></p>
                  )}
                  {/* <p>2800 Afen</p> */}
                </div>
                {/* )} */}
                <div className={style.aright}>

                  <p>${usdPrice?.toFixed(2)  } </p>
                  {/* <p>{getUsdPrice(data?.nftData?.price.toString())}</p>
                  <p>{shortenAddress(data?.nftData?.wallet_address)}</p> */}
                </div>
              </div>}
             {!data?.nftData?.price && <div className={style.aBcontent}>
               <p style={{textAlign:'center',margin:'auto'}}>Not for sale</p>
              </div>}
              <div className={style.aleft}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCard
