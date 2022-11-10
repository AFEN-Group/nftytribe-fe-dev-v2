import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../utils/requestMethods";
import { ThemeContext } from "../../../context/ThemeContext";
import style from "../Home.module.scss";
import arrow1 from "../assets/arrow.svg";
import arrow2 from "../assets/arrowgr.svg";
//import arrow3 from '../assets/arrowred.svg'
import user from "../assets/user.svg";
import nArrow from "../assets/arrow-right.svg";
import { useTranslation } from "react-i18next";

const TopProjects = () => {
  //const [number, setNumber] = useState(1)
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    period: "",
    //chain: ''
  });
  const [showDrop, setShowDrop] = useState({
    period: false,
    chain: false,
  });
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  let itemNumber = 1;
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    const resp = await publicRequest.get(`/collections`);
    console.log(resp.data.data);
    //setCollections(resp.data.data.splice(0, 9))
    setCollections(resp.data.data);
  };

  const getImage = (uri: any) => {
    let url;
    if (uri.includes("ipfs/")) {
      // eslint-disable-next-line
      url = "https://ipfs.io/ipfs/" + `${uri.split("ipfs/")[1]}`;
    } else if (uri.includes("ipfs://")) {
      // eslint-disable-next-line
      url = "https://ipfs.io/ipfs/" + `${uri.split("ipfs://")[1]}`;
    }
    return url;
  };


  return (
    <>
      <div className={style.topPro}>
        <div className={style.topProTop}>
          <h1>
            <span>
              Top Creators
              {/* /*{t("top-collections")}*/ }
              </span>{" "}
          </h1>
          <div className={style.topProFilters}>
            <div
              className={style.tpFilter}
              onClick={() =>
                setShowDrop({ ...showDrop, period: !showDrop.period })
              }>
              <p>{filter.period === "" ? "Last 7 days" : filter.period}</p>
              <img src={arrow1} alt="filter" />
            </div>
          </div>
          {showDrop.period && (
            <div
              className={`${style.drop2}  animate__animated animate__fadeInUp animate__faster`}
              onClick={() =>
                setShowDrop({ ...showDrop, period: !showDrop.period })
              }>
              <p
                onClick={() =>
                  setFilter({ ...filter, period: "Last 24 hours" })
                }>
                {t("last-24")}
              </p>
              <p
                onClick={() => setFilter({ ...filter, period: "Last 7 days" })}>
                {t("last-7")}
              </p>
              <p onClick={() => setFilter({ ...filter, period: "Last month" })}>
                {t("last-month")}
              </p>
            </div>
          )}
          <div className={style.topProContainer}>


            {!collections
              ? null
              : collections.map((collection: any, i) => {
                return (
                  collection.title && (
                    <Link
                      to={`/collectionDetails/${collection.contract_address}`}
                      className={style.tpItem}
                      key={collection._id}>
                      <div className={style.tpLeft}>
                        <p>{itemNumber++}</p>
                        <img
                          src={`
                                 ${collection?.cover_image?.includes("/ipfs") ||
                              collection?.cover_image?.includes("ipfs://")
                              ? getImage(collection?.cover_image)
                              : collection?.cover_image
                                ? collection?.cover_image
                                : user
                            }
                                
                               `}
                          alt="collection"
                        />
                      </div>
                      <div className={style.tpRight}>
                        <div className={style.tprInfo}>
                          <h2>{collection?.title || "Untitled"}</h2>
                          {/* <p>Floor price: 0</p> */}
                          <p >Chain : <span style={{ textTransform: 'uppercase' }}>{collection?.chain}</span></p>
                        </div>
                        <div className={style.tprNumbers}>
                          {/* <p>+ --</p>
                          <p>Vol: 0</p> */}
                        </div>
                      </div>
                    </Link>
                  )
                );
              })}
          </div>
          <Link to="/collectionDashboard" className={`${style.tpBtn}`}>
            <button className={`${dark === "true" ? "yellowBtn" : "blueBtn"}`}>
              {t("view-collection")}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopProjects;
