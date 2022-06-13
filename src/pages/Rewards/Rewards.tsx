import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import Header from '../../components/Header/Header'
// import Footer from '../../components/Footer/Footer'
import style from './Rewards.module.scss'
import Shape1 from './assets/shape01.svg'
import Shape2 from './assets/shape2.svg'
import Shape3 from './assets/shape3.svg'
import Shape4 from './assets/shape4.svg'

import arrow1 from './assets/arrow1.svg'
import arrow2 from './assets/arrow2.svg'

const Rewards = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Header />
      <div
        className={`${style.container} ${
          dark === 'true' ? 'darkTheme' : 'lightTheme'
        }`}
      >
        <div className={style.content}>
          <div className={style.sectionOne}>
            <div className={style.sOneContent}>
              <div className={style.oneLeft}>
                <h1>Earn rewards for every activity on NftyTrybe</h1>
                <p>
                  We love our community and we want to make sure we reward all
                  loyal users of the platform with periodic promos they can
                  participate in
                </p>
              </div>
              <div className={style.oneRight}>
                <motion.img
                  src={Shape1}
                  alt="earn rewards"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      x: 100,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      x: 0,
                      transition: {
                        //type: "spring",
                        delay: 0.5,
                        duration: 0.8,
                        x: {
                          delay: 0.5,
                          duration: 0.3,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className={style.sectionTwo}>
            <h1>Reward features</h1>
            <div className={style.sTwoContent}>
              <div className={style.twoLeft}>
                <motion.img
                  src={Shape2}
                  alt="staking"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.4,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      y: [30, 0, 30],
                      transition: {
                        //type: "spring",
                        y: {
                          repeat: Infinity,
                          duration: 2.7,
                          ease: 'linear',
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className={style.twoRight}>
                <h2>Staking</h2>
                <p>
                  Stake your <span> $AFEN</span> tokens to earn 15% Annual
                  percentage yield as well as up to 50%+ in trading fees{' '}
                </p>
                <div className={style.twoBtns}>
                  <button className={style.stake}>
                    Stake Afen
                    <img src={arrow1} alt="stake" />
                  </button>
                  <button className={style.buyAfen}>
                    Buy Afen
                    <img src={arrow2} alt="buy afen" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={style.sectionThree}>
            <div className={style.sThreeContent}>
              <div className={style.threeLeft}>
                <h2>Create,Buy, sell NFTs</h2>
                <p>
                  Stake your <span> $AFEN</span> tokens to earn 15% Annual
                  percentage yield as well as up to 50%+ in trading fees.{' '}
                </p>
                <button>
                  View current batch
                  <img src={arrow1} alt="view batch" />
                </button>
              </div>
              <div className={style.threeRight}>
                <motion.img
                  src={Shape3}
                  alt="shape3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.4,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      y: [-30, 0, -30],
                      transition: {
                        //type: "spring",
                        y: {
                          repeat: Infinity,
                          duration: 2.7,
                          ease: 'linear',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className={style.sectionFour}>
            <div className={style.sFourContent}>
              <div className={style.fourLeft}>
                <motion.img
                  src={Shape4}
                  alt="shape4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.4,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      y: [30, 0, 30],
                      transition: {
                        //type: "spring",
                        y: {
                          repeat: Infinity,
                          duration: 2.7,
                          ease: 'linear',
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className={style.fourRight}>
                <h2>Token burn</h2>
                <p>
                  We’ve adopted the looksrare model and added more rewards on
                  Nftytribe.
                </p>
                <button>
                  View contract
                  <img src={arrow1} alt="view batch" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rewards
