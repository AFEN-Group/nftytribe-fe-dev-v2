import { useContext } from 'react'
import style from '../About.module.scss'
import Up from '../assets/up.svg'
import Home from '../assets/home.svg'
import Pie from '../assets/pie.svg'
import { ThemeContext } from '../../../context/ThemeContext'

const Info = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={`${style.faq} ${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
    >
      <div className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>Much more than a marketplace</h1>
          <p>
            The potential for NFTs in reshaping our world is boundless and
            growing with every innovation. To fully maximize this potential, we
            at NftyTribe, are determined to put the user first in exploring the
            technology around NFTs.
          </p>
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
                <h2>User centered</h2>
                <p>
                  To fully maximize this potential, we at NftyTribe, are
                  determined to put the user first in exploring the technology
                  around NFTs.
                </p>
              </div>
              <a
                href='https://awake-cornucopia-fbb.notion.site/Getting-Started-with-NftyTribe-924b743823994844868ad3164115c370'>
                <button className={dark === 'true' ? 'yellowBtn' : 'blueBtn'}>Learn more</button>
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
                <h2>Authentication</h2>
                <p>
                  ERC-721 and ERC-1155 open-source token standards are
                  integrated into products to create the best experiences.
                </p>
              </div>
              <a href='https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502'>
                <button className={dark === 'true' ? 'yellowBtn' : 'blueBtn'}>Learn more</button></a>
            </div>
            <div
              className={`${style.faqBox} ${dark === 'true' ? 'darkGradient' : 'lightGradient'
                }`}
            >
              <div className={style.faqImg}>
                <img src={Pie} alt="pie" />
              </div>
              <div className={style.faqText}>
                <h2>Juicy features</h2>
                <p>
                  We have also provided for the exchange of digital twins,
                  physical items represented as NFTs, in a process that will
                  continue to evolve.
                </p>
              </div>
              <a href='https://awake-cornucopia-fbb.notion.site/NftyTribe-FAQs-and-User-guides-06062b612e2d41649c95c9b2baff7502'>
                <button className={dark === 'true' ? 'yellowBtn' : 'blueBtn'}>Learn more</button></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
