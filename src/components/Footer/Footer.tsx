import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
//import MailchimpSubscribe from 'react-mailchimp-subscribe'
import style from "./Footer.module.scss";
import Logo from "./assets/afen-logo.svg";
//import Logo from './assets/logo-light.svg'
import Facebook from "./assets/facebook.svg";
import IG from "./assets/Insta.svg";
import Mail from "./assets/mail.svg";
import Medium from "./assets/medium.svg";
import Twitter from "./assets/twitter.svg";
import TextInput from "./TextInput";
import Subscribe from "./Subscribe/Subscribe";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  const { t } = useTranslation();
  return (
    <div className={`${style.container}`}>
      <div className={style.content}>
        <div className={style.left}>
          {/* <div className={style.lbody}>
            <p>
              Subscribe to the newsletter to hear about Afen updates and events.
            </p>
            <TextInput
              type="email"
              inputName="email"
              labelName="Type in your email"
            />
            <br />
            <button className={style.sub}>Subscribe</button>
          </div> */}
          <Subscribe />
          <div className={style.lbottom}>
            <div className={style.logoBox}>
              <p>Powered by</p>
              <img src={Logo} alt="logo" />
            </div>
            <div className={style.lLinks}>
              <p>
                © Afen, Inc. All rights reserved | Terms & Conditions | Privacy
              </p>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.rightBody}>
            <div className={style.rightBlocks}>
              <h2>{t("general")}</h2>
              <Link to="/about#team">
                <p>{t("team")}</p>
              </Link>
             
              <a href=" https://t.co/Qg3utZwFEz">
                <p>Launch Pad</p>
              </a>
              {/* <Link to="/">
                <p>Careers</p>
              </Link> */}
            </div>
            {/* <div className={style.rightBlocks}>
              <h2>Technology</h2>
              <Link to="/">
                <p>BloomOne</p>
              </Link>
              <Link to="/">
                <p>MetaCitti</p>
              </Link>
              <Link to="/">
                <p>NFT Marketplace</p>
              </Link>
            </div> */}
            <div className={style.rightBlocks}>
              <h2>Community</h2>
              {/* <Link to="/">
                <p>Roadmap</p>
              </Link> */}
              
              {/* <Link to="/">
                <p>Blog</p>
              </Link> */} <div style={{margin:'12px 0 0 24px',}} className={style.rightBtm}>
            {/* <Link to="/">
              <img src={Facebook} alt="facebook" />
            </Link> */}
            <a href="https://instagram.com/nftytribe">
              <img src={IG} alt="instagram" />
            </a>
            {/* <Link to="/">
              <img src={Mail} alt="mail" />
            </Link>
            <Link to="/">
              <img src={Medium} alt="medium" />
            </Link> */}
            <a href="https://twitter.com/NftyTribe">
              <img src={Twitter} alt="twitter" />
            </a>
          </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
