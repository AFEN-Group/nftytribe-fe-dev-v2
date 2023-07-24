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
          

              <div className={style.faqImg}>
                <img src={Up} alt="up" />
              </div>
              <div className={style.faqText}>
                <h2>
                  {/* {t("getting-started")} */}
                    How can I buy or sell NFTs on NftyTribe?

                  </h2>
                <p>
                  Connect your wallet and update your NftyTribe profile to get started.
                </p>
              </div>
              
          
            </div>
            <div
              className={`${style.faqBoxC} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
          

              <div className={style.faqImg}>
                <img src={Home} alt="home" />
              </div>
              <div className={style.faqText}>
                <h2>
                    What are the fees for using NftyTribe?
                  {/* {t("buying-nft")} */}
                  </h2>
                <p>
                  Minting or listing an NFT on NftyTribe incurs a $2.5 charge, with an additional 2% selling fee when an NFT is sold.
                  </p>
              </div>
               
             
            </div>
            <div
              className={`${style.faqBox} ${
                dark === "true" ? "darkGradient" : "lightGradient"
              }`}>
            

              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>
                    How does lazy minting work on NftyTribe?

                 
                  </h2>
                <p>
                  Lazy minting on NftyTribe allows users to create NFTs for free. Fees are deducted only when NFT is sold.
                </p>
              </div> 
              
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
