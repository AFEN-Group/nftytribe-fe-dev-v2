import { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'

import koala from './assets/kl.png'

import style from './Card.module.scss'
import { ThemeContext } from '../../context/ThemeContext'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { Like, Star } from './CollectionCard'


const ItemCard = (data: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const {pathname}=useLocation()
  
  const [liked, setLiked] = useState(data?.nftData?.isLiked)
  const [favorite, setFavorite] = useState(data?.nftData?.isFavorite)
  const [watchCount, setWatchCount] = useState(data?.nftData?.watchCount)
  const [watch, setWatch] = useState(data?.nftData?.isWatched)
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

  const [tag, setTag] = useState(false)
  const [Wtag, setWTag] = useState(false)

  

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
      url: action === 'watch'?`api/nft/listings/${data?.nftData?.id}/watch`:`api/nft/${action}/${data?.nftData?.id}`,
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
  const [et, setEt] = useState(() => {
    const now = new Date();
    const date = new Date(data?.nftData?.timeout)
    const diff = date.getTime() - now.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return`${days}d ${days > 0 ? `${Math.abs((days * 24) - hours)}` : hours}h ${hours > 0 ? `${Math.abs((hours * 60) - minutes)}` : minutes}m `
  })
   const time = () => {
    const now = new Date();
    const date = new Date(data?.nftData?.timeout)
    const diff = date.getTime() - now.getTime();
  const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    setEt(`${days}d ${days>0?`${Math.abs((days*24)-hours)}`:hours}h ${hours>0?`${Math.abs((hours*60)-minutes)}`:minutes}m `)
  }
  useEffect(()=>{
    const interval=setInterval(()=>time(),60000)

    return ()=> clearInterval(interval)
  },[])
   
   
    

    
    
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
                  {/* <Star click={() => patchData('favorite')} favorited={favorite} /> */}
            

            {/* <svg onMouseEnter={() => {


              setTag(true)
            }} onMouseLeave={() => setTag(false)} style={{ marginLeft: '6px' }} onClick={() => patchData('like')} width="20" height="18" viewBox="0 0 32 27" fill={liked ? "red" : 'none'} xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.60059 1.5C5.42402 1.5 2.03809 4.88594 2.03809 9.0625C2.03809 16.625 10.9756 23.5 15.7881 25.0991C20.6006 23.5 29.5381 16.625 29.5381 9.0625C29.5381 4.88594 26.1521 1.5 21.9756 1.5C19.4181 1.5 17.1562 2.76981 15.7881 4.71338C15.0907 3.72008 14.1643 2.90944 13.0873 2.35009C12.0102 1.79073 10.8142 1.49914 9.60059 1.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
            {tag && <div style={{right:'10px'}}className='hoverTag'>Like</div>} */}
  

                </div>

              </div>
               <div className={style.nft_det}>
                <div className="nameXwatch">
                  <div className="name"> {data?.nftData?.user?.username}
                    {data?.nftData?.user?.verified && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.372 5.2168C14.3904 5.0776 14.4 4.9384 14.4 4.8C14.4 2.8968 12.6856 1.3696 10.7832 1.628C10.2288 0.6416 9.1728 0 8 0C6.8272 0 5.7712 0.6416 5.2168 1.628C3.3104 1.3696 1.6 2.8968 1.6 4.8C1.6 4.9384 1.6096 5.0776 1.628 5.2168C0.6416 5.772 0 6.828 0 8C0 9.172 0.6416 10.228 1.628 10.7832C1.60954 10.9214 1.60019 11.0606 1.6 11.2C1.6 13.1032 3.3104 14.6264 5.2168 14.372C5.7712 15.3584 6.8272 16 8 16C9.1728 16 10.2288 15.3584 10.7832 14.372C12.6856 14.6264 14.4 13.1032 14.4 11.2C14.4 11.0616 14.3904 10.9224 14.372 10.7832C15.3584 10.228 16 9.172 16 8C16 6.828 15.3584 5.772 14.372 5.2168ZM7.164 11.5328L4.2304 8.5616L5.3696 7.4384L7.1752 9.2672L10.6368 5.832L11.7632 6.968L7.164 11.5328Z" fill="#3F3F46" />
                    </svg>}
                  </div>
<div style={{position:'relative'}} className="watch">
              {data?.nftData?.isWatched &&
              <svg onMouseEnter={() => {
                setWTag(true)
              }} onMouseLeave={() => setWTag(false)} onClick={() => patchData('watch')} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect width="20" height="20" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_4340_18692" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_4340_18692" width="128" height="128" xlinkHref="data:image/png;base64,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"/>
</defs>
</svg>

            }
               {!data?.nftData?.isWatched && <svg onMouseEnter={() => {
                setWTag(true)
              }} onMouseLeave={() => setWTag(false)} onClick={() => patchData('watch')} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75Z" fill="#3F3F46" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.32343 10.6464C3.90431 11.2503 3.75 11.7227 3.75 12C3.75 12.2773 3.90431 12.7497 4.32343 13.3536C4.72857 13.9374 5.33078 14.5703 6.09267 15.155C7.61978 16.3271 9.71345 17.25 12 17.25C14.2865 17.25 16.3802 16.3271 17.9073 15.155C18.6692 14.5703 19.2714 13.9374 19.6766 13.3536C20.0957 12.7497 20.25 12.2773 20.25 12C20.25 11.7227 20.0957 11.2503 19.6766 10.6464C19.2714 10.0626 18.6692 9.42972 17.9073 8.84497C16.3802 7.67292 14.2865 6.75 12 6.75C9.71345 6.75 7.61978 7.67292 6.09267 8.84497C5.33078 9.42972 4.72857 10.0626 4.32343 10.6464ZM5.17941 7.65503C6.90965 6.32708 9.31598 5.25 12 5.25C14.684 5.25 17.0903 6.32708 18.8206 7.65503C19.6874 8.32028 20.4032 9.06244 20.9089 9.79115C21.4006 10.4997 21.75 11.2773 21.75 12C21.75 12.7227 21.4006 13.5003 20.9089 14.2089C20.4032 14.9376 19.6874 15.6797 18.8206 16.345C17.0903 17.6729 14.684 18.75 12 18.75C9.31598 18.75 6.90965 17.6729 5.17941 16.345C4.31262 15.6797 3.59681 14.9376 3.0911 14.2089C2.59937 13.5003 2.25 12.7227 2.25 12C2.25 11.2773 2.59937 10.4997 3.0911 9.79115C3.59681 9.06244 4.31262 8.32028 5.17941 7.65503Z" fill="#3F3F46" />
              </svg>}
              {Wtag && <div style={{ top:'20px',right: '10px' }} className='hoverTag'>watch</div>}

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
          <h3 onClick={() => data?.nftData?.listingType === "AUCTION"?open2(data):open(data)} style={{margin:'0'}}>
               {Number(data?.nftData?.price)}{data?.nftData?.moreInfo?.erc20TokenSymbol}
           </h3>
          {data?.nftData?.listingType!=='NORMAL'&& <h3>
              {et}
           </h3>}
           
          </div>
     
       
      </div>
    </div>
  )
}

export default ItemCard
