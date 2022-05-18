import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './ExploreSingle.module.scss'
import Back from './assets/arrow.svg'
import ItemImg from './assets/item.svg'
import Header from '../../../components/Header/Header'
import Share from './assets/share.svg'
import Dots from './assets/dots.svg'
import User from './assets/user.svg'
import Eye from './assets/eye.svg'
import Container from '../../../components/Container/Container'

const ExploreSingle = () => {
  const navigate = useNavigate()
  //const [priceType, setPriceType] = useState('auction')
  const [tab, setTab] = useState('art')
  return (
    <>
      <Header />
      <Container>
        <div
          className={`${style.container} animate__animated animate__fadeInLeft`}
        >
          <div className={style.content}>
            <div className={style.top}>
              <div className={style.backBx} onClick={() => navigate(-1)}>
                <img src={Back} alt="back" />
                <p>Back</p>
              </div>
              <div className={style.titleBx}>
                <h2>The game avatar</h2>
                <p>from the 3000 avatar collection.</p>
              </div>
            </div>
            <div className={style.body}>
              <div className={style.left}>
                <div className={style.itemImg}>
                  <img src={ItemImg} alt="itemImg" />
                </div>
              </div>
              <div className={style.right}>
                <div className={style.rightTop}>
                  <div className={style.rightNav}>
                    <div
                      className={
                        tab === 'art' ? style.navItemActive : style.navItem
                      }
                      onClick={() => setTab('art')}
                    >
                      <p>The Art</p>
                    </div>
                    <div
                      className={
                        tab === 'activity' ? style.navItemActive : style.navItem
                      }
                      onClick={() => setTab('activity')}
                    >
                      <p>The Activity</p>
                    </div>
                    <div
                      className={
                        tab === 'offers' ? style.navItemActive : style.navItem
                      }
                      onClick={() => setTab('offers')}
                    >
                      <p>Offers</p>
                    </div>
                  </div>
                  <div className={style.rightIcons}>
                    <img src={Share} alt="share" />
                    <img src={Dots} alt="dots" />
                  </div>
                </div>
                <div className={style.rightTitles}>
                  <div className={style.userBx}>
                    <img src={User} alt="user" />
                    <p>Michael Carson</p>
                  </div>
                  <div className={style.bronze}>
                    <p>||| Benin Broxnze</p>
                  </div>
                  <div className={style.eyes}>
                    <img src={Eye} alt="seen" />
                    <p>1215</p>
                  </div>
                </div>
                {tab === 'art' && (
                  <div
                    className={`${style.info} animate__animated animate__fadeIn`}
                  >
                    <div className={style.description}>
                      <h2>Description</h2>
                      <p>
                        This is a one in a kind bot, yours truly Afen bot
                        special NFT. Blockchain has the potential to adequately
                        transform African society. Offering insurmountable
                        opportunities to those leveraging it to build a new
                        structure in diverse sectors.{' '}
                      </p>
                    </div>
                    <div className={style.prices}>
                      <div className={style.bidPrices}>
                        <div className={style.bids}>
                          <div className={style.bidBx}>
                            <div className={style.bidBlue}>Current bid</div>
                            <p>2800 BNB</p>
                          </div>
                          <div className={style.bidBx2}>
                            <div className={style.bidBlue}>Highest bid</div>
                            <p>2800 BNB</p>
                          </div>
                        </div>
                        <div className={style.time}>
                          <p>2d 13h 23m 19s</p>
                        </div>
                      </div>
                      {/* <div className={style.fixedPrices}>
                    <div className={style.priceGreen}>Fixed sale</div>
                    <p>2800 BNB</p>
                  </div> */}
                    </div>
                    <div className={style.Btns}>
                      <button className={style.regBtn}>Buy</button>
                      <button className={style.gradBtn}>Bid</button>
                    </div>
                  </div>
                )}
                {tab === 'activity' && <div className={style.activity}></div>}
                {tab === 'offers' && (
                  <div
                    className={`${style.offers} animate__animated animate__fadeIn`}
                  >
                    <div className={style.offersContent}>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                      <div className={style.offer}>
                        <div className={style.offerUser}>
                          <img src={User} alt="user" />
                          <p>Michael Carson</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0x120999...</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>0.07BNB</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>01/07/21</p>
                        </div>
                        <div className={style.offerAddr}>
                          <p>12:33:08</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ExploreSingle
