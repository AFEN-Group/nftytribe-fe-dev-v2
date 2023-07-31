import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
// import { AuthContext } from '../../context/AuthContext'
import style from './Profile.module.scss'
import Cover from './assets/cover.svg'
//import Avatar from './assets/user3.svg'
import Av2 from './assets/avatar.bmp'
import Edit from './assets/edit.svg'
import Edit2 from './assets/edit2.svg'
import Sad from './assets/sad.svg'
import Arrow from './assets/arrow.svg'
import Container from '../../components/Container/Container'
import './index.scss'
import { shortenAddress } from '../../utils/formatting'
import Filters from './Filters'
import Loader from '../../components/Loader/Loader'
import UpdatePrompt from './Modals/UpdatePrompt'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { type } from 'os'
import { UserContext } from '../../context/UserContext'
import { NfcTwoTone } from '@material-ui/icons'
import { ChainContext } from '../../context/chain'

const Profile = () => {
  //const [tab, setTab] = useState('all')
  const [themeState] = useContext<any>(ThemeContext)
  // const [authState] = useContext<any>(AuthContext)
  const dark = themeState.dark
  // const user = authState.user
  ///console.log(user)
  const [collectibles, setCollectibles] = useState<any>()
  const { chain } = useContext(ChainContext)

  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const currentChainId = sessionStorage.getItem('chain')
  const [res, setRes] = useState<any>()
  const [query, setQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState('')
  // const [totalPages, setTotalPages] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState<any>()
  const [postData,setData]=useState<any>()

  const {error:Error,loading:Loading,Response:postResponse,fetchData:Data}=UseAxios()
  const {userState,setUserState}=useContext(UserContext)
  
  const page = postResponse?.data.page
  useEffect(()=>{
    setRes(userState?.user)
  },[userState])
  const [reload,setReload]=useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    
     setUserState({...userState,currentAddress:currentAddress})
  }, [currentAddress])
 

  useEffect(() => {
    // console.log();
    if(!query||query===''){
      Data({
        method: 'get',
        url: `api/nft/user/${currentAddress}?page=${postResponse?.data?.cursor ? postResponse?.data?.cursor :''}&chain=${currentChainId}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
      })
    }

    else if(query==='on_sale'){
      Data({
        method: 'get',
        url: `api/nft/listings?owner=${userState.user.id}&chain=${chain.filter((chain: any) => { return chain.chain === currentChainId })[0].id}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
      })
    }
    else if (query==='watchlist'){
      Data({
        method: 'get',
        url: `api/nft/listings?isWatched=${true}&chain=${chain.filter((chain: any) => { return chain.chain === currentChainId })[0].id}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
      })
    }
   else Data({
     method:'get',
     url: `api/nft/transactions/?type=${query}&page=${postResponse?.data?.cursor ? postResponse?.data?.cursor:''}&limit=10`,
     axiosInstance:Protected(sessionStorage.getItem('token'))
    })
    
  }, [currentAddress,reload,query])


  
  console.log(currentPage);
  console.log(postResponse?.data?.cursor);

 useEffect(()=>{
    
     type data={
      data?:any
     }
     const {data}=postResponse||({} as data)
   
    setData(data)
     console.log(data?.cursor);
   
      if(!query){
        page > 1 ? setCollectibles([...collectibles,...data?.result]) :setCollectibles(data?.result)
      }

      else if(query!=='on_sale') setCollectibles(data.results)
      else setCollectibles(data.results)
    
      setIsLoading(false)
  },[postResponse] )

 

 
  

 console.log(reload);
 
  const closeModal = () => {
    setShowModal(false)
  }
 

  const interDemo = useRef(null);

  const callBack = (entries:any) => {
    // console.log(entries);
    
    const [entry] = entries;
    console.log(entry.isIntersecting);
    
    if(entry.isIntersecting) {
       setReload((reload)=>!reload)
    } 
  
  };
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    const target = interDemo.current;
    if (target) observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [interDemo]);
  
  
  return (
    <>
      {/* <Header /> */}
      <Container>
        {showModal && (
          <UpdatePrompt closeModal={closeModal} />
        )}
        <div className={style.container}>
          <div
            className={`${style.coverBx} animate__animated animate__fadeInDown `}
          >
            <img
              className={style.cover}
              //src={user?.cover_image || Cover}
              src={res?.cover_image || Cover}
              alt="cover"
            />
          </div>
          <div
            className={`${style.content} animate__animated animate__fadeInUp animate__delay-1s `}
          >
            <div className={style.profileInfo}>
              <div style={{position:'relative',width:'120px',margin:'auto'}} className={style.avatar}>
                <img
                  // src={user?.image || dark === 'true' ? Avatar : Av2}
                  // src={user?.image || Av2}
                  src={res?.avatar?.url || Av2}
                  alt="avatar"
                />
                {userState?.user?.verified&&<svg style={{position:'absolute',right:'0',top:'100%'}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.7844 10.1977L27.7401 10.533L28.0349 10.6989C29.8213 11.7044 30.9829 13.6172 30.9829 15.7387C30.9829 17.8601 29.8213 19.7729 28.0349 20.7784L27.7401 20.9443L27.7844 21.2797C27.8179 21.533 27.8352 21.785 27.8352 22.0341C27.8352 25.479 24.7258 28.2389 21.286 27.7789L20.95 27.734L20.7839 28.0295C19.78 29.8156 17.8674 30.9773 15.7443 30.9773C13.6212 30.9773 11.7085 29.8156 10.7047 28.0295L10.5386 27.7341L10.2027 27.7789C6.75537 28.2389 3.65355 25.4795 3.65335 22.0345C3.65371 21.7823 3.67064 21.5303 3.70403 21.2803L3.74888 20.9446L3.45368 20.7784C1.66721 19.7729 0.505615 17.8601 0.505615 15.7387C0.505615 13.6172 1.66721 11.7044 3.45368 10.6989L3.74845 10.533L3.70412 10.1977C3.67063 9.94431 3.65335 9.69237 3.65335 9.4432C3.65335 5.99692 6.75602 3.23126 10.2016 3.69829L10.5382 3.74391L10.7047 3.4478C11.7085 1.66169 13.6212 0.5 15.7443 0.5C17.8674 0.5 19.78 1.66169 20.7839 3.4478L20.9504 3.744L21.2871 3.69827C24.725 3.2313 27.8352 5.99721 27.8352 9.4432C27.8352 9.69237 27.8179 9.94431 27.7844 10.1977ZM13.7438 23.0401L14.096 23.3969L14.4518 23.0437L23.5 14.0633L23.8547 13.7112L23.5028 13.3563L21.2868 11.1214L20.9346 10.7662L20.5795 11.1186L14.1252 17.5237L10.9252 14.2825L10.5742 13.927L10.2184 14.2778L7.97718 16.4875L7.62088 16.8388L7.97242 17.1948L13.7438 23.0401Z" fill="#0D84F1" stroke="#F4F4F5" />
                </svg>}

              </div>
              <div className={style.title}>
                {res && (
                  <h1>
                    {res.username || shortenAddress(currentAddress) || res.username}
                  </h1>
                )}
                {!res && <h1>User</h1>}
                {res && (

                  <Link to="/editProfile">
                    <img src={dark === 'true' ? Edit2 : Edit} alt="edit" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div
            //className={style.filters}
            className={`${style.filters} animate__animated animate__fadeInUp animate__delay-1s `}
          >
            <div
              //className={style.filterItemA}
              className={
                query === '' && dark === 'true'
                  ? style.darkActive
                  : query === '' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('')}
            >
              <p>All</p>
            </div>
            <div
              //className={style.filterItem}
              className={
                query === 'collected' && dark === 'true'
                  ? style.darkActive
                  : query === 'collected' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('collected')}
            >
              <p>Collected</p>
            </div>
            <div
              className={
                query === 'on_sale' && dark === 'true'
                  ? style.darkActive
                  : query === 'on_sale' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('on_sale')}
            >
              <p>On sale</p>
            </div>
           
        
            <div
              className={
                query === 'sold' && dark === 'true'
                  ? style.darkActive
                  : query === 'sold' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('sold')}
            >
              <p>Sold</p>
            </div>
            <div className={
              query === 'watchlist' && dark === 'true'
                ? style.darkActive
                : query === 'watchlist' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
            }
              onClick={(e) => setQuery('watchlist')}
            >
              <p>My Watchlist</p>
            </div> 
          </div>


          <div className={style.filtersM}>
            <Filters setQuery={(e:string)=>setQuery(e)} />
          </div>

          {isLoading ? (
            <div className={style.loaderBx}> <Loader /></div>

          ) : (
            <div
              //className={style.items}
              className={`${style.items} animate__animated animate__fadeInUp  `}
            >
                {collectibles?.length >= 1 && (query ===''||query === undefined) ? (
                <>
                  <div className={style.itemsContent}>
                

                   {collectibles?.map((nft: any, i: any) => {
                      return (
                        (nft?.metadata?.image) && (
                          <div className={style.itemBx} key={nft._id}>
                           <Item nftData={nft}/>
                          </div>
                        )
                      )
                    })} 
                    
                  </div>
                  
                </>
                ) :collectibles?.length >= 1 && (query==='created'||query==='collected')? (
                     
                      <>
                        <div className={style.itemsContent}>
                               
                          {collectibles?.map((nft: any, i: any) => {
                            return (
                             
                                <div className={style.itemBx} key={nft._id}>
                                  <Item nftData={nft} />
                                </div>
                          
                            )
                          })}

                        </div>
                      </>
                 
                  ) : collectibles?.length >= 1 && (query === 'on_sale' ) ? (

                    <>
                      <div className={style.itemsContent}>

                        {collectibles?.map((nft: any, i: any) => {
                          return (

                            <div className={style.itemBx} key={nft._id}>
                              <Item nftData={nft} />
                            </div>

                          )
                        })}

                      </div>
                    </>

                    ) : collectibles?.length >= 1 && (query === 'watchlist') ?<Watchlist array={collectibles} />
                    :collectibles?.length >= 1 && query === 'sold'? (
                    <Sold array={collectibles} />)  :(
                  <div className={style.noContent}>
                        {/* <ItemCard nftData={nft} /> */}
                      <div className={style.noResults}>
                      <img src={Sad} alt="sad" />
                      <h2>No items found</h2>
                      <Link to="/explore" className={style.explore}>
                      <p>Explore marketplace</p>
                      <img src={Arrow} alt="arrow" />
                    </Link>
                  </div>
                </div>
              )}
           
           
            </div>)}
            <div ref={interDemo}></div>

        </div>
      </Container>
    </>
  )
}

export default Profile


const Sold = (props:any)=>{
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

  const getuserbyId= async(id:any)=>{
    const res = await Protected(sessionStorage.getItem('token'))['get'](`/api/user/${id}`)

    return res.data
    
  }

 
 
  
  return(
    <div className='sold'>
        <div className="tableHead">
          
          <div className="name">Item</div>
          <div className="quantity">Quantity</div>
          <div className="address">To</div>
          <div className="value">Value</div>
        </div>

        {
        props.array &&  props?.array?.map((item:any)=>(
<div className="tableRow">
        
        <div className="name">
          <div className="img">
            <img src={getImageUrl(item?.listingInfo?.url)} alt="alt" />
          </div>
          {item?.listingInfo?.name}
        </div>
        <div className="quantity">{item.amount}</div>
       {item.buyer && <div className="address">{shortenAddress(item?.buyer?.walletAddress )}</div>}
        <div className="value">{Number(item.price)} {item?.erc20Info?.symbol}</div>
      </div>
          ))
        }
      
    </div>
  )
}

const Watchlist = (props: any) => {
  console.log(props.array);
  function dataURItoBlob(dataURI: any) {
    return `data:image/png;base64,${dataURI}`
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

  const getuserbyId = async (id: any) => {
    const res = await Protected(sessionStorage.getItem('token'))['get'](`/api/user/${id}`)

    return res.data

  }




  return (
    <div className='sold'>
      <div className="tableHead">

        <div className="name">Item</div>
       
        <div className="address">Token ID</div>
        <div className="value">Number of watchers</div>
      </div>

      {
        props.array && props?.array?.map((item: any) => (
          <div className="tableRow">

            <div className="name">
              <div className="img">
                <img src={dataURItoBlob(item.sImg)} alt="alt" />
              </div>
              {item?.name}
            </div>
            <div className="address">{item.tokenId}</div>
           
            <div className="value">{item?.watchCount}</div>
          </div>
        ))
      }

    </div>
  )
}

const Item= (data:any)=>{

  // console.log(data)
 
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

  const { Response, error, fetchData, loading } = UseAxios()


  // console.log(data.nftData);


  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const navigate = useNavigate()

  const open = () => {
 
    if (!data.nftData?.listingType) navigate(`/item/${data?.nftData?.token_address || data?.nftData?.nftInfo?.address}/${data?.nftData?.token_id || data?.nftData?.listingInfo.tokenId}`) //for unlisted items
    else 
    {
      navigate(`/explorebuy/${data?.nftData?.moreInfo?.contractAddress || data?.nftData?.nftInfo?.address}/${ data?.nftData?.id}`)
    }
    

    
   
  }
  // console.log(data?.nftData?.nftInfo, data?.nftData?.nftInfo?.address, data?.nftData?.id, data?.nftData?.listingInfo?.tokenId);
  
  return(
    <div onClick={open} className="item">
     <div className="img">
        <img src={getImageUrl(data.nftData.url || data.nftData?.metadata?.image || data.nftData?.moreInfo?.url || data.nftData?.listingInfo?.url)} alt="img" />
       <div className="details">
          <div className="name">{data?.nftData?.metadata?.name || data?.nftData?.moreInfo?.name || data?.nftData?.name || data?.nftData?.listingInfo?.name}</div>
          {(data.nftData?.moreInfo || data.nftData?.listingInfo) && <div className="price">
          <div>Floor</div>
          {Number(data.nftData.price) + ' '} 
            {data.nftData?.moreInfo?.erc20TokenSymbol || data.nftData?.erc20Info?.symbol}
         </div>}
     </div>
     </div>
    
    </div>
  )
}
