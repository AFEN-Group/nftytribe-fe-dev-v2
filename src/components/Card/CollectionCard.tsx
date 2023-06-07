import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import user from './assets/user3.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { UserContext } from '../../context/UserContext'

//import Logo from './assets/logo.svg'
// import eth from './assets/eth.svg'
// import Web3 from 'web3'

const CollectionCard = (data: any) => {
  const currentAddress: any = sessionStorage.getItem('currentAccount')
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
  const { userState, setUserState } = useContext(UserContext)

   const {fetchData,Response,error}=UseAxios()
   useEffect(()=>{
     if(Response)data.update()
   },[Response])

  const patchData=(action:string)=>{
     fetchData({
      method:'post',
       url:`api/collection/${data?.data?.id}/${action}`,
       axiosInstance:Protected(sessionStorage.getItem('token'))

     })
  }
 
  console.log(data.data.coverImage);
  
  const navigate=useNavigate()
  const open=()=>{
    navigate(`/collectionDetails/${data?.data?.id}`)
  }
 

  return (
    // <div style={{width:'25%'}} >
      <div onClick={open} className={style.card}>
        <div className={style.cardContent}>
          <div className={style.cardImg}>
            
              <img
                //src={user}
                src={data.data.coverImage}
                alt="collection"
                className={style.user}
              />
            
            {data?.data?.coverImage === '' && <img src={koala} alt="item" />}
          </div>
          <div onClick={(e)=>e.stopPropagation()} className={style.cardTop}>
            <div>
            </div>
            <div>
             
             
            <Like data={data} patchData={() =>patchData('favorite')  }/>
              
            </div>
            
          </div>
          <div className={style.nft_det}>
            <div className="nameXwatch">
           <div className="name"> {userState?.user?.username}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.372 5.2168C14.3904 5.0776 14.4 4.9384 14.4 4.8C14.4 2.8968 12.6856 1.3696 10.7832 1.628C10.2288 0.6416 9.1728 0 8 0C6.8272 0 5.7712 0.6416 5.2168 1.628C3.3104 1.3696 1.6 2.8968 1.6 4.8C1.6 4.9384 1.6096 5.0776 1.628 5.2168C0.6416 5.772 0 6.828 0 8C0 9.172 0.6416 10.228 1.628 10.7832C1.60954 10.9214 1.60019 11.0606 1.6 11.2C1.6 13.1032 3.3104 14.6264 5.2168 14.372C5.7712 15.3584 6.8272 16 8 16C9.1728 16 10.2288 15.3584 10.7832 14.372C12.6856 14.6264 14.4 13.1032 14.4 11.2C14.4 11.0616 14.3904 10.9224 14.372 10.7832C15.3584 10.228 16 9.172 16 8C16 6.828 15.3584 5.772 14.372 5.2168ZM7.164 11.5328L4.2304 8.5616L5.3696 7.4384L7.1752 9.2672L10.6368 5.832L11.7632 6.968L7.164 11.5328Z" fill="#3F3F46" />
            </svg>
           </div>

           {/* <div className="watch">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12ZM12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75Z" fill="#3F3F46" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.32343 10.6464C3.90431 11.2503 3.75 11.7227 3.75 12C3.75 12.2773 3.90431 12.7497 4.32343 13.3536C4.72857 13.9374 5.33078 14.5703 6.09267 15.155C7.61978 16.3271 9.71345 17.25 12 17.25C14.2865 17.25 16.3802 16.3271 17.9073 15.155C18.6692 14.5703 19.2714 13.9374 19.6766 13.3536C20.0957 12.7497 20.25 12.2773 20.25 12C20.25 11.7227 20.0957 11.2503 19.6766 10.6464C19.2714 10.0626 18.6692 9.42972 17.9073 8.84497C16.3802 7.67292 14.2865 6.75 12 6.75C9.71345 6.75 7.61978 7.67292 6.09267 8.84497C5.33078 9.42972 4.72857 10.0626 4.32343 10.6464ZM5.17941 7.65503C6.90965 6.32708 9.31598 5.25 12 5.25C14.684 5.25 17.0903 6.32708 18.8206 7.65503C19.6874 8.32028 20.4032 9.06244 20.9089 9.79115C21.4006 10.4997 21.75 11.2773 21.75 12C21.75 12.7227 21.4006 13.5003 20.9089 14.2089C20.4032 14.9376 19.6874 15.6797 18.8206 16.345C17.0903 17.6729 14.684 18.75 12 18.75C9.31598 18.75 6.90965 17.6729 5.17941 16.345C4.31262 15.6797 3.59681 14.9376 3.0911 14.2089C2.59937 13.5003 2.25 12.7227 2.25 12C2.25 11.2773 2.59937 10.4997 3.0911 9.79115C3.59681 9.06244 4.31262 8.32028 5.17941 7.65503Z" fill="#3F3F46" />
              </svg>
              {data?.data?.watchCount||0}
           </div> */}
            </div>
            <p>{data?.data?.name}</p>
          <span>{data?.data?.description}</span>
          </div>
          
          <div
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
             <div>
              <p>Volume</p>
              <h3>
                {data?.data?.volume?.toPrecision(4)||0}
              </h3>
             </div>
            <div>
            <p>Floor</p>
            <h3>
              {data?.data?.floorPrice && data?.data?.floorPrice.slice(0,4)||0}
            </h3>
          </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default CollectionCard
export const Star=(props:any)=>{
  const [tag, setTag] = useState(false)

  return(
   
     <> 
      <svg onMouseEnter={() => setTag(true)} onMouseLeave={() => setTag(false)}  onClick={props.click}width="20" height="17" viewBox="0 0 32 26" fill="red" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4774 1.82841C14.6014 0.181868 17.3988 0.181872 18.5228 1.82841L21.9651 6.87084C22.2824 7.33563 22.8308 7.65281 23.4559 7.73306L29.172 8.4669C31.6636 8.78679 32.5376 11.4608 30.5971 12.8274L26.4323 15.7603C25.8477 16.172 25.5729 16.8213 25.7149 17.4552L26.8815 22.6628C27.3385 24.7027 24.8191 26.2877 22.6574 25.3202L16.9707 22.7751C16.3632 22.5031 15.637 22.5031 15.0295 22.7751L9.34273 25.3202C7.18104 26.2877 4.66166 24.7027 5.11866 22.6628L6.2853 17.4552C6.4273 16.8213 6.15243 16.172 5.56786 15.7603L1.40303 12.8274C-0.537445 11.4608 0.33656 8.78678 2.82822 8.4669L8.5443 7.73306C9.1694 7.65281 9.71782 7.33563 10.0351 6.87084L13.4774 1.82841ZM16.3605 2.89492C16.1999 2.6597 15.8003 2.6597 15.6397 2.89492L12.1974 7.93735C11.4994 8.95988 10.2929 9.65767 8.91765 9.83423L3.20158 10.5681C2.84562 10.6138 2.72077 10.9958 2.99798 11.191L7.16282 14.1239C8.44887 15.0296 9.05357 16.4582 8.74117 17.8527L7.57453 23.0603C7.50925 23.3517 7.86916 23.5782 8.17797 23.4399L13.8647 20.8948C15.2013 20.2966 16.7989 20.2966 18.1355 20.8948L23.8222 23.4399C24.131 23.5782 24.4909 23.3517 24.4256 23.0603L23.259 17.8527C22.9466 16.4582 23.5513 15.0296 24.8374 14.1239L29.0022 11.191C29.2794 10.9958 29.1545 10.6138 28.7986 10.5681L23.0825 9.83423C21.7073 9.65767 20.5008 8.95988 19.8027 7.93735L16.3605 2.89492Z" fill={props.favorited?'red':"#F4F4F5"}/>
      </svg>
{tag&&<div className='hoverTag'>Favorite</div>}
</>

    
  )
}


export const Like=(props:any)=>{
  const [tag, setTag] = useState(false)
  return(
    <>
    <svg onMouseEnter={() => {
      

      setTag(true)
    }} onMouseLeave={() => setTag(false)} style={{ marginLeft: '12px' }} onClick={props.patchData} width="32" height="27" viewBox="0 0 32 27" fill={props.data?.data?.isLiked ? "red" : 'none'} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.60059 1.5C5.42402 1.5 2.03809 4.88594 2.03809 9.0625C2.03809 16.625 10.9756 23.5 15.7881 25.0991C20.6006 23.5 29.5381 16.625 29.5381 9.0625C29.5381 4.88594 26.1521 1.5 21.9756 1.5C19.4181 1.5 17.1562 2.76981 15.7881 4.71338C15.0907 3.72008 14.1643 2.90944 13.0873 2.35009C12.0102 1.79073 10.8142 1.49914 9.60059 1.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
              { tag && <div className='hoverTag'>Favorite</div> }

            </>
  )
}