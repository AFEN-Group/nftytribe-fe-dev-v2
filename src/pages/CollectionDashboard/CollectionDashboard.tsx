import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { gsap, Expo } from "gsap";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import style from "./CollectionDashboard.module.scss";
import arrowA from "./assets/arrow.svg";
//import arrow1 from './assets/arrow0.svg'
import arrow2 from "./assets/arrowgr.svg";
//import arrow3 from './assets/arrowred.svg'
import user from "./assets/user.svg";
import Container from "../../components/Container/Container";
import { publicRequest } from "../../utils/requestMethods";
//import nArrow from './assets/arrow-right.svg'
import { shortenAddress } from "../../utils/formatting";
import UseAxios from "../../hooks/AxiosConfig/useAxios";
import Protected from "../../hooks/AxiosConfig/axiosInstance";
import { ChainContext } from "../../context/chain";
import numeral from "numeral";

const CollectionDashboard = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const { fetchData, Response, loading } = UseAxios();
  const dark = themeState.dark;
  let itemNumber = 1;
  let itemNumber2 = 1;
  const [filter, setFilter] = useState({
    period: "",
    chain: "",
  });
  const [showDrop, setShowDrop] = useState({
    period: false,
    chain: false,
  });
  /*@ts-ignore*/
  const collection = Response?.data;
  console.log(collection);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData({
      method: "get",
      url: "api/collection",
      axiosInstance: Protected(sessionStorage.getItem("token")),
    });
  }, []);
  useEffect(() => {
    const heroTitle = document.getElementById("heroTitle");
    const heroText = document.getElementById("heroText");
    const tl = gsap.timeline();
    tl.to(heroTitle, {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
    tl.to(heroText, {
      y: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
  }, []);

  const getImage = (uri: any) => {
    let url;
    if (uri.includes("ipfs/")) {
      url = `https://ipfs.io/ipfs/${uri.split("ipfs/")[1]}`;
    } else if (uri.includes("ipfs://")) {
      url = `https://ipfs.io/ipfs/${uri.split("ipfs://")[1]}`;
    }
    return url;
  };
  console.log(collection);

  const { chain } = useContext(ChainContext);
  return (
    <>
      {/* <Header /> */}
      <Container>
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.top}>
              <h1>
                <span id="heroTitle">Collection statistics</span>{" "}
              </h1>
              <p>
                <span id="heroText">
                  Top NfTs are ranked according to volume and floor price.
                </span>
              </p>
            </div>
            <div className={style.filtersContainer}>
              <div
                className={`${style.filters} animate__animated animate__fadeInUp animate__delay-1s`}>
                {/* <div className={style.filter}>
                <p>Categories</p>
                <img src={arrowA} alt="categories" />
              </div> */}
                {/* <div className={style.filter} onClick={() => setShowDrop({ ...showDrop, chain: !showDrop.chain })}>
                  <p>{filter.chain === "" ? 'Chains' : filter.chain}</p>
                  <img src={arrowA} alt="categories" />

                </div> */}

                {/* <div className={style.filter} onClick={() => setShowDrop({ ...showDrop, period: !showDrop.period })}>
                  <p>{filter.period === "" ? 'Last 24 hours' : filter.period}</p>
                  <img src={arrowA} alt="categories" />
                </div> */}
              </div>
              {showDrop.chain && (
                <div
                  className={`${style.drop} ${
                    dark === "true" ? "darkTheme" : "lightTheme"
                  } animate__animated animate__fadeInUp animate__faster`}
                  onClick={() =>
                    setShowDrop({ ...showDrop, chain: !showDrop.chain })
                  }>
                  <p onClick={() => setFilter({ ...filter, chain: "Eth" })}>
                    Ethereum
                  </p>
                  <p className="">Binance</p>
                  <p className="disable_link2">Skale</p>
                  <p className="disable_link2">Solana</p>
                </div>
              )}
              {showDrop.period && (
                <div
                  className={`${style.drop2} ${
                    dark === "true" ? "darkTheme" : "lightTheme"
                  } animate__animated animate__fadeInUp animate__faster`}
                  onClick={() =>
                    setShowDrop({ ...showDrop, period: !showDrop.period })
                  }>
                  <p
                    onClick={() =>
                      setFilter({ ...filter, period: "Last 24 hours" })
                    }>
                    Last 24 hours
                  </p>
                  <p
                    onClick={() =>
                      setFilter({ ...filter, period: "Last 7 days" })
                    }>
                    Last 7 days
                  </p>
                  <p
                    onClick={() =>
                      setFilter({ ...filter, period: "Last month" })
                    }>
                    Last month
                  </p>
                </div>
              )}
            </div>

            <div
              className={`${style.topProTable} animate__animated animate__fadeInUp animate__delay-2s`}>
              <div className={style.tpTableTitles}>
                <div style={{ width: "25%" }}>
                  <p>Collection</p>
                </div>
                <div style={{ width: "12%" }}>
                  <p>Volume</p>
                </div>
                <div style={{ width: "12%" }}>
                  <p>Chain</p>
                </div>
                <div style={{ width: "8%" }}>
                  <p>7days</p>
                </div>
                <div style={{ width: "8%" }}>
                  <p>24hrs</p>
                </div>
                <div style={{ width: "12%" }}>
                  <p>Floor price</p>
                </div>
                <div style={{ width: "12%" }}>
                  <p>Owners</p>
                </div>
                <div style={{ width: "12%" }}>
                  <p>Items</p>
                </div>
              </div>
              <div className={style.tpTableItems}>
                {!collection
                  ? null
                  : collection?.results.map((collection: any, i: any) => {
                      return (
                        collection.name && (
                          <Link
                            to={`/collectionDetails/${collection.id}`}
                            className={
                              dark === "true"
                                ? style.tableItemD
                                : style.tableItem
                            }
                            key={collection._id}>
                            <div
                              style={{ width: "25%" }}
                              className={style.collectionInfo}>
                              <p>{itemNumber++}</p>
                              <img
                                //src={user}
                                src={`
                          ${
                            collection?.coverImage?.includes("/ipfs") ||
                            collection?.coverImage?.includes("ipfs://")
                              ? getImage(collection?.coverImage)
                              : collection?.coverImage
                              ? collection?.coverImage
                              : user
                          }
                         
                        `}
                                alt="collection"
                                className={style.user}
                              />
                              <p>{collection?.name || "Untitled"}</p>
                              {/* <img src={arrow2} alt="arrow-up" /> */}
                            </div>

                            <div
                              className={style.itemAlign}
                              style={{ width: "12%" }}>
                              {" "}
                              <p>
                                {numeral(
                                  collection?.volume?.toPrecision(3) || 0
                                ).format("0.0a")}
                              </p>
                            </div>

                            <div
                              className={style.itemAlign}
                              style={{ width: "12%" }}>
                              <p style={{ textTransform: "uppercase" }}>
                                {
                                  chain?.filter((chain: any) => {
                                    return chain.id === collection.chainId;
                                  })[0].name
                                }
                              </p>
                            </div>
                            <div
                              style={{ width: "8%" }}
                              className={style.itemAlign}>
                              <p>
                                <span>
                                  {numeral(collection["7days"]).format("0.0a")}
                                </span>
                              </p>
                            </div>
                            <div
                              style={{ width: "8%" }}
                              className={style.itemAlign}>
                              <p>
                                <span>
                                  {numeral(collection["24hrs"]).format("0.0a")}
                                </span>
                              </p>
                            </div>
                            <div
                              style={{ width: "12%" }}
                              className={style.itemAlign}>
                              <p>
                                {numeral(collection?.floorPrice).format("0.0a")}
                              </p>
                            </div>
                            <div
                              style={{ width: "12%" }}
                              className={style.itemAlign}>
                              <p>
                                {numeral(collection?.totalOwners).format(
                                  "0.0a"
                                )}
                              </p>
                            </div>
                            <div
                              style={{ width: "12%" }}
                              className={style.itemAlign}>
                              <p>
                                {numeral(collection?.totalNfts).format("0.0a")}
                              </p>
                            </div>
                          </Link>
                        )
                      );
                    })}
               

                <div className={style.line1}></div>
              </div>
            </div>

            <div className={style.topProContainer}>
              {/* <div className={style.tpItem}>
                            <div className={style.tpLeft}>
                                <p>{itemNumber++}</p>
                                <img src={user} alt="user" />
                            </div>
                            <div className={style.tpRight}>
                                <div className={style.tprInfo}>
                                    <h2>Skimming cat</h2>
                                    <p>Floor price: 1Eth</p>
                                </div>
                                <div className={style.tprNumbers}>
                                    <p>+30</p>
                                    <p>Vol: 6</p>
                                </div>
                            </div>

                        </div> */}

              {/* {!collection
                ? null
                : collection?.results.map((collection: any, i: any) => {
                    return (
                      collection.name && (
                        <Link
                          to={`/collectionDetails/${collection.id}`}
                          className={style.tpItem}
                          key={collection.id}>
                          <div className={style.tpLeft}>
                            <p>{itemNumber2++}</p>
                            <img
                              src={`
                                 ${
                                   collection?.cover_image?.includes("/ipfs") ||
                                   collection?.cover_image?.includes("ipfs://")
                                     ? getImage(collection?.coverImage)
                                     : collection?.coverImage
                                     ? collection?.coverImage
                                     : user
                                 }
                                
                               `}
                              alt="collection"
                            />
                          </div>
                          <div className={style.tpRight}>
                            <div className={style.tprInfo}>
                              <h2>{collection?.name || "Untitled"}</h2>
                              <p>Floor price: 0</p>
                            </div>
                            <div className={style.tprNumbers}>
                              <p>+30</p>
                              <p>Vol: 0</p>
                            </div>
                          </div>
                        </Link>
                      )
                    );
                  })} */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CollectionDashboard;
