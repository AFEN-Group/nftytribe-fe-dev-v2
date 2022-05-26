import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import style from './Profile.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
import Avatar from './assets/avatar.svg'
import Edit from './assets/edit.svg'
import Sad from './assets/sad.svg'
import Arrow from './assets/arrow.svg'
import Container from '../../components/Container/Container'
import { publicRequest } from '../../utils/requestMethods'
import ItemCard from '../../components/Card/ItemCard'

const Profile = () => {
  const [tab, setTab] = useState('all')
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const [collectibles, setCollectibles] = useState<any>()
  const currentAddress = localStorage.getItem('currentAccount')
  //const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchUserNfts = async () => {
      try {
        const result = await publicRequest.get(
          `/user/get-collectibles?wallet_address=${currentAddress}&collected=true&page=1&size=10`,
        )
        console.log(result)
        setCollectibles(result.data.data.collectibles)
        //setTotalPages(Math.round(result.data.data.total_count / 10))
        //setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserNfts()
  }, [currentAddress])
  return (
    <>
      <Header />
      <Container>
        <div className={style.container}>
          <div
            className={`${style.coverBx} animate__animated animate__fadeInDown `}
          >
            <img src={Cover} alt="cover" />
          </div>
          <div
            className={`${style.content} animate__animated animate__fadeInUp animate__delay-1s `}
          >
            <div className={style.profileInfo}>
              <div className={style.avatar}>
                <img src={Avatar} alt="avatar" />
              </div>
              <div className={style.title}>
                <h1>Michael Carson</h1>
                <Link to="/editProfile">
                  <img src={Edit} alt="edit" />
                </Link>
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
                tab === 'all' && dark === 'true'
                  ? style.darkActive
                  : tab === 'all' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
              }
              onClick={(e) => setTab('all')}
            >
              <p>All</p>
            </div>
            <div
              //className={style.filterItem}
              className={
                tab === 'collected' && dark === 'true'
                  ? style.darkActive
                  : tab === 'collected' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
              }
              onClick={(e) => setTab('collected')}
            >
              <p>Collected</p>
            </div>
            <div
              className={
                tab === 'onSale' && dark === 'true'
                  ? style.darkActive
                  : tab === 'onSale' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
              }
              onClick={(e) => setTab('onSale')}
            >
              <p>On sale</p>
            </div>
            <div
              className={
                tab === 'created' && dark === 'true'
                  ? style.darkActive
                  : tab === 'created' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
              }
              onClick={(e) => setTab('created')}
            >
              <p>Created</p>
            </div>
            <div
              className={
                tab === 'activity' && dark === 'true'
                  ? style.darkActive
                  : tab === 'activity' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
              }
              onClick={(e) => setTab('activity')}
            >
              <p>Activity</p>
            </div>
            <div
              className={
                tab === 'sold' && dark === 'true'
                  ? style.darkActive
                  : tab === 'sold' && dark !== 'true'
                  ? style.lightActive
                  : style.filterItem
              }
              onClick={(e) => setTab('sold')}
            >
              <p>Sold</p>
            </div>
            {/* <div className={style.filterItem}>
              <p>Physical Items</p>
            </div> */}
          </div>
          <div
            //className={style.items}
            className={`${style.items} animate__animated animate__fadeInUp animate__delay-2s `}
          >
            {collectibles?.length >= 1 ? (
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
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile
