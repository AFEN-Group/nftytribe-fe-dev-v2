import { useContext } from "react";
import { Link } from "react-router-dom";
import style from "../Home.module.scss";
import nArrow from "../assets/arrow-right.svg";
import { ThemeContext } from "../../../context/ThemeContext";
import photo from "./assets/p2.png";
import collect from "./assets/collect.svg";
import african from "./assets/african.svg";
import { useTranslation } from "react-i18next";

const Marketplace = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  const { t } = useTranslation();
  return (
    <>
      <div
        //className={style.mk}

        className={`${style.mk} ${
          dark === "true" ? "darkTheme" : "lightTheme"
        } `}>
        <div data-aos="fade-up" className={style.mkContent}>
          <div className={style.mkLeft}>
            <div className={style.mkLeftContent}>
              <h1>{t("nftytribe-categories")}</h1>
              <p>{t("browse-nft")} </p>

              <Link to="/explore" className={`${style.mkBtn} ${style.forW}`}>
                <p>{t("explore-marketplace")}</p>
                <img src={nArrow} alt="more" />
              </Link>
            </div>
          </div>
          <div className={style.mkRight}>
            <div className={style.mkBlock1}>
              <Link to="/explore">
                <div className={`${style.mkimgBx} ${style.forW}`}>
                  <div className={style.mkimg1}></div>
                  <p>Photography</p>
                </div>
                <div className={`${style.mkimgBx} ${style.forM}`}>
                  <img src={photo} alt="Photography" />
                </div>
              </Link>
              <Link to="/explore">
                <div className={`${style.mkimgBx} ${style.forW}`}>
                  <div className={style.mkimg2}></div>
                  <p>Collectibles</p>
                </div>
                <div className={`${style.mkimgBx} ${style.forM}`}>
                  <img src={collect} alt="Collectibles" />
                </div>
              </Link>
            </div>

            <div className={style.mkBlock2}>
              <Link to="/explore">
                <div className={`${style.mkimgBx} ${style.forW}`}>
                  <div className={style.mkimg3}></div>
                  <p>African Art</p>
                </div>
                <div className={`${style.mkimgBx} ${style.forM}`}>
                  <img src={african} alt="African Art" />
                </div>
              </Link>
            </div>
          </div>
          <Link to="/explore" className={`${style.mkBtn} ${style.forM}`}>
            <p>{t("explore-marketplace")}</p>
            <img src={nArrow} alt="more" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
