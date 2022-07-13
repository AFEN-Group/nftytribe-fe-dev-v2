import { useEffect, useContext } from "react";
import { gsap, Expo } from "gsap";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

import style from "../About.module.scss";
import heroImg from "../assets/heroImg.png";
import arrow from "../assets/arrow1.svg";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;

  useEffect(() => {
    const heroTitle = document.getElementById("heroTitle");
    const heroText = document.getElementById("heroText");
    //const item = document.getElementById('item')
    const tl = gsap.timeline();
    tl.to(heroTitle, {
      y: 0,
      duration: 1.5,
      //stagger: 0.5,
      //ease: Power3.out,
      ease: Expo.easeInOut,
    });
    tl.to(heroText, {
      y: 0,
      duration: 1.5,
      delay: -1,
      //stagger: 0.5,
      //ease: Power3.out,
      ease: Expo.easeInOut,
    });
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`${style.heroContainer} ${
          dark === "true" ? "darkTheme" : "lightTheme"
        }`}>
        <div className={style.hero}>
          <div className={style.heroTopContent}>
            <div className={style.heroTopLeft}>
              <div className={style.leftContent}>
                {/* <div
                  className={`${style.leftTop} animate__animated animate__slideInDown`}
                >
                  <h2>Collect, sell & create</h2>
                </div> */}
                <h1>
                  <span id="heroTitle">{t("innovation for")}</span>{" "}
                </h1>
                {/* <h1>One of a kind NFTs</h1> */}
                <div className={style.leftBtm}>
                  <p>
                    <span id="heroText">{t("we intoduce")}</span>
                  </p>
                  <div
                    className={`${style.leftBtns} animate__animated animate__slideInUp`}
                    id="heroBtns">
                    <Link to="/collections">
                      <button>{t("import")}</button>
                    </Link>
                    <a href="https://awake-cornucopia-fbb.notion.site/Getting-Started-with-NftyTribe-924b743823994844868ad3164115c370">
                      <div className={style.readMore}>
                        <p>Read more</p>
                        <img src={arrow} alt="arrow" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.heroTopRight} id="item">
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
                        duration: 1,
                      },
                    },
                  },
                }}>
                <div className={style.heroImg}>
                  <img src={heroImg} alt="About us" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
