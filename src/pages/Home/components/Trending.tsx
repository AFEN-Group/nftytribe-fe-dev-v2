import { useEffect, useState } from "react";
import style from "../Home.module.scss";
//import Card from '../../../components/Card/ItemCardDefault'
import Card2 from "../../../components/Card/ItemCard2";
import { publicRequest } from "../../../utils/requestMethods";
import Marquee from "react-fast-marquee";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Trending = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getExploreCollectibles = async () => {
      try {
        const explore = await publicRequest.get(`/collectibles/explore`);
        const exploreData = explore.data;
        console.log(exploreData);
        setData(exploreData?.data?.collectibles);
        //setIsLoading(false)
      } catch (error) {
        //setIsLoading(false)
      }
    };
    getExploreCollectibles();
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <div className={style.trending}>
        {data.length >= 3 && (
          <div className={style.trContent}>
            <div className={style.trTop}>
              <h1>
                <span>{t("trending-today")}</span>{" "}
              </h1>
            </div>
            <div className={style.trBody}>
              {/* <div className={style.slidesContainer}> */}
              <Marquee
                speed={110}
                pauseOnHover={true}
                gradient={false}
                className={style.slidesContainer}>
                {data?.map((nft: any, i: any) => {
                  return (
                    (nft?._id && nft?.cardImage) && (
                      <div className={style.trSlide} key={nft._id}>
                        <Card2 nftData={nft} />
                      </div>
                    )
                  );
                })}
              </Marquee>
              {/* </div> */}
              {/* <div className={style.slidesContainer}> */}
              <Marquee
                speed={110}
                pauseOnHover={true}
                direction="right"
                gradient={false}
                className={style.slidesContainer}>
                {data?.map((nft: any, i: any) => {
                  return (
                    (nft?._id && nft?.cardImage) && (
                      <div className={style.trSlide} key={nft._id}>
                        <Card2 nftData={nft} />
                      </div>
                    )
                  );
                })}
              </Marquee>
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Trending;
