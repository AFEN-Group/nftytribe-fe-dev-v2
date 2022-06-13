import { useEffect, useState } from 'react'
import style from '../Home.module.scss'
import Card from '../../../components/Card/ItemCardDefault'
import { publicRequest } from '../../../utils/requestMethods'

const Trending = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getExploreCollectibles = async () => {
      try {
        const explore = await publicRequest.get(`/collectibles/explore`)
        const exploreData = explore.data
        console.log(exploreData)
        setData(exploreData?.data?.collectibles)
        //setIsLoading(false)
      } catch (error) {
        //setIsLoading(false)
      }
    }
    getExploreCollectibles()
  }, [])

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
