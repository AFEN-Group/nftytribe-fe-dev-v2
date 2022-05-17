import { useEffect } from 'react'
import { gsap, Expo } from 'gsap'
import { motion } from 'framer-motion'

import style from '../Home.module.scss'

import ItemCard from '../../../components/Card/ItemCard'

import dot1 from '../assets/yellowdot.svg'
import dot2 from '../assets/bluedot.svg'

const Hero = () => {
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

  return (
    <>
      {/* ------ Hero Section ------ */}
      <div className={style.hero}>
        <div className={style.heroTopContent}>
          <div className={style.heroTopLeft}>
            <div className={style.leftContent}>
              <div
                className={`${style.leftTop} animate__animated animate__slideInDown`}
              >
                <h2>Collect, sell & create</h2>
              </div>
              <h1>
                <span id="heroTitle">NFTs on Nfty Tribe</span>{' '}
              </h1>
              {/* <h1>One of a kind NFTs</h1> */}
              <div className={style.leftBtm}>
                <p>
                  <span id="heroText">
                    {' '}
                    NftyTribe is a multi-chain NFT marketplace facilitating
                    next-level experiences in exchanging NFTs. Users can trade
                    NFTs and seamlessly send and receive physical items tied to
                    NFTs.{' '}
                  </span>
                </p>
                <div
                  className={`${style.leftBtns} animate__animated animate__slideInUp`}
                  id="heroBtns"
                >
                  <button>Join the tribe</button>
                  <button>Explore marketplace</button>
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
              <ItemCard />
            </motion.div>
          </div>
        </div>
      </div>
      <div className={style.heroBtmContent}>
        <div className={style.heroBanners}>
          <div className={style.hBanner1}>
            <ul className={style.hb1Content}>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
            </ul>
          </div>
          <div className={style.hBanner2}>
            <ul className={style.hb2Content}>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
              <li></li>
              <li>The Asmali collection drops on the 15th of August {'>'}</li>
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
    </>
  )
}

export default Hero
