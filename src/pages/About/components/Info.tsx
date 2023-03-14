import { useContext } from "react";
import style from "../About.module.scss";
import Up from "../assets/up.svg";
import Home from "../assets/home.svg";
import Pie from "../assets/pie.svg";
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Info = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  const { t } = useTranslation();
  return (
    <div
      className={`${style.faq} ${
        dark === "true" ? "darkTheme" : "lightTheme"
      }`}>
      <div className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>{t("much more")}</h1>
          <p>{t("The potential")}</p>
        </div>
        <div className={style.faqBody}>
          <div className={style.faqBoxes}>
            <div
              className={`${style.faqBox} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <div >

              <div className={style.faqImg}>
                <img src={Up} alt="up" />
              </div>
              <div className={style.faqText}>
                <h2>{t("user centered")}</h2>
                <p>{t("to fully maximise")}</p>
              </div>
               
              </div>
            </div>
            <div
              className={`${style.faqBoxC} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <div >

              <div className={style.faqImg}>
                <img src={Home} alt="home" />
              </div>
              <div className={style.faqText}>
                <h2>{t("authentication")}</h2>
                <p>{t("ERC-721 and ERC-1155 open-source")}</p>
              </div>
                {/* <button className={dark === "true" ? "yellowBtn" : "blueBtn"}>
                  Learn more
                </button> */}
              </div>
            </div>
            <div
              className={`${style.faqBox} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <div >

              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>{t("juicy features")}</h2>
                <p>{t("We have also provided")}</p>
              </div>
                {/* <button className={dark === "true" ? "yellowBtn" : "blueBtn"}>
                  Learn more
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
