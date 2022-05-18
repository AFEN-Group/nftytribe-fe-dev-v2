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
      <div className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>Why NftyTrybe?</h1>
        </div>
        <div className={style.faqBody}>
          <div className={style.faqBoxes}>
            <div
              className={`${style.faqBox} ${
                dark === 'true' ? 'darkGradient' : 'lightGradient'
              }`}
            >
              <div className={style.faqImg}>
                <img src={Up} alt="up" />
              </div>
              <div className={style.faqText}>
                <h2>What is NftyTribe?</h2>
                <p>
                  Stake $AFEN and earn 100% of Nftytribe trading fees daily.
                  Also Earn $AFEN when you Create, buy, and sell an NFT on
                  Nftytribe.
                </p>
              </div>
              <button>Learn more</button>
            </div>
            <div
              className={`${style.faqBoxC} ${
                dark === 'true' ? 'darkGradient' : 'lightGradient'
              }`}
            >
              <div className={style.faqImg}>
                <img src={Home} alt="home" />
              </div>
              <div className={style.faqText}>
                <h2>How can I get started?</h2>
                <p>
                  Stake $AFEN and earn 100% of Nftytribe trading fees daily.
                  Also Earn $AFEN when you Create, buy, and sell an NFT on
                  Nftytribe.
                </p>
              </div>
              <button>Learn more</button>
            </div>
            <div
              className={`${style.faqBox} ${
                dark === 'true' ? 'darkGradient' : 'lightGradient'
              }`}
            >
              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>Wanna learn more?</h2>
                <p>
                  Stake $AFEN and earn 100% of Nftytribe trading fees daily.
                  Also Earn $AFEN when you Create, buy, and sell an NFT on
                  Nftytribe.
                </p>
              </div>
              <button>Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQs
