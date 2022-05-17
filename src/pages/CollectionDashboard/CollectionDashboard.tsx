import { useEffect } from 'react'
import { gsap, Expo } from 'gsap'
import Header from '../../components/Header/Header'
import style from './CollectionDashboard.module.scss'
import arrowA from './assets/arrow.svg'
//import arrow1 from './assets/arrow0.svg'
import arrow2 from './assets/arrowgr.svg'
import arrow3 from './assets/arrowred.svg'
import user from './assets/user.svg'
//import nArrow from './assets/arrow-right.svg'

const CollectionDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const heroTitle = document.getElementById('heroTitle')
    const heroText = document.getElementById('heroText')
    const tl = gsap.timeline()
    tl.to(heroTitle, {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
    tl.to(heroText, {
      y: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    })
  }, [])

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.top}>
            <h1>
              <span id="heroTitle">Collection statistics</span>{' '}
            </h1>
            <p>
              <span id="heroText">
                Top Nfts are ranked according to Volume, floor price and owners
              </span>
            </p>
          </div>
          <div
            className={`${style.filters} animate__animated animate__fadeInUp animate__delay-1s`}
          >
            <div className={style.filter}>
              <p>Categories</p>
              <img src={arrowA} alt="categories" />
            </div>
            <div className={style.filter}>
              <p>Chains</p>
              <img src={arrowA} alt="categories" />
            </div>
            <div className={style.filter}>
              <p>24 hours</p>
              <img src={arrowA} alt="categories" />
            </div>
          </div>
          <div
            className={`${style.topProTable} animate__animated animate__fadeInUp animate__delay-2s`}
          >
            <div className={style.tpTableTitles}>
              <p>Collection</p>
              <div>
                <p>Volume</p>
              </div>
              <div>
                <p>24hr %</p>
              </div>
              <div>
                <p>7d %</p>
              </div>
              <div>
                <p>Floor price</p>
              </div>
              <div>
                <p>Owners</p>
              </div>
              <div>
                <p>Items</p>
              </div>
            </div>
            <div className={style.tpTableItems}>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>1</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  <img src={arrow2} alt="arrow-up" />
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>2</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  <img src={arrow3} alt="arrow-down" />
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>3</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  {/* <img src={arrow3} alt="arrow-down" /> */}
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>4</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  {/* <img src={arrow3} alt="arrow-down" /> */}
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>5</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  {/* <img src={arrow3} alt="arrow-down" /> */}
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div>
              <div className={style.line1}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionDashboard
