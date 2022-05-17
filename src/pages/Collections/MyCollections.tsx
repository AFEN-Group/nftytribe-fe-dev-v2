import { useEffect, useState } from 'react'
import { gsap, Expo } from 'gsap'
import Header from '../../components/Header/Header'
import style from './Collections.module.scss'
import Import from './Import'

const MyCollections = () => {
  const [showImport, setShowImport] = useState(false)
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

  const closeImport = () => {
    setShowImport(false)
  }
  return (
    <>
      <Header />
      {showImport && <Import closeImport={closeImport} />}

      <div className={style.container}>
        <div className={style.content}>
          <div className={style.top}>
            <h1>
              <span id="heroTitle">My Collections</span>{' '}
            </h1>
            <p>
              <span id="heroText">
                Create, curate, and manage collections of unique NFTs to share
                and sell.
              </span>
            </p>
          </div>
          <div className={style.body}>
            <div
              className={`${style.boxes} animate__animated animate__fadeInUp animate__delay-1s`}
            >
              <div className={style.box}>Create Collection</div>
              <div className={style.box} onClick={() => setShowImport(true)}>
                Import Collection
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyCollections
