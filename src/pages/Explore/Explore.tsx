import { useEffect, useState } from 'react'
import { gsap, Expo } from 'gsap'

import Header from '../../components/Header/Header'
import style from './Explore.module.scss'
import Filter from './assets/Filter.svg'
import Arrow1 from './assets/arrowdown.svg'
import ItemCard from '../../components/Card/ItemCard'
//import Arrow2 from './assets/arrowright.svg'

const Explore = () => {
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
  const [tab, setTab] = useState('all')
  return (
    <>
      <Header />
      <div className={style.explore}>
        <div className={style.exploreContent}>
          <div className={style.exploreTop}>
            <h1>
              <span id="heroTitle">Explore collections</span>{' '}
            </h1>
            <p>
              <span id="heroText">Based on categories</span>{' '}
            </p>
            <div
              //className={style.exploreCats}
              className={`${style.exploreCats} animate__animated animate__fadeInUp animate__delay-1s`}
            >
              <div
                className={
                  tab === 'all' ? style.exploreCatActive : style.exploreCat
                }
                onClick={(e) => setTab('all')}
              >
                <p>All</p>
              </div>
              <div
                className={
                  tab === 'art' ? style.exploreCatActive : style.exploreCat
                }
                onClick={(e) => setTab('art')}
              >
                <p>Art</p>
              </div>
              <div
                className={
                  tab === 'gaming' ? style.exploreCatActive : style.exploreCat
                }
                onClick={(e) => setTab('gaming')}
              >
                <p>Gaming</p>
              </div>
              <div
                className={
                  tab === 'collectibles'
                    ? style.exploreCatActive
                    : style.exploreCat
                }
                onClick={(e) => setTab('collectibles')}
              >
                <p>Collectibles</p>
              </div>
              <div
                className={
                  tab === 'utility' ? style.exploreCatActive : style.exploreCat
                }
                onClick={(e) => setTab('utility')}
              >
                <p>Utility</p>
              </div>
            </div>
          </div>
          <div
            //className={style.body}
            className={`${style.body} animate__animated animate__fadeInUp animate__delay-2s`}
          >
            <div className={style.sideBar} id="sidebar">
              <div className={style.sideBarContent}>
                <div className={style.sBItemA}>
                  <img src={Filter} alt="filter" />
                  <p>
                    <strong>Filters</strong>
                  </p>
                </div>
                <div className={style.sBItem}>
                  <p>Price range</p>
                  <img src={Arrow1} alt="filter" />
                </div>
                <div className={style.sBItem}>
                  <p>Sale type</p>
                  <img src={Arrow1} alt="filter" />
                </div>
                <div className={style.sBItem}>
                  <p>Blockchain</p>
                  <img src={Arrow1} alt="filter" />
                </div>
                <div className={style.sBItem}>
                  <p>Recently added</p>
                  <img src={Arrow1} alt="filter" />
                </div>
                <div className={style.sBItem}>
                  <p>Collection</p>
                  <img src={Arrow1} alt="filter" />
                </div>
                <div className={style.sBItem}>
                  <p>Price ascending</p>
                  <img src={Arrow1} alt="filter" />
                </div>
                <div className={style.sBItem}>
                  <p>Price descending</p>
                  <img src={Arrow1} alt="filter" />
                </div>
              </div>
            </div>
            <div className={style.itemsContainer}>
              <div className={style.itemsContent}>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
                <div className={style.itemBx}>
                  <ItemCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  )
}

export default Explore
