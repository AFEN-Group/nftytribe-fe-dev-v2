import { useContext } from "react";
import style from "../Home.module.scss";
import Up from "../assets/up.svg";
import Home from "../assets/home.svg";
import Pie from "../assets/pie.svg";
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const FAQs = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const { t } = useTranslation();
  const dark = themeState.dark;
  return (
    <div
      className={`${style.faq} ${
        dark === "true" ? "darkTheme" : "lightTheme"
      }`}>
      <div data-aos="fade-up" className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>{t("faq")}(FAQs)</h1>
        </div>
        <div className={style.faqBody}>
          <div className={style.faqBoxes}>
            <div
              className={`${style.faqBox} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <a href="https://awake-cornucopia-fbb.notion.site/Getting-Started-with-NftyTribe-924b743823994844868ad3164115c370">

              <div className={style.faqImg}>
                <img src={Up} alt="up" />
              </div>
              <div className={style.faqText}>
                <h2>{t("getting-started")}</h2>
                <p>{t("account creating")}</p>
              </div>
              
              </a>
            </div>
            <div
              className={`${style.faqBoxC} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <a href="https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502">

              <div className={style.faqImg}>
                <img src={Home} alt="home" />
              </div>
              <div className={style.faqText}>
                <h2>{t("buying-nft")}</h2>
                <p>{t("get help navigating")}</p>
              </div>
               
              </a>
            </div>
            <div
              className={`${style.faqBox} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
              <a href="https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502">

              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>{t("selling-nft")}</h2>
                <p>{t("Everything you need")}</p>
              </div>
              
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
