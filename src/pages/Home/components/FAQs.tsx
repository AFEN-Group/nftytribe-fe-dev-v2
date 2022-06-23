import { useContext } from 'react'
import style from '../Home.module.scss'
import Up from '../assets/up.svg'
import Home from '../assets/home.svg'
import Pie from '../assets/pie.svg'
import { ThemeContext } from '../../../context/ThemeContext'

const FAQs = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={`${style.faq} ${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
    >
      <div data-aos="fade-up" className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>Frequently Asked Questions(FAQs)</h1>
        </div>
        <div className={style.faqBody}>
          <div className={style.faqBoxes}>
            <div
              className={`${style.faqBox} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                }`}
            >
              <div className={style.faqImg}>
                <img src={Up} alt="up" />
              </div>
              <div className={style.faqText}>
                <h2>Getting Started with
                  NftyTribe</h2>
                <p>
                  Account creation, wallet connection , and everything else you need to get started on NftyTribe.
                </p>
              </div>
              <a
                href='https://awake-cornucopia-fbb.notion.site/Getting-Started-with-NftyTribe-924b743823994844868ad3164115c370'>
                <button className={
                  dark === 'true'
                    ? style.fBtn_dark
                    : style.fBtn_light
                }>Learn more</button>
              </a>
            </div>
            <div
              className={`${style.faqBoxC} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                }`}
            >
              <div className={style.faqImg}>
                <img src={Home} alt="home" />
              </div>
              <div className={style.faqText}>
                <h2>Buying NFTs on NftyTribe</h2>
                <p>
                  Get help with navigating the marketplace and buying or storing your NFTs.
                </p>
              </div>
              <a href='https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502'>
                <button className={
                  dark === 'true'
                    ? style.fBtn_dark
                    : style.fBtn_light
                }>Learn more</button>
              </a>
            </div>
            <div
              className={`${style.faqBox} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                }`}
            >
              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>Selling NFTs on NftyTribe</h2>
                <p>
                  Everything you need to know to start creating and listing your NFTs on NftyTribe.
                </p>
              </div>
              <a href='https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502'>
                <button className={
                  dark === 'true'
                    ? style.fBtn_dark
                    : style.fBtn_light
                }>Learn more</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQs
