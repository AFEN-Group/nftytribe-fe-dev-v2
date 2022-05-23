import { useContext } from 'react'
import style from '../LP.module.scss'
import Up from '../assets/up.svg'
import Home from '../assets/home.svg'
import Pie from '../assets/pie.svg'
import { ThemeContext } from '../../../context/ThemeContext'

const Offer = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={`${style.faq} ${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
    >
      <div className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>What we offer</h1>
          {/* <p>
            The potential for NFTs in reshaping our world is boundless and
            growing with every innovation. To fully maximize this potential, we
            at NftyTribe, are determined to put the user first in exploring the
            technology around NFTs.
          </p> */}
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
                <h2>General earning</h2>
                <p>
                  On NftyTribe, everyone earns; both creator and collector get
                  to share from our trading fees distributed in stable tokens!
                  Sweet!
                </p>
              </div>
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
                <h2>Physical items</h2>
                <p>
                  Got a physical item tied to your NFT? ( either a digital twin
                  or a souvenir). You can send and receive real life items
                  easily on NftyTribe.
                </p>
              </div>
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
                <h2>Lazy minting</h2>
                <p>
                  No funds? No problem! Don’t stop creating. Leverage
                  NftyTribe’s lazy minting feature. Mint now, pay later!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offer
