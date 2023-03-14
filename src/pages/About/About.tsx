import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
// import Header from "../../components/Header/Header";
import Hero from "./components/Hero";
import style from "./About.module.scss";
// import vidImg from "";
import Info from "./components/Info";
import Container from "../../components/Container/Container";
import ContainerG from "../../components/Container/ContainerG";
import Team from "./components/Team";
//
// import logo1 from './assets/logo1.svg'
// import logo2 from './assets/logo2.svg'
// import logo3 from './assets/logo3.svg'
// import logo4 from './assets/logo4.svg'
// import logo5 from './assets/logo5.svg'
import logo1 from "./logos/chainlogo.svg";
import logo2d from "./logos/logo2-d.png";
import logo2w from "./logos/logo2-w.png";
import logo3 from "./logos/logo3.png";
import logo4d from "./logos/Biance PAY LOGO .png";
import logo4w from "./logos/binance 02.png";
import logo5 from "./logos/nirvlogo.svg";
import logo6 from "./logos/pllogo.svg";
import meta from "./logos/Full text Logo Yellow II.png";
import meta1 from "./logos/Full text logo YellowI.png";
import { useTranslation } from "react-i18next";

const About = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <Container>
        <div className={style.sectionTwo}>
          <h1>
            {t("welcome to the")}{" "}
            <span className={dark === "true" ? "yellowTxt" : "blueTxt"}>
              {/* {t("tribe")} */}Tribe!
            </span>{" "}
          </h1>
          <div className={style.sTwoVid}>
            <video width="500px" height="500px" autoPlay >
            <source src={require("../../assets/svgs/vid.mp4")} type="video/mp4" /></video>
            {/* <video src="https://drive.google.com/file/d/1nMkC8FbQAm1A_zhhoKIzdpN67RfLrCrs/view?usp=share_link"/> */}
            {/* <img src={vidImg} alt="vid" /> */}
          </div>
        </div>

        <Info />
        <div className={style.sectionFour}>
          <h1>{t("Our partners")}</h1>
          <div className={style.angels}>
            <div className={style.angel}>
              <img src={logo1} alt="logo1" id="logo1" />
            </div>
            <div className={style.angel}>
              <img src={dark === "true" ? logo2w : logo2d} alt="logo2" />
            </div>
            <div className={style.angel}>
              <img src={logo3} alt="logo3" />
            </div>
            <div className={style.angel}>
              <img src={dark === "true" ? logo4w : logo4d} alt="logo1" />
            </div>

            <div className={style.angel}>
              <img src={logo6} alt="logo1" />
            </div>
            <div className={style.angel}>
              <img src={dark === "true" ? meta : meta1} alt="logo5" id="logo5" />
            </div>
          </div>
        </div>
      </Container>
      <ContainerG>
        <Team />
      </ContainerG>
    </>
  );
};

export default About;
