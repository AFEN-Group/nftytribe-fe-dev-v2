import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { gsap, Expo } from "gsap";
import { ThemeContext } from "../../context/ThemeContext";
import { publicRequest } from "../../utils/requestMethods";

import Header from "../../components/Header/Header";
import style from "./Explore.module.scss";
import Filter from "./assets/Filter.svg";
import Arrow1 from "./assets/arrowdown.svg";
import Sad from "./assets/sad.svg";
import Arrow from "./assets/arrow.svg";
import ItemCard from "../../components/Card/ItemCard";
import Container from "../../components/Container/Container";
import Arrow2 from "./assets/arrowright.svg";
import AcceptBtn from "../../components/AcceptBtn/AcceptBtn";
import Loader from "../../components/Loader/Loader";
import FilterNav from "./FilterNav/FilterNav";
import { useTranslation } from "react-i18next";

//import RadioBtn from '../../components/RadioBtn/RadioBtn'

const Explore = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  const [tab, setTab] = useState(localStorage.getItem("category") || '');
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    saleType: false,
    blockChain: false,
    collection: false,
  });
  // const [mfilter, setMFilter] = useState({
  //   saleType: '',
  //   blockChain: '',
  //   categories: '',
  // });

  const [filterQuery, setFilterQuery] = useState("");
  //const [query, setQuery] = useState("");
  //const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const getExploreCollectibles = async () => {
    try {
      const explore = await publicRequest.get(
        `/collectibles/explore/filter?on_sale=true&nft_type=${tab}${filterQuery}&page=${currentPage}`
        //`/collectibles/explore/filter?lazy_mint=true&marketplace_type=1&page=${currentPage}`
        //&size=9
      );
      const exploreData: any = explore.data;
      console.log(exploreData);
      setData(exploreData?.data?.collectibles);
      //setTotalPages(exploreData?.data?.total_count)
      const total: any = exploreData?.data?.totalNfts / 10
      setTotalPages(parseFloat(total))

      console.log("pages>>> ", parseFloat(total))
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  console.log(data);

  useEffect(() => {
    getExploreCollectibles();
    console.log(filterQuery);
  }, [tab, filterQuery, currentPage]);
  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1)

    }
  }
  const prevPage = () => {
    if (currentPage <= Math.ceil(totalPages)) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

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

  useEffect(() => {
    localStorage.setItem('category', '')
  }, [tab])

  const setDefaults = () => {
    setFilterQuery("");
    setTab("");
  };
  const { t } = useTranslation();
  return (

    <>
      <Header />
      <Container>
        <div className={style.explore}>
          <div className={style.exploreContent}>
            <div className={style.exploreTop}>
              <h1>
                <span id="heroTitle">{t("Explore Collections")}</span>{" "}
              </h1>
              <p>
                <span id="heroText">{t("Based on categories")}</span>{" "}
              </p>
              <div
                className={`${style.exploreCats} animate__animated animate__fadeInUp animate__delay-1s`}>
                <div
                  className={
                    tab === "" && dark === "true"
                      ? style.darkActive
                      : tab === "" && dark !== "true"
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab("")}>
                  <p>All</p>
                </div>
                <div
                  className={
                    tab === "art" && dark === "true"
                      ? style.darkActive
                      : tab === "art" && dark !== "true"
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab("art")}>
                  <p>Art</p>
                </div>
                <div
                  className={
                    tab === "gaming" && dark === "true"
                      ? style.darkActive
                      : tab === "gaming" && dark !== "true"
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab("gaming")}>
                  <p>Gaming</p>
                </div>
                <div
                  className={
                    tab === "photography" && dark === "true"
                      ? style.darkActive
                      : tab === "photography" && dark !== "true"
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab("photography")}>
                  <p>Photography</p>
                </div>
                <div
                  className={
                    tab === "collectibles" && dark === "true"
                      ? style.darkActive
                      : tab === "collectibles" && dark !== "true"
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab("collectibles")}>
                  <p>Collectibles</p>
                </div>

                <div
                  className={
                    tab === "african_art" && dark === "true"
                      ? style.darkActive
                      : tab === "african_art" && dark !== "true"
                        ? style.lightActive
                        : style.exploreCat
                  }
                  onClick={(e) => setTab("african_art")}>
                  <p>African Art</p>
                </div>
              </div>
              <div className={style.exploreCatsM}>
                <FilterNav />
              </div>
            </div>

            <div
              //className={style.body}
              className={`${style.body} animate__animated animate__fadeInUp animate__delay-2s`}>
              <div
                //className={style.sideBar}
                className={`${style.sideBar} ${dark === "true" ? "darkGradient" : "lightGradient"
                  } `}
                id="sidebar">
                <div className={style.sideBarContent}>
                  <div className={style.sBItemA}>
                    <img src={Filter} alt="filter" />
                    <p>
                      <strong>{t("Filters")}</strong>
                    </p>
                  </div>
                  {/* <div className={style.sBItem}>
                    <p>Price range</p>
                    <img src={Arrow1} alt="filter" />
                  </div> */}
                  <div
                    className={style.sBItem}
                    onClick={() =>
                      setFilter({ ...filter, saleType: !filter.saleType })
                    }>
                    <p>{t("Sale type")}</p>
                    <img src={filter.saleType ? Arrow2 : Arrow1} alt="filter" />
                  </div>
                  {filter.saleType && (
                    <form
                      className={`${dark === "true" ? style.filterBxD : style.filterBxL
                        } animate__animated animate__fadeIn`}>
                      <div className={style.filterItem1}>
                        <div className={style.filterTxt}>
                          <p>Fixed Sale</p>
                        </div>

                        {/* <div className={style.radioBx}> <RadioBtn /></div> */}
                        <div
                          className={style.pbRadio}
                          onClick={() => setFilterQuery("&marketplace_type=1")}>
                          <input type="radio" name="filter" />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                          <p>Auctions</p>
                        </div>
                        <div
                          className={style.pbRadio}
                          onClick={() => setFilterQuery("&marketplace_type=2")}>
                          <input type="radio" name="filter" />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                          <p>Lazy Mint</p>
                        </div>
                        <div
                          className={style.pbRadio}
                          onClick={() => setFilterQuery("&marketplace_type=2")}>
                          <input type="radio" name="filter" />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                    </form>
                  )}
                  <div
                    className={style.sBItem}
                    onClick={() =>
                      setFilter({ ...filter, blockChain: !filter.blockChain })
                    }>
                    <p>{t("Blockchain")}</p>
                    <img
                      src={filter.blockChain ? Arrow2 : Arrow1}
                      alt="filter"
                    />
                  </div>
                  {filter.blockChain && (
                    <form
                      className={`${dark === "true" ? style.filterBxD : style.filterBxL
                        } animate__animated animate__fadeIn`}>
                      <div className={style.filterItem1}>
                        <div className={style.filterTxt}>
                          <p>Ethereum</p>
                        </div>
                        <div className={style.pbRadio} onClick={() => setFilterQuery("&chain=eth")}>
                          <input type="radio" name="filter" />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                          <p >Binance</p>
                        </div>
                        <div className={style.pbRadio} onClick={() => setFilterQuery("&chain=bsc")}>
                          <input type="radio" name="filter" />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <div className={`${style.filterTxt} `}>
                          <p className="disable_link">Skale</p>
                        </div>
                        <div
                          className={style.pbRadio}
                          onClick={() => setFilterQuery("&chain=binance")}>
                          <input type="radio" name="filter" disabled />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                      <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                          <p className="disable_link">Solana</p>
                        </div>
                        <div
                          className={style.pbRadio}
                          onClick={() => setFilterQuery("&chain=binance")}>
                          <input type="radio" name="filter" disabled />
                          <span className={style.checkmark}></span>
                        </div>
                      </div>
                    </form>
                  )}
                  <div className={style.sBItem}>
                    <p>{t("Recently added")}</p>
                    {/* <AcceptBtn onClick={setDefaults} /> */}
                    <div className={style.pbRadio} onClick={setDefaults}>
                      <input type="radio" name="filter" />
                      <span className={style.checkmark}></span>
                    </div>
                    {/* <img src={Arrow1} alt="filter" /> */}
                  </div>
                  <form className={style.sBItem}>
                    <p className="disable_link">{t("Physical Item")}</p>
                    {/* <AcceptBtn onClick={setDefaults} /> */}
                    <div className={style.pbRadio} onClick={setDefaults}>
                      <input type="radio" name="filter" disabled />
                      <span className={style.checkmark}></span>
                    </div>
                    {/* <img src={Arrow1} alt="filter" /> */}
                  </form>

                  {/* <div className={style.sBItem} onClick={() => setFilter("collection")}>
                    <p>Collection</p>
                    <img src={filter === 'collection' ? Arrow2 : Arrow1} alt="filter" />

                  </div> */}
                  {filter.collection && (
                    <div
                      className={`${dark === "true" ? style.filterBxD : style.filterBxL
                        } animate__animated animate__fadeIn`}>
                      <div className={style.filterItem}>
                        <p>Fixed Sale</p>
                        <div className={style.radio}></div>
                      </div>
                    </div>
                  )}
                  {/* <div className={style.sBItem}>
                    <p>Price ascending</p>
                    <img src={Arrow1} alt="filter" />
                  </div>
                  <div className={style.sBItem}>
                    <p>Price descending</p>
                    <img src={Arrow1} alt="filter" />
                  </div> */}
                </div>
              </div>
              {isLoading ? (
                <div className={style.loaderBx}>
                  <Loader />
                </div>
              ) : (
                <div className={style.itemsContainer}>
                  {data?.length >= 1 ? (
                    !isLoading ? (
                      <>
                        <div className={style.itemsContent}>
                          {data?.map((nft: any, i: any) => {
                            return (
                              (nft?._id && nft?.cardImage) && (
                                <div className={style.itemBx} key={nft._id}>
                                  <ItemCard nftData={nft} />
                                </div>

                              )

                            );
                          })}
                          {totalPages > 1 && (
                            <div className={style.pagination}>
                              <div className={style.paginateBtns}>
                                {currentPage > 1 && (
                                  <button
                                    className={`${style.filterItem} ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                                      }`}
                                    onClick={prevPage}
                                  >
                                    {'Previous'}
                                  </button>
                                )}
                                {currentPage < totalPages && (
                                  <button
                                    className={`${style.filterItem} ${dark === 'true' ? 'lightTxt' : 'darkTxt'
                                      }`}
                                    onClick={nextPage}
                                  >
                                    {'Next'}
                                  </button>
                                )}
                              </div>
                              <p>
                                Page {currentPage} of {Math.ceil(totalPages)}
                              </p>
                            </div>)}
                        </div>
                      </>
                    ) : (
                      <div className={style.loaderBx}>
                        <Loader />
                      </div>
                    )
                  ) : (
                    <div className={style.noContent}>
                      <div className={style.noResults}>
                        <img src={Sad} alt="sad" />
                        <h2>No items found</h2>
                        {/* <Link to="/explore" className={style.exploreM}>
                        <p>Explore marketplace</p>
                        <img src={Arrow} alt="arrow" />
                      </Link> */}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Explore;
