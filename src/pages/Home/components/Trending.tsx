//import React from 'react'
import { useEffect, useState } from 'react'
import style from '../Home.module.scss'
//import Card from '../../../components/Card/ItemCardDefault'
import Card2 from '../../../components/Card/ItemCard'
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
        //setTotalCount(exploreData?.data?.total_count)
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
            <div className={style.trSlides01}>
              {/* <div className={style.trSlide}>
             <Card />
            </div> */}
              {data?.map((nft: any, i: any) => {
                return (
                  nft?._id && (
                    <div className={style.trSlide} key={nft._id}>
                      <Card2 nftData={nft} />
                    </div>
                  )
                )
              })}
              {/* <div className={style.trSlide}>
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
              </div> */}
            </div>

            {/* <div className={style.trSlides2}>
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
