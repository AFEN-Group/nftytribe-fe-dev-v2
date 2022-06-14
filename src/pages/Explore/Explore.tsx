import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { gsap, Expo } from 'gsap'
import { ThemeContext } from '../../context/ThemeContext'
import { publicRequest } from '../../utils/requestMethods'

import Header from '../../components/Header/Header'
import style from './Explore.module.scss'
import Filter from './assets/Filter.svg'
import Arrow1 from './assets/arrowdown.svg'
import Sad from './assets/sad.svg'
import Arrow from './assets/arrow.svg'
import ItemCard from '../../components/Card/ItemCard'
import Container from '../../components/Container/Container'
import Arrow2 from './assets/arrowright.svg'

const Explore = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const [tab, setTab] = useState('all')
  const [data, setData] = useState([])
  const [filter, setFilter] = useState("")
  //const [isLoading, setIsLoading] = useState(true)
  const getExploreCollectibles = async () => {
    try {
      const explore = await publicRequest.get(`/collectibles/explore`)
      const exploreData = explore.data
      console.log(exploreData)
      setData(exploreData?.data?.collectibles)
      //setTotalCount(exploreData?.data?.total_count)
      //setIsLoading(false)
    } catch (error) {
      //setIsLoading(false)
    }
  }
  console.log(data)
  useEffect(() => {
    window.scrollTo(0, 0)
    getExploreCollectibles()
    const heroTitle = document.getElementById('heroTitle')
    const heroText = document.getElementById('heroText')
    const tl = gsap.timeline()
    tl.to(heroTitle, {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
    tl.to(heroText, {
      y: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    })
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className={style.explore}>
          <div className={style.exploreContent}>
            <div className={style.exploreTop}>
              <h1>
                <span id="heroTitle">Explore collections</span>{' '}
              </h1>
              <p>
                <span id="heroText">Based on categories</span>{' '}
              </p>
              <div
                className={`${style.exploreCats} animate__animated animate__fadeInUp animate__delay-1s`}
              >
                <div
                  className={
                    tab === 'all' && dark === 'true'
                      ? style.darkActive
                      : tab === 'all' && dark !== 'true'
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab('all')}
                >
                  <p>All</p>
                </div>
                <div
                  className={
                    tab === 'art' && dark === 'true'
                      ? style.darkActive
                      : tab === 'art' && dark !== 'true'
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab('art')}
                >
                  <p>Art</p>
                </div>
                <div
                  className={
                    tab === 'gaming' && dark === 'true'
                      ? style.darkActive
                      : tab === 'gaming' && dark !== 'true'
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab('gaming')}
                >
                  <p>Gaming</p>
                </div>
                <div
                  className={
                    tab === 'collectibles' && dark === 'true'
                      ? style.darkActive
                      : tab === 'collectibles' && dark !== 'true'
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab('collectibles')}
                >
                  <p>Collectibles</p>
                </div>
                <div
                  className={
                    tab === 'utility' && dark === 'true'
                      ? style.darkActive
                      : tab === 'utility' && dark !== 'true'
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab('utility')}
                >
                  <p>Utility</p>
                </div>
              </div>
            </div>

            <div
              //className={style.body}
              className={`${style.body} animate__animated animate__fadeInUp animate__delay-2s`}
            >
              <div
                //className={style.sideBar}
                className={`${style.sideBar} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                  } `}
                id="sidebar"
              >
                <div className={style.sideBarContent}>
                  <div className={style.sBItemA}>
                    <img src={Filter} alt="filter" />
                    <p>
                      <strong>Filters</strong>
                    </p>
                  </div>
                  {/* <div className={style.sBItem}>
                    <p>Price range</p>
                    <img src={Arrow1} alt="filter" />
                  </div> */}
                  <div className={style.sBItem} onClick={() => setFilter("saleType")}>
                    <p>Sale type</p>
                    <img src={filter === 'saleType' ? Arrow2 : Arrow1} alt="filter" />
                  </div>
                  {filter === "saleType" && (
                    <div className={`${dark === "true" ? style.filterBxD : style.filterBxL} animate__animated animate__fadeIn`}
                    >
                      <div className={style.filterItem1}>
                        <p>Fixed Sale</p>
                        <div className={style.radio}>
                          <input type="radio" />
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <p>Auction</p>
                        <div className={style.radio}>

                        </div>
                      </div>
                    </div>)}
                  <div className={style.sBItem} onClick={() => setFilter("blockchain")}>
                    <p>Blockchain</p>
                    <img src={filter === 'blockchain' ? Arrow2 : Arrow1} alt="filter" />
                  </div>
                  {filter === "blockchain" && (
                    <div className={`${dark === "true" ? style.filterBxD : style.filterBxL} animate__animated animate__fadeIn`}
                    >
                      <div className={style.filterItem1}>
                        <p>Ethereum</p>
                        <div className={style.radio}>
                          <input type="radio" />
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <p>Binance</p>
                        <div className={style.radio}>

                        </div>
                      </div>
                    </div>)}
                  <div className={style.sBItem}>
                    <p>Recently added</p>
                    {/* <img src={Arrow1} alt="filter" /> */}
                  </div>
                  <div className={style.sBItem} onClick={() => setFilter("collection")}>
                    <p>Collection</p>
                    <img src={filter === 'collection' ? Arrow2 : Arrow1} alt="filter" />
                  </div>
                  {filter === "collection" && (
                    <div className={`${dark === "true" ? style.filterBxD : style.filterBxL} animate__animated animate__fadeIn`}
                    >
                      <div className={style.filterItem1}>
                        <p>Fixed Sale</p>
                        <div className={style.radio}>
                          <input type="radio" />
                        </div>
                      </div>
                    </div>)}
                  {/* <div className={style.sBItem}>
                    <p>Price ascending</p>
                    <img src={Arrow1} alt="filter" />
                  </div>
                  <div className={style.sBItem}>
                    <p>Price descending</p>
                    <img src={Arrow1} alt="filter" />
                  </div> */}
                </div>
              </div>
              <div className={style.itemsContainer}>
                {data?.length >= 1 ? (
                  <div className={style.itemsContent}>
                    {data?.map((nft: any, i: any) => {
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
                      <Link to="/explore" className={style.exploreM}>
                        <p>Explore marketplace</p>
                        <img src={Arrow} alt="arrow" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Explore
