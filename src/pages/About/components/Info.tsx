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
              <div className={style.faqImg}>
                <img src={Up} alt="up" />
              </div>
              <div className={style.faqText}>
                <h2>{t("user centered")}</h2>
                <p>{t("to fully maximise")}</p>
              </div>
              <a href="https://awake-cornucopia-fbb.notion.site/Getting-Started-with-NftyTribe-924b743823994844868ad3164115c370">
                <button className={dark === "true" ? "yellowBtn" : "blueBtn"}>
                  Learn more
                </button>
              </a>
            </div>
            <div
              className={`${style.faqBoxC} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <div className={style.faqImg}>
                <img src={Home} alt="home" />
              </div>
              <div className={style.faqText}>
                <h2>{t("authentication")}</h2>
                <p>{t("ERC-721 and ERC-1155 open-source")}</p>
              </div>
              <a href="https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502">
                <button className={dark === "true" ? "yellowBtn" : "blueBtn"}>
                  Learn more
                </button>
              </a>
            </div>
            <div
              className={`${style.faqBox} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>{t("juicy features")}</h2>
                <p>{t("We have also provided")}</p>
              </div>
              <a href="https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502">
                <button className={dark === "true" ? "yellowBtn" : "blueBtn"}>
                  Learn more
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
