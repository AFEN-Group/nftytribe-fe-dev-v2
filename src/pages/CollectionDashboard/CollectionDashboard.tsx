import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { gsap, Expo } from 'gsap'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import style from './CollectionDashboard.module.scss'
import arrowA from './assets/arrow.svg'
//import arrow1 from './assets/arrow0.svg'
import arrow2 from './assets/arrowgr.svg'
//import arrow3 from './assets/arrowred.svg'
import user from './assets/user.svg'
import Container from '../../components/Container/Container'
import { publicRequest } from '../../utils/requestMethods'
//import nArrow from './assets/arrow-right.svg'

const CollectionDashboard = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  let itemNumber = 1
  let itemNumber2 = 1
  const [filter, setFilter] = useState({
    period: '',
    chain: ''
  })
  const [showDrop, setShowDrop] = useState({
    period: false,
    chain: false
  })

  const [collections, setCollections] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    getCollections()
  }, [])
  useEffect(() => {
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

  const getCollections = async () => {
    const resp = await publicRequest.get(`/collections`)
    setCollections(resp.data.data)
  }

  const getImage = (uri: any) => {
    let url
    if (uri.includes('ipfs/')) {
      url = `https://ipfs.io/ipfs/${uri.split('ipfs/')[1]}`
    } else if (uri.includes('ipfs://')) {
      url = `https://ipfs.io/ipfs/${uri.split('ipfs://')[1]}`
    }
    return url
  }

  return (
    <>
      <Header />
      <Container>
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.top}>
              <h1>
                <span id="heroTitle">Collection statistics</span>{' '}
              </h1>
              <p>
                <span id="heroText">
                  Top Nfts are ranked according to Volume and floor price.
                </span>
              </p>

            </div>
            <div className={style.filtersContainer}>


              <div
                className={`${style.filters} animate__animated animate__fadeInUp animate__delay-1s`}
              >

                {/* <div className={style.filter}>
                <p>Categories</p>
                <img src={arrowA} alt="categories" />
              </div> */}
                <div className={style.filter} onClick={() => setShowDrop({ ...showDrop, chain: !showDrop.chain })}>
                  <p>{filter.chain === "" ? 'Chains' : filter.chain}</p>
                  <img src={arrowA} alt="categories" />

                </div>

                <div className={style.filter} onClick={() => setShowDrop({ ...showDrop, period: !showDrop.period })}>
                  <p>{filter.period === "" ? 'Last 24 hours' : filter.period}</p>
                  <img src={arrowA} alt="categories" />
                </div>

              </div>
              {showDrop.chain && (
                <div className={`${style.drop} ${dark === 'true' ? 'darkTheme' : 'lightTheme'} animate__animated animate__fadeInUp animate__faster`}
                  onClick={() => setShowDrop({ ...showDrop, chain: !showDrop.chain })}
                >
                  <p onClick={() => setFilter({ ...filter, chain: "Eth" })}>Ethereum</p>
                  <p className='disable_link2'>Binance</p>
                  <p className='disable_link2'>Skale</p>
                  <p className='disable_link2'>Solana</p>
                </div>
              )}
              {showDrop.period && (
                <div className={`${style.drop2} ${dark === 'true' ? 'darkTheme' : 'lightTheme'} animate__animated animate__fadeInUp animate__faster`}
                  onClick={() => setShowDrop({ ...showDrop, period: !showDrop.period })}
                >
                  <p onClick={() => setFilter({ ...filter, period: "Last 24 hours" })}>Last 24 hours</p>
                  <p onClick={() => setFilter({ ...filter, period: "Last 7 days" })}>Last 7 days</p>
                  <p onClick={() => setFilter({ ...filter, period: "Last month" })}>Last month</p>

                </div>
              )}
            </div>

            <div
              className={`${style.topProTable} animate__animated animate__fadeInUp animate__delay-2s`}
            >
              <div className={style.tpTableTitles}>
                <p>Collection</p>
                <div>
                  <p>Volume</p>
                </div>
                {/* <div>
                  <p>24hr %</p>
                </div>
                <div>
                  <p>7d %</p>
                </div> */}
                <div>
                  <p>Floor price</p>
                </div>
                {/* <div>
                  <p>Owners</p>
                </div>
                <div>
                  <p>Items</p>
                </div> */}
              </div>
              <div className={style.tpTableItems}>
                {!collections
                  ? null
                  : collections.map((collection: any, i) => {
                    return (
                      collection.title && (
                        <Link
                          to={`/collectionDetails/${collection.contract_address}`}
                          className={
                            dark === 'true'
                              ? style.tableItemD
                              : style.tableItem
                          }
                          key={collection._id}
                        >
                          <div className={style.collectionInfo}>
                            <p>{itemNumber++}</p>
                            <img
                              //src={user}
                              src={`
                          ${collection?.cover_image?.includes('/ipfs') ||
                                  collection?.cover_image?.includes('ipfs://')
                                  ? getImage(collection?.cover_image)
                                  : collection?.cover_image
                                    ? collection?.cover_image
                                    : user
                                }
                         
                        `}
                              alt="collection"
                              className={style.user}
                            />
                            <p>{collection?.title || 'Untitled'}</p>
                            {/* <img src={arrow2} alt="arrow-up" /> */}
                          </div>
                          <div className={style.itemAlign}>
                            {/* <p>61,555</p> */}
                            <p>0</p>
                          </div>
                          {/* <div className={style.itemAlign}>
                              <p>
                                <span>+70%</span>
                              </p>
                            </div>
                            <div className={style.itemAlign}>
                              <p>
                                <span>+800%</span>
                              </p>
                            </div> */}
                          <div className={style.itemAlign}>

                            <p>0</p>
                          </div>
                          {/* <div className={style.itemAlign}>
                            
                            <p>0</p>
                          </div> */}
                          {/* <div className={style.itemAlign}>
                           
                            <p>0</p>
                          </div> */}
                        </Link>
                      )
                    )
                  })}
                {/* <div className={style.tableItem}>
                  <div className={style.collectionInfo}>
                    <p>1</p>
                    <img src={user} alt="user" className={style.user} />
                    <p>Avengers</p>
                    <img src={arrow2} alt="arrow-up" />
                  </div>
                  <div className={style.itemAlign}>
                    <p>61,555</p>
                  </div>
                  <div className={style.itemAlign}>
                    <p>
                      <span>+70%</span>
                    </p>
                  </div>
                  <div className={style.itemAlign}>
                    <p>
                      <span>+800%</span>
                    </p>
                  </div>
                  <div className={style.itemAlign}>
                    <p>1 ETH</p>
                  </div>
                  <div className={style.itemAlign}>
                    <p>2k</p>
                  </div>
                  <div className={style.itemAlign}>
                    <p>500</p>
                  </div>
                </div> */}

                <div className={style.line1}></div>
              </div>
            </div>

            <div className={style.topProContainer}>
              {/* <div className={style.tpItem}>
                            <div className={style.tpLeft}>
                                <p>{itemNumber++}</p>
                                <img src={user} alt="user" />
                            </div>
                            <div className={style.tpRight}>
                                <div className={style.tprInfo}>
                                    <h2>Skimming cat</h2>
                                    <p>Floor price: 1Eth</p>
                                </div>
                                <div className={style.tprNumbers}>
                                    <p>+30</p>
                                    <p>Vol: 6</p>
                                </div>
                            </div>

                        </div> */}

              {!collections
                ? null
                : collections.map((collection: any, i) => {
                  return (
                    collection.title && (
                      <Link
                        to={`/collectionDetails/${collection.contract_address}`}
                        className={style.tpItem}
                        key={collection._id}
                      >
                        <div className={style.tpLeft}>
                          <p>{itemNumber2++}</p>
                          <img
                            src={`
                                 ${collection?.cover_image?.includes('/ipfs') ||
                                collection?.cover_image?.includes('ipfs://')
                                ? getImage(collection?.cover_image)
                                : collection?.cover_image
                                  ? collection?.cover_image
                                  : user
                              }
                                
                               `}
                            alt="collection"
                          />
                        </div>
                        <div className={style.tpRight}>
                          <div className={style.tprInfo}>
                            <h2>{collection?.title || 'Untitled'}</h2>
                            <p>Floor price: 0</p>
                          </div>
                          <div className={style.tprNumbers}>
                            <p>+30</p>
                            <p>Vol: 0</p>
                          </div>
                        </div>

                      </Link>
                    )
                  )
                })}

            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CollectionDashboard
