import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
// import Footer from '../../components/Footer/Footer'
import style from "./Rewards.module.scss";
//import Shape1 from './assets/shape01.svg'
import Shape1 from "./assets/gift.svg";
import Gift from "./assets/gift2.svg";
import Shape2 from "./assets/shape2.svg";
import Shape3 from "./assets/shape3.svg";
import Shape4 from "./assets/shape4.svg";

import arrow1 from "./assets/arrow1.svg";
import arrow2 from "./assets/arrow2.svg";
import { useTranslation } from "react-i18next";

const Rewards = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const currentAccount = localStorage.getItem('currentAccount')
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const handleStake = () => {
    if (currentAccount) {
      navigate('/staking')
    }
  }
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div
        className={`${style.container} ${dark === "true" ? "darkTheme" : "lightTheme"
          }`}>
        <div className={style.content}>
          <div
            className={`
          ${style.sectionOne} 
          ${dark === "true" ? style.darkBx : style.lightBx}
          ${dark === "true" ? "lightTxt" : "darkTxt"}
          `}>
            <div className={style.sOneContent}>
              <div className={style.oneLeft}>
                <h1>{t("Earn rewards for every activity on NftyTribe")}</h1>
                <p>{t("We love")}</p>
              </div>
              <div className={style.oneRight}>
                <motion.img
                  className={style.imgW}
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
                <img className={style.imgM} src={Gift} alt="gift" />
              </div>
            </div>
          </div>

          <div className={`${style.sectionTwo}`}>
            <h1>{t("Reward features")}</h1>
            <div
              className={`
            ${style.sTwoContent}
            ${dark === "true" ? style.darkBx : style.lightBx}
            ${dark === "true" ? "lightTxt" : "darkTxt"}`}>
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
                          ease: "linear",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className={style.twoRight}>
                <h2>{t("Staking")}</h2>
                <p>{t("Stake your")}</p>
                <div className={style.twoBtns}>
                  {/* <a href="https://pancakeswap.finance/swap"> */}
                  {/* <Link to="/staking"> */}
                  <button
                    id="stake"
                    onClick={handleStake}
                    className={`${style.stake} ${dark === 'true' ? 'yellowBtn' : 'blueBtn'}`}>
                    Stake Afen
                    <img src={dark === "true" ? arrow1 : arrow2} alt="buy afen" />
                  </button>
                  {/* </Link> */}
                  {/* </a> */}
                  <button className={`
                  ${style.buyAfen}
                  ${dark === 'true' ? 'lightTxt' : 'darkTxt'}
                  ${dark === 'true' ? 'lightBorder' : 'darkBorder'}
                  disable_link`}
                  >
                    Stake NFTs
                    <img src={dark === "true" ? arrow2 : arrow1} alt="stake" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${style.sectionThree}
          ${dark === "true" ? style.darkBx : style.lightBx}
          ${dark === "true" ? "lightTxt" : "darkTxt"}`}>
            <div className={style.sThreeContent}>
              <div className={style.threeLeft}>
                <h2>{t("Mint,Buy, sell and earn")}</h2>
                <p>
                  {/* Stake your <span> $AFEN</span> tokens to earn 15% Annual
                  percentage yield as well as up to 50%+ in trading fees.{' '} */}
                  {t("Earn 15")}
                </p>
                <Link to="/explore">
                  <button
                    //className={`${dark === 'true' ? 'yellowBtn' : 'blueBtn'}}`}>
                    className={`${style.stake} ${dark === 'true' ? 'yellowBtn' : 'blueBtn'}`}>
                    Start Trading
                    <img src={dark === "true" ? arrow1 : arrow2} alt="view batch" />
                  </button>
                </Link>
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
                          ease: "linear",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div
            //className={style.sectionFour}
            className={`${style.sectionFour}
          ${dark === "true" ? style.darkBx : style.lightBx}
          ${dark === "true" ? "lightTxt" : "darkTxt"}`}>
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
                          ease: "linear",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className={style.fourRight}>
                <h2>{t("Periodic token burns")}</h2>
                <p>{t("five percent")}</p>
                <button
                  //className={`${dark === 'true' ? 'yellowBtn' : 'blueBtn'}}`}>
                  className={`${style.stake} ${dark === "true" ? "yellowBtn" : "blueBtn"
                    }`}>
                  {t("View Contract")}
                  <img
                    src={dark === "true" ? arrow1 : arrow2}
                    alt="view batch"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewards;
