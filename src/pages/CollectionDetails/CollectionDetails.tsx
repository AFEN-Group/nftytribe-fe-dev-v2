import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import style from './CollectionDetails.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
import Avatar from './assets/avatar.svg'
import Edit from './assets/edit.svg'
//
import IG from './assets/ig.svg'
import Settings from './assets/settings.svg'
import Share from './assets/share.svg'
import Reddit from './assets/reddit.svg'
import Filter from './assets/Filter.svg'
import Arrow1 from './assets/arrowdown.svg'
import Sad from './assets/sad.svg'
import Arrow from './assets/arrow.svg'
//import ItemCard from '../../components/Card/ItemCardDefault'
import ItemCard from '../../components/Card/ItemCard'
import Container from '../../components/Container/Container'
import Arrow2 from './assets/arrowright.svg'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../../utils/requestMethods'

const CollectionDetails = () => {
  //const [view, setView] = useState('items')
  const [tab, setTab] = useState('all')
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const [filter, setFilter] = useState("")
  const [filterQuery, setFilterQuery] = useState('')
  const [collectibles, setCollectibles] = useState([])
  const [collection, setCollection] = useState<any>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { collectionId } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    const getCollectiblesForCollection = async () => {
      console.log(collectionId, 'hello')
      const response = await publicRequest.get(
        `/collections/${collectionId}/collectibles?page=${currentPage}`,
      )
      //const resp = await data.json()
      console.log(response)
      setCollection(response?.data?.data.collection)
      setCollectibles(response?.data?.data.collectibles)
      setTotalPages(Math.round(response.data.data.total_count / 10))

      //setIsLoading(false)
    }
    getCollectiblesForCollection()
  }, [collectionId, currentPage])

  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage - 1)
    }
  }

  const setDefaults = () => {
    setFilterQuery('')
    setTab("")
  }
  return (
    <>
      <Header />
      <Container>
        <div className={style.container}>
          <div
            //className={style.coverBx}
            className={`${style.coverBx} animate__animated animate__fadeInDown `}
          >
            <img src={Cover} alt="cover" />
          </div>
          <div
            //className={style.content}
            className={`${style.content} animate__animated animate__fadeInUp animate__delay-1s `}
          >
            <div className={style.avatar}>
              {/* <img src={Avatar} alt="avatar" /> */}
              <img src={collection?.cover_image || Avatar} alt="avatar" />
            </div>
            <div className={style.collInfo}>
              <div className={style.infoMain}>
                <div className={style.infoTitle}>
                  <h1>{collection?.title}</h1>
                  {/* <img src={Edit} alt="edit" /> */}
                </div>
                <p>
                  Welcome to the home of {collection?.title}. Discover items in
                  this collection.
                  { }
                </p>
                <div className={style.infoBoxes}>
                  <div className={style.boxRow}>
                    <div
                      className={`${style.singleBox} ${dark === 'true' ? 'darkGradient' : ''
                        } `}
                    >
                      <h3>{collectibles?.length}</h3>
                      <p>Items</p>
                    </div>
                    <div
                      // className={style.singleBox}
                      className={`${style.singleBox} ${dark === 'true' ? 'darkGradient' : ''
                        } `}
                    >
                      <h3>0</h3>
                      <p>Owners</p>
                    </div>
                  </div>
                  <div className={style.boxRow}>
                    <div
                      //className={style.singleBox}
                      className={`${style.singleBox} ${dark === 'true' ? 'darkGradient' : ''
                        } `}
                    >
                      <h3>---</h3>
                      <p>Floor price</p>
                    </div>
                    <div
                      //className={style.singleBox}
                      className={`${style.singleBox} ${dark === 'true' ? 'darkGradient' : ''
                        } `}
                    >
                      <h3>0.00</h3>
                      <p>Vol traded</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
                //className={style.infoIcons}
                className={`${style.infoIcons} ${dark === 'true' ? 'darkGradient' : ''
                  } `}
              >
                <img src={IG} alt="IG" />
                <img src={Settings} alt="settings" />
                <img src={Share} alt="share" />
                <img src={Reddit} alt="reddit" />
              </div> */}
            </div>
            <div className={style.collectionBody}>
              {/* <div className={style.mainNav}>
                <div
                  //className={style.mItemA}
                  className={`${style.mItemA} ${dark === 'true' ? 'yellowTxt' : ''} `}
                >
                  <p>Items</p>
                </div>
                <div className={style.mItem}>
                  <p>Activity</p>
                </div>
              </div> */}
              {/* <div
                className={style.exploreCats}
              //className={`${style.exploreCats} animate__animated animate__fadeInUp animate__delay-1s`}
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
              </div> */}
              <div className={style.itemsBody}>
                <div
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
                          <div className={style.filterTxt} >
                            <p>Fixed Sale</p>
                          </div>

                          {/* <div className={style.radioBx}> <RadioBtn /></div> */}
                          <div className={style.pbRadio} onClick={() => setFilterQuery("&marketplace_type=1")}>
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                          </div>
                        </div>
                        <div className={style.filterItem}>
                          <div className={style.filterTxt} >
                            <p>Auctions</p>
                          </div>
                          <div className={style.pbRadio} onClick={() => setFilterQuery("&marketplace_type=2")}>
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
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
                          <div className={style.filterTxt}>
                            <p>Ethereum</p>
                          </div>
                          <div className={style.pbRadio} onClick={() => setFilterQuery("&chain=rinkeby")}>
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                          </div>

                        </div>
                        <div className={style.filterItem}>
                          <div className={style.filterTxt}>
                            <p>Binance</p>
                          </div>
                          <div className={style.pbRadio} onClick={() => setFilterQuery("&chain=binance")}>
                            <input type="radio" name="filter" />
                            <span className={style.checkmark}></span>
                          </div>
                        </div>
                      </div>)}
                    <div className={style.sBItem}>
                      <p>Recently added</p>
                      {/* <AcceptBtn onClick={setDefaults} /> */}
                      <div className={style.pbRadio} onClick={setDefaults}>
                        <input type="radio" name="filter" />
                        <span className={style.checkmark}></span>
                      </div>
                      {/* <img src={Arrow1} alt="filter" /> */}
                    </div>
                    {/* <div className={style.sBItem} onClick={() => setFilter("collection")}>
                    <p>Collection</p>
                    <img src={filter === 'collection' ? Arrow2 : Arrow1} alt="filter" />

                  </div> */}
                    {filter === "collection" && (
                      <div className={`${dark === "true" ? style.filterBxD : style.filterBxL} animate__animated animate__fadeIn`}
                      >
                        <div className={style.filterItem}>
                          <p>Fixed Sale</p>
                          <div className={style.radio}>

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
                        {/* <p>
                          Page {currentPage} of {totalPages}
                        </p> */}
                      </div>
                    </>
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
                  {/* <div className={style.itemsContent}>
                    <div className={style.itemBx}>
                      <ItemCard />
                    </div>
                   
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CollectionDetails
