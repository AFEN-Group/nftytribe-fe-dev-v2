//import React from 'react'
import style from '../Home.module.scss'
import Card from '../../../components/Card/ItemCardDefault'

const Trending = () => {
  return (
    <>
      <div className={style.trending}>
        <div className={style.trContent}>
          <div className={style.trTop}>
            <h1>
              <span>Trending today</span>{' '}
            </h1>
          </div>
          <div className={style.trBody}>
            <div className={style.trSlides1}>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>

              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
            </div>

            <div className={style.trSlides2}>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>

              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
              <div className={style.trSlide}>
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
