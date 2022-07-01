import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { AuthContext } from '../../context/AuthContext'
import style from './Profile.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
//import Avatar from './assets/user3.svg'
import Av2 from './assets/user5.svg'
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

const Profile = () => {
  //const [tab, setTab] = useState('all')
  const [themeState] = useContext<any>(ThemeContext)
  const [authState] = useContext<any>(AuthContext)
  const dark = themeState.dark
  const user = authState.user
  ///console.log(user)
  const [collectibles, setCollectibles] = useState<any>()
  const currentAddress: any = localStorage.getItem('currentAccount')
  const [res, setRes] = useState<any>()
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState<any>()
  //console.log('auth>>', authState)

  useEffect(() => {
    window.scrollTo(0, 0)
    const getUser = async () => {
      try {
        const result = await publicRequest.get(`/user/${currentAddress}`)
        console.log('user>>>', result.data.data.email)
        setRes(result.data.data)
        setIsLoading(false)
        if (!result.data.email || result.data.email === "") {
          setShowModal(true)
        } else {
          setShowModal(false)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    if (currentAddress) {
      getUser()
    }
  }, [currentAddress])
  useEffect(() => {
    setCurrentPage(1)
    //setTotalPages(1)
  }, [query])

  useEffect(() => {
    const fetchUserNfts = async () => {
      try {
        setIsLoading(true)
        const result = await publicRequest.get(
          `/user/get-collectibles?wallet_address=${currentAddress}&${query}&page=${currentPage}&size=9`,
        )
        //console.log('res>', result)
        setCollectibles(result.data.data.collectibles)
        setTotalPages(Math.round(result.data.data.total_count / 10))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    if (currentAddress) {
      fetchUserNfts()
    }
  }, [currentAddress, query, currentPage])
  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1)
      //localStorage.setItem("")
    }
  }
  const prevPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage - 1)
    }
  }
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Header />
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
                  src={res?.image || Av2}
                  alt="avatar"
                />
              </div>
              <div className={style.title}>
                {res && (
                  <h1>
                    {res.name || shortenAddress(currentAddress) || res.name}
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
            {/* <div
              className={
                query === 'activity=true' && dark === 'true'
                  ? style.darkActive
                  : query === 'activity=true' && dark !== 'true'
                    ? style.lightActive
                    : style.filterItem
              }
              onClick={(e) => setQuery('activity=true')}
            >
              <p>Activity</p>
            </div> */}
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
              {collectibles?.length >= 1 ? (
                <>
                  <div className={style.itemsContent}>
                    {collectibles?.map((nft: any, i: any) => {
                      return (
                        nft?._id && (
                          <div className={style.itemBx} key={nft._id}>
                            <ItemCard nftData={nft} />
                          </div>
                        )
                      )
                    })}
                  </div>
                  {totalPages > 1 && (
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
                    </div>)}
                </>
              ) : (
                <div className={style.noContent}>
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
        </div>
      </Container>
    </>
  )
}

export default Profile
