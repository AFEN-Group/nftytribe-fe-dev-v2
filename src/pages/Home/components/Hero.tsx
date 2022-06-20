import { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap, Expo } from 'gsap'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../../context/ThemeContext'
import { publicRequest } from '../../../utils/requestMethods'

import style from '../Home.module.scss'
import ItemCard from '../../../components/Card/ItemCardFeaturedOld'
//import ItemCard2 from '../../../components/Card/ItemCardDefault'
import Arrow1 from '../assets/h-arrow1.svg'
import Arrow2 from '../assets/h-arrow2.svg'

import dot1 from '../assets/yellowdot.svg'
import dot2 from '../assets/bluedot.svg'
import ItemSkeleton from '../../../components/Card/ItemSkeleton'

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const [featured, setFeatured] = useState()
  const [themeState] = useContext<any>(ThemeContext)
  const currentAccount = localStorage.getItem('currentAccount')
  const dark = themeState.dark
  const navigate = useNavigate()


  useEffect(() => {
    const getExploreCollectibles = async () => {
      try {
        const explore = await publicRequest.get(`/collectibles/explore`)
        const exploreData = explore.data
        console.log(exploreData)
        setItems(exploreData?.data?.collectibles)
        setFeatured(exploreData?.data?.collectibles[0])
        console.log(exploreData?.data?.collectibles[0])
        //setTotalCount(exploreData?.data?.total_count)
        setIsLoading(false)
      } catch (error) {
        //setIsLoading(false)
      }
    }
    getExploreCollectibles()
  }, [])

  useEffect(() => {
    const heroTitle = document.getElementById('heroTitle')
    const heroText = document.getElementById('heroText')
    //const item = document.getElementById('item')
    const tl = gsap.timeline()
    tl.to(heroTitle, {
      y: 0,
      duration: 1.5,
      //stagger: 0.5,
      //ease: Power3.out,
      ease: Expo.easeInOut,
    })
    tl.to(heroText, {
      y: 0,
      duration: 1.5,
      delay: -1,
      //stagger: 0.5,
      //ease: Power3.out,
      ease: Expo.easeInOut,
    })
  }, [])

  const handleImport = () => {
    if (currentAccount) {
      navigate('/collections')
    }
  }



  return (
    <>
      <div
        className={`${style.heroContainer} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
          }`}
      >

        <div className={style.hero}>
          <div className={style.heroTopContent}>
            <div className={style.heroTopLeft}>
              <div className={style.leftContent}>
                <div
                  className={`${style.leftTop} animate__animated animate__slideInDown`}
                >
                  <h2>Discover, Create & Trade</h2>
                </div>
                <h1>
                  <span id="heroTitle">NFTs on NftyTribe</span>{' '}
                </h1>
                {/* <h1>One of a kind NFTs</h1> */}
                <div className={style.leftBtm}>
                  <p>
                    <span id="heroText">
                      {' '}
                      {/* NftyTribe is a multi-chain NFT marketplace facilitating
                      next-level experiences in exchanging NFTs. Users can trade
                      NFTs and seamlessly send and receive physical items tied
                      to NFTs.  */}
                      NftyTribe is a multi-chain NFT marketplace facilitating next-level experiences in exchanging NFTs. Users can trade NFTs and seamlessly send and receive physical items tied to NFTs..
                    </span>
                  </p>
                  <div
                    className={`${style.leftBtns} ${style.forW} animate__animated animate__slideInUp`}
                    id="heroBtns"
                  >
                    {/* <Link to="/collections"> */}
                    <button
                      id='show3'
                      className={
                        dark === 'true'
                          ? style.lButton1_dark
                          : style.lButton1_light
                      }
                      onClick={handleImport}

                    >
                      Import Collection
                    </button>
                    {/* </Link> */}
                    <Link to="/explore">
                      {' '}
                      <button
                        className={
                          dark === 'true'
                            ? style.lButton2_dark
                            : style.lButton2_light
                        }
                      >
                        Explore Marketplace{' '}
                        <img src={dark === 'true' ? Arrow1 : Arrow2} alt="" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.heroTopRight} id="item">
              <div className={style.dotBox1}>
                <motion.img
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: [120, 0, 120],
                      // x: [-25, 0, -25],
                      transition: {
                        y: {
                          repeat: Infinity,
                          duration: 10.4,
                          ease: 'linear',
                        },
                      },
                    },
                  }}
                  src={dot1}
                  alt="dot"
                />
              </div>
              <div className={style.dotBox2}>
                <motion.img
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: [-180, 0, -180],
                      // x: [-25, 0, -25],
                      transition: {
                        y: {
                          repeat: Infinity,
                          duration: 6.4,
                          ease: 'linear',
                        },
                      },
                    },
                  }}
                  src={dot2}
                  alt="dot"
                />
              </div>
              <motion.div
                className={style.featured}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                    scale: 1.25,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.1,
                      delay: 0.3,
                      scale: {
                        duration: 1.5,
                      },
                    },
                  },
                }}
              >
                {isLoading ? <ItemSkeleton /> : <ItemCard nftData={featured} />}
              </motion.div>
              <div
                className={`${style.leftBtns} ${style.forM} animate__animated animate__slideInUp`}
                id="heroBtns"
              >
                {/* <button
                  className={
                    dark === 'true' ? style.lButton1_dark : style.lButton1_light
                  }
                  onClick={() => setJoinStatus(true)}
                >
                  Join the tribe
                </button> */}
                <Link to="/launchpartners">
                  <button
                    className={
                      dark === 'true'
                        ? style.lButton1_dark
                        : style.lButton1_light
                    }
                  >
                    Launch with us
                  </button>
                </Link>
                {/* <Link to="/collections"> */}
                {' '}
                <button
                  id='show4'
                  className={
                    dark === 'true'
                      ? style.lButton2_dark
                      : style.lButton2_light
                  }
                  onClick={handleImport}
                >
                  Import Collection{' '}
                  <img src={dark === 'true' ? Arrow1 : Arrow2} alt="" />
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className={style.heroBtmContent}>
          <div className={style.heroBanners}>
            <div
              //className={style.hBanner1}
              className={`${style.hBanner1} ${dark === 'true' ? 'gradient3' : 'lightGradient '
                } `}
            >
              <ul className={style.hb1Content}>
                <li>Nftytribe coming on the 30th of June... {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon...{'>'}</li>
                <li></li>
                <li>Nftytribe coming on the 30th of June... {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon... {'>'}</li>
                <li></li>
                <li>Nftytribe coming on the 30th of June...{'>'}</li>
                <li></li>
                <li>Nftytribe coming soon...{'>'}</li>
                <li></li>
                <li>Nftytribe coming on the 30th of June.. {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon... {'>'}</li>
                <li></li>
              </ul>
            </div>
            <div className={style.hBanner2}>
              <ul className={style.hb2Content}>
                <li>Nftytribe coming on the 30th of June... {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon... {'>'}</li>
                <li></li>
                <li>Nftytribe coming on the 30th of June... {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon... {'>'}</li>
                <li></li>
                <li>Nftytribe coming on the 30th of June... {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon... {'>'}</li>
                <li></li>
                <li>Nftytribe coming on the 30th of June... {'>'}</li>
                <li></li>
                <li>Nftytribe coming soon...{'>'}</li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className={style.dots2}>
            <div className={style.dotBox3}>
              <motion.img
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: [-90, 0, -90],
                    x: [-75, 0, 75, 0, -75],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 12.4,
                        ease: 'linear',
                      },
                      x: {
                        repeat: Infinity,
                        duration: 10.4,
                        ease: 'linear',
                      },
                    },
                  },
                }}
                src={dot1}
                alt="dot"
              />
            </div>
            <div className={style.dotBox4}>
              <motion.img
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: [-180, 0, -180],
                    // x: [-25, 0, -25],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 6.4,
                        ease: 'linear',
                      },
                    },
                  },
                }}
                src={dot2}
                alt="dot"
              />
            </div>{' '}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
