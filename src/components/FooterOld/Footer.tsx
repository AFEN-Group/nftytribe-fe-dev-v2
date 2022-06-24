import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import style from './Footer.module.scss'
import Logo from './assets/afen-logo.svg'
import Facebook from './assets/facebook.svg'
import IG from './assets/Insta.svg'
import Mail from './assets/mail.svg'
import Medium from './assets/medium.svg'
import Twitter from './assets/twitter.svg'
import TextInput from './TextInput'

const Footer = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={`${style.container} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
        }`}
    >
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.lbody}>
            <p>
              Subscribe to the newsletter to hear about Nftytribe updates and events.
            </p>
            <TextInput
              type="email"
              inputName="email"
              labelName="Type in your email"
            />
            <br />
            <button className={style.sub}>Subscribe</button>
          </div>
          <div className={style.lbottom}>
            <div className={style.logoBox}>
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
              <h2>General</h2>
              <Link to="/">
                <p>Team</p>
              </Link>
              <Link to="/faq">
                <p>FAQ</p>
              </Link>
              <Link to="/">
                <p>Support</p>
              </Link>
              <Link to="/">
                <p>Careers</p>
              </Link>
            </div>
            <div className={style.rightBlocks}>
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
            </div>
            <div className={style.rightBlocks}>
              <h2>Community</h2>
              <Link to="/">
                <p>Roadmap</p>
              </Link>
              <Link to="/">
                <p>Whitepaper</p>
              </Link>
              <Link to="/">
                <p>Blog</p>
              </Link>
            </div>
          </div>
          <div className={style.rightBtm}>
            <Link to="/">
              <img src={Facebook} alt="facebook" />
            </Link>
            <Link to="/">
              <img src={IG} alt="instagram" />
            </Link>
            <Link to="/">
              <img src={Mail} alt="mail" />
            </Link>
            <Link to="/">
              <img src={Medium} alt="medium" />
            </Link>
            <Link to="/">
              <img src={Twitter} alt="twitter" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
