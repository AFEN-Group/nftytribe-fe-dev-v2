import { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'

import koala from './assets/kl.png'

import style from './Card.module.scss'
import { ThemeContext } from '../../context/ThemeContext'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { Star } from './CollectionCard'


const ItemCard = (data: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const {pathname}=useLocation()
  
  const [liked, setLiked] = useState(data?.nftData.isLiked)
  const [favorite, setFavorite] = useState(data?.nftData.isFavorite)
  const [watchCount, setWatchCount] = useState(data?.nftData.watchCount)
  const [watch, setWatch] = useState(data?.nftData.isWatched)
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
  
  const [img,setImg]=useState<any>()
  function dataURItoBlob(dataURI:any) {
    return`data:image/png;base64,${dataURI}`
  }


  

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
  const patchData = async(action: string) => {
   try{ 
    await fetchData({
      method: 'post',
      url: action === 'watch'?`api/nft/listings/${data?.nftData.id}/watch`:`api/nft/${action}/${data?.nftData?.id}`,
      axiosInstance: Protected(sessionStorage.getItem('token'))

    })
    if(action==='like')setLiked(!liked)
    if(action==='favorite')setFavorite(!favorite)
    if(action==='watch'){
      console.log(data?.nftData?.isWatched);
      
      if(watch)setWatchCount((e:number)=>e-1)
      else {setWatchCount((e:number)=>e+1)}
      setWatch(!watch)
    }
  }
    catch(error){

    }
  }

  
    

    
  const time = (data: string) => {
    const now = new Date();
    const date = new Date(data)
    const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    return `${days}d ${days>0?`${Math.abs((days*24)-hours)}`:hours}h ${hours>0?`${Math.abs((hours*60)-minutes)}`:minutes}m `
  }   
  // console.log(data);
  
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
                    data?.nftData.sImg ? dataURItoBlob(data.nftData.sImg):
                    getImageUrl(data.nftData.url || data.nftData.metadata.image)
                  }
                  alt="item"
                />
              )}
              
              {/* <img src={koala} alt="item" /> */}
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
                      data?.nftData.sImg ? dataURItoBlob(data.nftData.sImg) :

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
             
             
          
          
          </div>
        )}
      <div onClick={(e) => e.stopPropagation()} className={style.cardTop}>
                <div></div>

                <div>
                  <Star click={() => patchData('favorite')} favorited={favorite} />

                  <svg style={{ marginLeft: '6px' }} onClick={() => patchData('like')} width="20" height="18" viewBox="0 0 32 27" fill={liked ? "red" : 'none'} xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.60059 1.5C5.42402 1.5 2.03809 4.88594 2.03809 9.0625C2.03809 16.625 10.9756 23.5 15.7881 25.0991C20.6006 23.5 29.5381 16.625 29.5381 9.0625C29.5381 4.88594 26.1521 1.5 21.9756 1.5C19.4181 1.5 17.1562 2.76981 15.7881 4.71338C15.0907 3.72008 14.1643 2.90944 13.0873 2.35009C12.0102 1.79073 10.8142 1.49914 9.60059 1.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                </div>

              </div>
               <div className={style.nft_det}>
                <div className="nameXwatch">
                  <div className="name"> {data?.nftData?.user?.username}
                    {data?.nftData?.user?.verified && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.372 5.2168C14.3904 5.0776 14.4 4.9384 14.4 4.8C14.4 2.8968 12.6856 1.3696 10.7832 1.628C10.2288 0.6416 9.1728 0 8 0C6.8272 0 5.7712 0.6416 5.2168 1.628C3.3104 1.3696 1.6 2.8968 1.6 4.8C1.6 4.9384 1.6096 5.0776 1.628 5.2168C0.6416 5.772 0 6.828 0 8C0 9.172 0.6416 10.228 1.628 10.7832C1.60954 10.9214 1.60019 11.0606 1.6 11.2C1.6 13.1032 3.3104 14.6264 5.2168 14.372C5.7712 15.3584 6.8272 16 8 16C9.1728 16 10.2288 15.3584 10.7832 14.372C12.6856 14.6264 14.4 13.1032 14.4 11.2C14.4 11.0616 14.3904 10.9224 14.372 10.7832C15.3584 10.228 16 9.172 16 8C16 6.828 15.3584 5.772 14.372 5.2168ZM7.164 11.5328L4.2304 8.5616L5.3696 7.4384L7.1752 9.2672L10.6368 5.832L11.7632 6.968L7.164 11.5328Z" fill="#3F3F46" />
                    </svg>}
                  </div>

                  <div className="watch">
                    <svg onClick={()=>patchData('watch')} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75Z" fill="#3F3F46" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.32343 10.6464C3.90431 11.2503 3.75 11.7227 3.75 12C3.75 12.2773 3.90431 12.7497 4.32343 13.3536C4.72857 13.9374 5.33078 14.5703 6.09267 15.155C7.61978 16.3271 9.71345 17.25 12 17.25C14.2865 17.25 16.3802 16.3271 17.9073 15.155C18.6692 14.5703 19.2714 13.9374 19.6766 13.3536C20.0957 12.7497 20.25 12.2773 20.25 12C20.25 11.7227 20.0957 11.2503 19.6766 10.6464C19.2714 10.0626 18.6692 9.42972 17.9073 8.84497C16.3802 7.67292 14.2865 6.75 12 6.75C9.71345 6.75 7.61978 7.67292 6.09267 8.84497C5.33078 9.42972 4.72857 10.0626 4.32343 10.6464ZM5.17941 7.65503C6.90965 6.32708 9.31598 5.25 12 5.25C14.684 5.25 17.0903 6.32708 18.8206 7.65503C19.6874 8.32028 20.4032 9.06244 20.9089 9.79115C21.4006 10.4997 21.75 11.2773 21.75 12C21.75 12.7227 21.4006 13.5003 20.9089 14.2089C20.4032 14.9376 19.6874 15.6797 18.8206 16.345C17.0903 17.6729 14.684 18.75 12 18.75C9.31598 18.75 6.90965 17.6729 5.17941 16.345C4.31262 15.6797 3.59681 14.9376 3.0911 14.2089C2.59937 13.5003 2.25 12.7227 2.25 12C2.25 11.2773 2.59937 10.4997 3.0911 9.79115C3.59681 9.06244 4.31262 8.32028 5.17941 7.65503Z" fill="#3F3F46" />
                    </svg>
                    {watchCount}
                  </div>
                </div>
                <p>{data?.nftData?.name}</p>
                {/* <span>{data?.nftData?.description}</span> */}
              </div>
          <div
            //className={style.descBox1}
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
           <h3 style={{margin:'0'}}>
               {parseInt(data?.nftData?.price)}{data?.nftData?.moreInfo?.erc20TokenSymbol}
           </h3>
          {data?.nftData?.listingType!=='NORMAL'&& <h3>
              {time(data?.nftData?.createdAt)}
           </h3>}
           
          </div>
     
       
      </div>
    </div>
  )
}

export default ItemCard
