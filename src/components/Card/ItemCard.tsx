import { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  const {pathname}=useLocation()
  const [showFull, setShowFull] = useState(false)
  const [usdPrice, setUsdPrice] = useState<any>()
  const [userName, setUserName] = useState<any>(pathname.includes('explore')?data.nftData.user?.username:'')
  const getImageUrl = (uri: any) => {
    // console.log(uri);
    
    let url
   if (uri?.includes('ipfs://')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
    }
    else url=uri
    // console.log(url);
    return url
    
    
  }

  const {Response, error,fetchData,loading}=UseAxios()
  

  console.log(data.nftData);
  
 
  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const navigate=useNavigate()
  
  const open=(data: any)=>{
    if(pathname.includes('profile')){
       console.log(data);
       navigate(`/item/${data.nftData.token_address}/${data.nftData.token_id}`)
       
    }
    else navigate( data?.nftData?.lazyMint
      ? `/exploreBuy/${data?.nftData?.collection_address}/${data.nftData.id}`
      : `/exploreBuy/${data?.nftData?.token_address || data?.nftData?.moreInfo.contractAddress}/${data.nftData.id}`)
      }
  const open2=(data: any)=>{
    navigate(
      data?.nftData?.lazyMint
        ? `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner_of || data?.nftData.user.walletAddress}&lazy_mint=true`
        : `/exploreBid/${data?.nftData?.collection_address || data?.nftData?.moreInfo.contractAddress}/${data?.nftData?.id || data?.nftData?.id}`)
  
      }
  return (
    <div className={style.card}>
      <div className={style.cardContent}>
      
        {data?.nftData?.listingType === "AUCTION" ? (
          <div
           
            onClick={()=>open2(data)}
          >
            <div className={style.cardImg}>
              {(data?.nftData?.url || data.nftData?.metadata.image) && (
                <img
                  //className={style.imgBg}
                  src={
                    // ''

                    getImageUrl(data.nftData.url || data.nftData.metadata.image)
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
              {/* <img src={dots} alt="options" />  */}
              <img src={like} alt="like" />
              
            </div>
          </div>) : (
          <div onClick={()=>open(data) }
            //to={`/explore/22/22`}
           
          >
            <div className={style.cardImg}>
              {(data?.nftData?.url||data.nftData?.metadata.image) && (
                <img
                  //className={style.imgBg}
                  src={
                    // ''
                  
                      getImageUrl(data.nftData.url||data.nftData.metadata.image)
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
          {
            pathname.includes('explore') && <div  style={{justifyContent:'right'}} onClick={(e)=>e.stopPropagation()} className={style.cardTop}>
              {/* <img src={dots} alt="options" /> */}
              {/* <img onClick={(e)=>console.log(data.nftData.isLiked)} src={like} alt="like" /> */}
             <Like onClick={()=>fetchData({
                method:'post',
                url:`api/nft/like/${data.nftData.id}`,
                axiosInstance:Protected(sessionStorage.getItem('token'))
              })} fill={data.nftData?.isLiked?'#ff0000':'none'}/>
            </div>
          } 
          </div>
        )}
        {!showFull && pathname.includes('explore')&& (
          <div
            //className={style.descBox1}
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
            <div className={style.userInfo} onClick={() => setShowFull(true)}>
              <img src={user} alt="user" />
              {data && (
                <p>
                  {userName 
                  || shortenAddress(data.nftData?.user?.walletAddress||data.nftData.owner_of)
                  }
                  </p>
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
                  {data && (
                    <p>
                      {userName || shortenAddress(data.nftData.user?.walletAddress)}
                    </p>
                  )}
                </div>
              </div>
              {data?.nftData?.marketplace_type === 2 ? (
                <Link
                  //to={`/explore/22/22`}
                  to={
                    data?.nftData?.lazyMint
                      ? `/exploreBid/${data?.nftData?.collection_address}/${data?.nftData?.signature}?seller=${data?.nftData?.owner_of || data?.nftData.user.walletAddress}&lazy_mint=true`
                      : `/exploreBid/${data?.nftData?.collection_address || data?.nftData?.moreInfo.contractAddress}/${data?.nftData?.id || data?.nftData?.id}` }
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
                      data?.nftData?.lazyMint
                        ? `/exploreBuy/${data?.nftData?.collection_address}/${data.nftData.id}`
                        : `/exploreBuy/${data?.nftData?.token_address || data?.nftData?.moreInfo.contractAddress}/${data.nftData.id}` }
                  className={style.buyBtnSm}
                >
                  <button className={` ${dark === 'true' ? 'yellowBtn' : 'blueBtn'}`}>
                    {data?.nftData?.marketplace_type === 2 &&
                      data?.nftData?.user.walletAddress !== currentAddress
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
                {/* {!data?.nftData?.lazyMint && ( */}
                <div className={style.aleft}>
                
                  {data?.nftData?.price ? (
                    <p>
                      {' '}
                      {/* @ts-ignore */}
                      {/* {Web3.utils.fromWei( */}
                      {Number(data?.nftData?.price).toString() ||
                        '0.00'}
                        {/* 'ether')*/}
                       
                        {' '}
                    </p>
                  ) : (
                    <p></p>
                  )}
                  {pathname.includes('explore') &&<p style={{marginLeft:'10px'}}> {data.nftData.moreInfo.erc20TokenName}</p>}
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
