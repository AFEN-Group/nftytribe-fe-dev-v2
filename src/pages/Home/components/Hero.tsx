import { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap, Expo } from 'gsap'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../../context/ThemeContext'
import { publicRequest } from '../../../utils/requestMethods'

import style from '../Home.module.scss'
import ItemCard from '../../../components/Card/ItemCard'
//import ItemCard2 from '../../../components/Card/ItemCardDefault'
import Arrow1 from '../assets/h-arrow1.svg'
import Arrow2 from '../assets/h-arrow2.svg'

import dot1 from '../assets/yellowdot.svg'
import dot2 from '../assets/bluedot.svg'
import ItemSkeleton from '../../../components/Card/ItemSkeleton'
import { useTranslation } from "react-i18next";

const Hero = (props:any) => {
  // const [isLoading, setIsLoading] = useState(true)
 
  const [themeState] = useContext<any>(ThemeContext)
  const currentAccount = sessionStorage.getItem('currentAccount')
  const dark = themeState.dark
  const navigate = useNavigate()
  const { t } = useTranslation();

  console.log(props.isLoading);
  
 

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
      navigate('/createOptions')
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
                  className={`${style.leftTop} animate__animated animate__slideInDown`}>
                  <h2>{t("discover")}</h2>
                </div>
                <h1>
                  <span id="heroTitle">{t("nft-on")}</span>{" "}
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
                      {/* NftyTribe is a multi-chain NFT marketplace facilitating next-level experiences in exchanging NFTs. Users can trade NFTs and seamlessly send and receive physical items tied to NFTs.. */}
                      {/* {t("description")}
                       */}
                      Whether you are an artist looking to showcase your talent, or a collector searching for the perfect addition to your collection, NftyTribe has everything you need. 

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
                      {/* {t("import")} */}
                      Create NFT
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
                        {t("explore-marketplace")}{" "}
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
              style={{display:'contents'}}
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
                {props.isLoading ? <ItemSkeleton /> : <ItemCard nftData={props.featured} />}
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
                {currentAccount && (
                  <Link to="/collections">
                    <button
                      className={
                        dark === 'true'
                          ? style.lButton1_dark
                          : style.lButton1_light
                      }
                    >
                      Create Collection
                    </button>
                  </Link>)}
                <Link to="/explore">
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
                    Explore Marketplace{' '}
                    <img src={dark === 'true' ? Arrow1 : Arrow2} alt="" />
                  </button>
                </Link>
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
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
              </ul>
            </div>
            <div className={style.hBanner2}>
              <ul className={style.hb2Content}>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
                <li></li>
                <li>NFTYTRIBE IS LIVE! {' >'}</li>
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
