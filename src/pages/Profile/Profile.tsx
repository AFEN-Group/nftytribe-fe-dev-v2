import { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
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
import { publicRequest } from '../../utils/requestMethods'
import ItemCard from '../../components/Card/ItemCard'
import { shortenAddress } from '../../utils/formatting'
import Filters from './Filters'
import Loader from '../../components/Loader/Loader'
import UpdatePrompt from './Modals/UpdatePrompt'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { type } from 'os'
import { UserContext } from '../../context/UserContext'

const Profile = () => {
  //const [tab, setTab] = useState('all')
  const [themeState] = useContext<any>(ThemeContext)
  // const [authState] = useContext<any>(AuthContext)
  const dark = themeState.dark
  // const user = authState.user
  ///console.log(user)
  const [collectibles, setCollectibles] = useState<any>()
  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const currentChainId = sessionStorage.getItem('chain')
  const [res, setRes] = useState<any>()
  const [query, setQuery] = useState('')
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
  console.log(sessionStorage.getItem('token'))

  useEffect(() => {
    console.log(currentPage);
    
    Data({
     method:'get',
     url:  `api/nft/user/${currentAddress}/?&${query}&page=${currentPage}&chain=${currentChainId}`,
     axiosInstance:Protected(sessionStorage.getItem('token'))
    })
    
  }, [currentAddress, currentPage])

// console.log(postResponse);

 useEffect(()=>{
     console.log(postResponse);
     type data={
      data?:any
     }
     const {data}=postResponse||({} as data)
     setTotalPages(data?.cursor);
    //  console.log(data?.result);
     
      setCollectibles(data?.result)
      // setTotalPages(Math.round(data?.data.total_count / 10))
      setIsLoading(false)
  },[postResponse] )
// console.log(Loading);

// const  [userNfts,setNfts]=useState(async()=>{
//   try {
    
//   } catch (error) {
    
//   }
// })
 
 console.log(currentChainId);
 
  
  const nextPage = () => {
     setCurrentPage(totalPages)   
  }
  // const prevPage = () => {
  //   if (currentPage <= totalPages) {
  //     setCurrentPage(currentPage - 1)
  //   }
  // }
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
                query === 'collected=true' && dark === 'true'
                  ? style.darkActive
                  : query === 'collected=true' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('collected=true')}
            >
              <p>Collected</p>
            </div>
            <div
              className={
                query === 'on_sale=true' && dark === 'true'
                  ? style.darkActive
                  : query === 'on_sale=true' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('on_sale=true')}
            >
              <p>On sale</p>
            </div>
            <div
              className={
                query === 'created=true' && dark === 'true'
                  ? style.darkActive
                  : query === 'created=true' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('created=true')}
            >
              <p>Created</p>
            </div>
        
            <div
              className={
                query === 'sold=true' && dark === 'true'
                  ? style.darkActive
                  : query === 'sold=true' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('sold=true')}
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
              {collectibles?.length >= 1 && query !== 'sold=true' ? (
                <>
                  <div className={style.itemsContent}>
                

                    {collectibles?.map((nft: any, i: any) => {
                      return (
                        (nft?.metadata?.image) && (
                          <div className={style.itemBx} key={nft._id}>
                            <ItemCard nftData={nft} />
                          </div>
                        )
                      )
                    })}
                  </div>
                  {/* {totalPages > 1 && (
                    <div className={style.pagination}>
                      <div className={style.paginateBtns}>
                        {currentPage > 1 && (
                          <button
                            className={`${style.filterItem} ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                              }`}
                            onClick={prevPage}
                          >
                            {'Prev'}
                          </button>
                        )}
                        {currentPage < totalPages && (
                          <button
                            className={`${style.filterItem} ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                              }`}
                            onClick={nextPage}
                          >
                            {'Next'}
                          </button>
                        )}
                      </div>
                      <p>
                        Page {currentPage} of {totalPages}
                      </p>
                    </div>)} */}
                </>
              ) : (
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
           
              {/* <div className={style.itemContent}>
              <div className={style.noResults}>
                <img src={Sad} alt="sad" />
                <h2>No items found</h2>
                <Link to="/explore" className={style.explore}>
                  <p>Explore marketplace</p>
                  <img src={Arrow} alt="arrow" />
                </Link>
              </div>
            </div> */}
            </div>)}
            <div ref={interDemo}></div>

        </div>
      </Container>
    </>
  )
}

export default Profile
