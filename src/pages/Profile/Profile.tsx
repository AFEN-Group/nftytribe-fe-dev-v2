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
              <div className={style.avatar}>
                <img
                  // src={user?.image || dark === 'true' ? Avatar : Av2}
                  // src={user?.image || Av2}
                  src={res?.avatar?.url || Av2}
                  alt="avatar"
                />
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
