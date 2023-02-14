import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
// import { AuthContext } from '../../context/AuthContext'
import style from './Profile.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
//import Avatar from './assets/user3.svg'
import Av2 from './assets/avatar.bmp'
import Edit from './assets/edit.svg'
import Edit2 from './assets/edit2.svg'
import Sad from './assets/sad.svg'
import Arrow from './assets/arrow.svg'
import Container from '../../components/Container/Container'
import './index.scss'
import ItemCard from '../../components/Card/ItemCard'
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
  const [totalPages, setTotalPages] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState<any>()
  const [currentChain, setCurrentChain] = useState<any>()
  //console.log('auth>>', authState)



  
 
  // const {error:getError,loading:getLoading,Response:response,fetchData:getData}=UseAxios()
  const {error:Error,loading:Loading,Response:postResponse,fetchData:Data}=UseAxios()
  const {userState,setUserState}=useContext(UserContext)

  useEffect(()=>{
    setRes(userState?.user)
  },[userState])


  useEffect(() => {
    window.scrollTo(0, 0)
    if (currentChainId === '0x1') {
      setCurrentChain('eth')
    } else if (currentChain === '0x38') {
      setCurrentChain('bsc')
    }
    // console.log(currentAddress);
     setUserState({...userState,currentAddress:currentAddress})
  }, [currentAddress])
 

  useEffect(() => {
    console.log(currentPage);
    if(!query||query===''){
      Data({
        method: 'get',
        url: `api/nft/user/${currentAddress}?page=${currentPage!==null && currentPage}&chain=${currentChainId}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
      })
    }

    else if(query=='on_sale'){
      Data({
        method: 'get',
        url: `api/nft/listings?owner=${userState.user.id}&chain=${chain.filter((chain: any) => { return chain.chain === currentChainId })[0].id}`,
        axiosInstance: Protected(sessionStorage.getItem('token'))
      })
    }
   else Data({
     method:'get',
     url:  `api/nft/transactions/?type=${query}&page=${currentPage}&limit=10`,
     axiosInstance:Protected(sessionStorage.getItem('token'))
    })
    
  }, [currentAddress, currentPage,query])



 useEffect(()=>{
     console.log(postResponse);
     type data={
      data?:any
     }
     const {data}=postResponse||({} as data)
     setTotalPages(data?.cursor);
  
    //  console.log(data.results);
     
      if(!query)setCollectibles(data?.result)
      else setCollectibles(data)
    
      setIsLoading(false)
  },[postResponse] )

 
 console.log(collectibles);
 
  
  const nextPage = () => {
     setCurrentPage(totalPages)   
  }
 
  const closeModal = () => {
    setShowModal(false)
  }
 

  const interDemo = useRef(null);

  const callBack = (entries:any) => {
    // console.log(entries);
    
    const [entry] = entries;
    console.log(entry.isIntersecting);
    
    if(entry.isIntersecting)  nextPage();
    return
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
            {/* <div className={style.filterItem}>
              <p>Physical Items</p>
            </div> */}
          </div>


          <div className={style.filtersM}>
            <Filters />
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

                  ) 
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
        <div className="address">{ item.buyerId }</div>
        <div className="value">{parseInt(item.price)} {item?.erc20Info?.symbol}</div>
      </div>
          ))
        }
      
    </div>
  )
}


const Item= (data:any)=>{

  console.log(data)
 
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


  console.log(data.nftData);


  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const navigate = useNavigate()

  const open = () => {
 
    if(!data.nftData?.nftInfo)  {
       navigate(`/explorebuy/${data?.nftData?.moreInfo?.contractAddress}/${data?.nftData?.id}`)
      // else navigate(`/explorebid/${data?.nftData?.moreInfo?.contractAddress}/${data?.nftData?.id}`)
    }
    else 
    navigate(`/item/${data?.nftData?.nftInfo?.address}/${ data?.nftData?.id}`)

    
   
  }
  console.log(data?.nftData?.nftInfo, data?.nftData?.nftInfo?.address, data?.nftData?.id, data?.nftData?.listingInfo?.tokenId);
  
  return(
    <div onClick={open} className="item">
     <div className="img">
        <img src={getImageUrl(data.nftData.url || data.nftData?.metadata?.image || data.nftData?.listingInfo?.url)} alt="img" />
       <div className="details">
          <div className="name">{data?.nftData?.metadata?.name || data?.nftData?.listingInfo?.name}</div>
         {data.nftData.listingInfo && <div className="price">
          <div>Floor</div>
          {data.nftData.price} {data.nftData.erc20Info.symbol}
         </div>}
     </div>
     </div>
    
    </div>
  )
}
