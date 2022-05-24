import { useEffect, useState } from 'react'
import { gsap, Expo } from 'gsap'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import style from './Collections.module.scss'
import Import from './Import'
import Container from '../../components/Container/Container'

const MyCollections = () => {
  const [showImport, setShowImport] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)

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
      <Container>
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
                <Link to="/createcollection" className={style.box}>
                  Create Collection
                </Link>
                <div className={style.box} onClick={() => setShowImport(true)}>
                  Import Collection
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default MyCollections
