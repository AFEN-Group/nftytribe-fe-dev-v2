import style from '../Home.module.scss'
import Up from '../assets/up.svg'
import Home from '../assets/home.svg'
import Pie from '../assets/pie.svg'

const FAQs = () => {
  return (
    <div className={style.faq}>
      <div className={style.faqContent}>
        <div className={style.faqTop}>
          <h1>Why NftyTrybe?</h1>
        </div>
        <div className={style.faqBody}>
          <div className={style.faqBoxes}>
            <div className={style.faqBox}>
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
            <div className={style.faqBoxC}>
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
            <div className={style.faqBox}>
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
