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
import UseAxios from "../../../hooks/AxiosConfig/useAxios";
import Protected from "../../../hooks/AxiosConfig/axiosInstance";
import { ChainContext } from "../../../context/chain";
import millify from "millify";
import numeral from "numeral";

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
  const { fetchData, Response, error, loading } = UseAxios();
  const dark = themeState.dark;
  let itemNumber = 1;
  // const [collections, setCollections] = useState([]);

  /*@ts-ignore*/
  const collections: any = Response?.data.results;

  const today = new Date();
  const [timeago, setTimeAgo] = useState(7);
  const daysAgo = (day: any) => {
    const date = new Date(today.getTime() - day * 60 * 60 * 24 * 1000);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  };
  useEffect(() => {
    fetchData({
      url: `api/collection/stats/?startDate=${daysAgo(28)}&endDate=${
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear()
      }`,
      method: "get",
      axiosInstance: Protected(sessionStorage.getItem("token")),
    });
  }, [timeago]);

  const { chain } = useContext(ChainContext);

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
              Top Collections
              {/* /*{t("top-collections")}*/}
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
              onClick={() => {
                setShowDrop({ ...showDrop, period: !showDrop.period });
              }}>
              <p
                onClick={() => {
                  setTimeAgo(1);
                  setFilter({ ...filter, period: "Last 24 hours" });
                }}>
                {t("last-24")}
              </p>
              <p
                onClick={() => {
                  setTimeAgo(1);
                  setFilter({ ...filter, period: "Last 7 days" });
                }}>
                {t("last-7")}
              </p>
              <p
                onClick={() => {
                  setTimeAgo(28);
                  setFilter({ ...filter, period: "Last month" });
                }}>
                {t("last-month")}
              </p>
            </div>
          )}
          <div className={style.topProContainer}>
            {!collections
              ? null
              : collections.map((collection: any, id: any) => {
                  return (
                    <FeaturedProject
                      _id={collection?.collection.id}
                      key={id}
                      img={collection?.collection?.coverImage}
                      name={collection?.collection.name}
                      chain={
                        chain?.filter((chain: any) => {
                          return chain.id === collection?.collection?.chainId;
                        })[0]?.name
                      }
                      percentage={collection?.priceChange}
                      fp={parseInt(collection?.floorPrice).toExponential(2)}
                      vol={millify(collection.nativeVol)}
                      id={id + 1}
                    />
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

const FeaturedProject = (props: any) => {
  return (
    <Link to={`/collectionDetails/${props._id}`} className={style.tpItem}>
      <div className={style.tpLeft}>
        <p>{props.id}</p>
        <div className="img">
          <img src={props.img || user} alt="collection" />
        </div>
      </div>
      <div className={style.tpRight}>
        <div className={style.tprInfo}>
          <h2>{props.name}</h2>
          <p style={{ color: "#3CC13B" }}>
            {numeral(props.percentage).format("0.0a")}%
          </p>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          <p>Floor price: {numeral(props.fp).format("0.0a")}</p>
          <p>
            {" "}
            Vol: {numeral(props.vol).format("0.0a")}{" "}
            <span style={{ textTransform: "uppercase" }}>{props.chain}</span>
          </p>
        </div>
        <div className={style.tprNumbers}></div>
      </div>
    </Link>
  );
};
