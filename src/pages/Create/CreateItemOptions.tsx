import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, Expo } from "gsap";
//import { ThemeContext } from '../../context/ThemeContext'
import style from "./Create.module.scss";
import Header from "../../components/Header/Header";
//import Flow from './assets/fl.png'
import Eth from "./assets/eth.svg";
import Polygon from "./assets/profile.svg";
import Binance from "./assets/binance.svg";
import Skale from "./assets/skale.svg";
import Solana from "./assets/sol.svg";
import Container from "../../components/Container/Container";
import { useTranslation } from "react-i18next";

const CreateItemOptions = () => {
  const [chain, setChain] = useState("");
  // const [themeState] = useContext<any>(ThemeContext)
  // const dark = themeState.dark
  useEffect(() => {
    window.scrollTo(0, 0);

    const heroTitle = document.getElementById("heroTitle");
    const heroTitle2 = document.getElementById("heroTitle2");
    const heroText = document.getElementById("heroText");
    const tl = gsap.timeline();
    tl.to(heroTitle, {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
    tl.to(heroText, {
      y: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
    tl.to(heroTitle2, {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
  }, []);
  console.log(chain);
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Container>
        <div className={style.createOptions}>
          {chain === "" ? (
            <div className={style.cOptContent1}>
              <div className={style.cOptTop}>
                <h1>
                  <span id="heroTitle">{t("Choose Blockchain")}</span>{" "}
                </h1>
                <p>
                  <span id="heroText">{t("Select the most")}</span>{" "}
                </p>
              </div>
              <div
                className={`${style.cOptBody} animate__animated animate__fadeInUp animate__delay-1s`}>
                <div className={style.optBoxes}>
                  <div className={style.optBox} onClick={() => setChain("eth")}>
                    <img src={Eth} alt="eth" />
                    <p>Ethereum</p>
                  </div>
                  <div
                    className={`${style.optBox} ${style.disable}`}
                    onClick={() => setChain("binance")}>
                    <img src={Binance} alt="binance" />
                    <p>Binance</p>
                  </div>
                  <div
                    className={`${style.optBox} ${style.disable}`}
                    onClick={() => setChain("")}>
                    <img src={Skale} alt="skale" />
                    <p>Skale</p>
                  </div>

                  <div
                    className={`${style.optBox} ${style.disable}`}
                    onClick={() => setChain("")}>
                    <img src={Solana} alt="sol" />
                    <p className={style.mg1}>Solana</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              //className={style.cOptContent2}
              className={`${style.cOptContent2} animate__animated animate__fadeIn `}>
              <div className={style.cOptTop2}>
                <h1>
                  <span id="heroTitle">{t("Choose Collectible")}</span>{" "}
                </h1>
                <p>
                  <span>{t("Select")}</span>{" "}
                </p>
              </div>
              <div
                className={`${style.cOptBody} animate__animated animate__fadeInUp animate__delay-1s`}>
                <div className={style.optBoxes2}>
                  <Link
                    to={`/createItem/${chain}/single`}
                    className={style.optBox2}>
                    <img className={style.tImg} src={Polygon} alt="single" />
                    <p>{t("Single")}</p>
                  </Link>
                  <Link
                    to={`/createItem/${chain}/multiple`}
                    className={`${style.optBox2} ${style.disable}`}>
                    <img className={style.tImg} src={Polygon} alt="single" />
                    <p>{t("Multiple")}</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default CreateItemOptions;
