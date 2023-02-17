import { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import style from "./CollectionDetails.module.scss";
import Header from "../../components/Header/Header";
import Cover from "./assets/cover.svg";
import Avatar from "./assets/avatar.svg";
import Edit from "./assets/edit.svg";
import numeral from "numeral";
// import IG from './assets/ig.svg'
// import Settings from './assets/settings.svg'
// import Share from './assets/share.svg'
// import Reddit from './assets/reddit.svg'
import Filter from "./assets/Filter.svg";
import Arrow1 from "./assets/arrowdown.svg";
import Sad from "./assets/sad.svg";
import Arrow from "./assets/arrow.svg";
//import ItemCard from '../../components/Card/ItemCardDefault'
import ItemCard from "../../components/Card/ItemCard";
import Container from "../../components/Container/Container";
import Arrow2 from "./assets/arrowright.svg";
import { useParams } from "react-router-dom";
import collectionAbi from "../../smart_contracts/erc721Collection.json";
import UseAxios from "../../hooks/AxiosConfig/useAxios";
import Protected from "../../hooks/AxiosConfig/axiosInstance";
import Web3 from "web3";
import Loader from "../../components/Loader/Loader";
import { Radio } from "../Explore/Explore";
import { UserContext } from "../../context/UserContext";
import { ChainContext } from "../../context/chain";
import millify from "millify";

const CollectionDetails = () => {
  //const [view, setView] = useState('items')
  const [tab, setTab] = useState("all");
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const { collectionId } = useParams();
  const {
    loading: load,
    Response: collectiondet,
    error: err,
    fetchData: fetchCollection,
  } = UseAxios();
  const { loading, Response, error, fetchData } = UseAxios();

  {
    /* @ts-ignore */
  }

  const collection = collectiondet?.data;
  {
    /* @ts-ignore */
  }
  const collectibles = Response?.data?.results;
  const { chain } = useContext(ChainContext);

  const getParams = () => {
    let params;
    for (let key in filterQuery) {
      if (params) params = `${params}&${key}=${filterQuery[key]}`;
      else params = `${key}=${filterQuery[key]}`;
    }
    return params;
  };
  const getDet = async () => {
    await fetchCollection({
      method: "get",
      url: `/api/collection/${collectionId}`,
      axiosInstance: Protected(sessionStorage.getItem("token")),
    });
  };

  const { userState } = useContext(UserContext);
  const [filterQuery, setFilterQuery] = useState<any>({
    chain: 1,
    physical: false,
    userId: userState?.user?.id,
    collection: collectionId,
  });
  useEffect(() => {
    if (collectiondet) {
      fetchData({
        method: "get",
        url: `/api/nft/listings?${getParams()}&chain=${collection.chainId}`,
        axiosInstance: Protected(sessionStorage.getItem("token")),
      });
    }
  }, [collectiondet, filterQuery]);
  const { fetchData: upload, Response: res } = UseAxios();

  useEffect(() => {
    getDet();
  }, [collectionId, currentPage, res]);

  useEffect(() => {
    window.scrollTo(0, 300);
    getData();
  }, [collection]);

  const [filter, setFilter] = useState({
    saleType: false,
    blockChain: false,
    collection: false,
    price: false,
  });

  const getData = async () => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      const web3 = new Web3(window.ethereum);

      // @ts-ignore
      const contract = new web3.eth.Contract(
        collectionAbi as any,
        collection?.contractAddress
      );

      const stat = await Promise.all([
        await contract.methods.totalSupply().call(),
      ]);
      console.log(stat);
    }
  };
  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage <= Math.ceil(totalPages)) {
      setCurrentPage(currentPage - 1);
    }
  };

  const floorPrice = numeral(collection?.floorPrice).format("0.0a");
  const bgref: any = useRef(null);
  return (
    <>
      {/* <Header /> */}
      <Container>
        <div className={style.container}>
          <div
            style={{ height: "400px" }}
            className={`${style.coverBx} animate__animated animate__fadeInDown `}>
            <div className={style.coverBtns}>
              <Link to="/profile">
                {" "}
                <img src={Arrow2} className={style.arrow} />
              </Link>

              <button
                onClick={() => bgref?.current?.click()}
                className={dark === "true" ? style.bl : style.bd}>
                Edit cover photo
              </button>
              <div className={style.fileInput1}>
                <input
                  ref={bgref}
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={async (e: any) => {
                    let file = e.target.files[0];
                    let formData = new FormData();

                    formData.append("images", file);

                    let key = await (
                      await Protected(sessionStorage.getItem("token"))["post"](
                        "api/uploads/temp",
                        formData
                      )
                    ).data.key;

                    upload({
                      method: "patch",
                      url: `api/collection/bg/${collection.contractAddress}`,
                      axiosInstance: Protected(sessionStorage.getItem("token")),
                      requestConfig: {
                        key: key,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <img
              style={{ height: "100%" }}
              src={collection?.bg || collection?.coverImage}
              alt="cover"
            />
          </div>
          <div
            //className={style.content}
            className={`${style.content} animate__animated animate__fadeInUp animate__delay-1s `}>
            <div className={style.avatar}>
              <img src={collection?.coverImage || Avatar} alt="avatar" />
            </div>
            <div className={style.collInfo}>
              <div className={style.infoMain}>
                <div className={style.infoTitle}>
                  {/* @ts-ignore */}

                  <h1>{collection?.title}</h1>
                  {/* <img src={Edit} alt="edit" /> */}
                </div>
                <p>
                  {/* @ts-ignore */}
                  Welcome to the {collection?.name} collection. Discover items
                  in this collection.
                  {}
                </p>
                <div className={style.infoBoxes}>
                  <div className={style.boxRow}>
                    <div
                      className={`${style.singleBox} ${
                        dark === "true" ? "darkGradient" : ""
                      } `}>
                      <h3>{collection?.totalNfts}</h3>
                      <p>Items</p>
                    </div>
                    <div
                      // className={style.singleBox}
                      className={`${style.singleBox} ${
                        dark === "true" ? "darkGradient" : ""
                      } `}>
                      <h3>{numeral(collection?.totalOwners).format("0.0a")}</h3>
                      <p>Owners</p>
                    </div>
                  </div>
                  <div className={style.boxRow}>
                    <div
                      //className={style.singleBox}
                      className={`${style.singleBox} ${
                        dark === "true" ? "darkGradient" : ""
                      } `}>
                      <h3>{floorPrice}</h3>
                      <p>Floor price</p>
                    </div>
                    <div
                      //className={style.singleBox}
                      className={`${style.singleBox} ${
                        dark === "true" ? "darkGradient" : ""
                      } `}>
                      <h3 style={{ fontSize: "16px" }}>
                        {numeral(
                          collection?.volume?.toPrecision(5) || 0
                        ).format("0.0a")}
                      </h3>
                      <p>Vol traded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.collectionBody}>
              <div
                //className={style.body}
                className={`${style.body} animate__animated animate__fadeInUp animate__delay-2s`}></div>
              <div className={style.itemsBody}>
                <div
                  //className={style.sideBar}
                  className={`${style.sideBar} ${
                    dark === "true" ? "darkGradient" : "lightGradient"
                  } `}
                  id="sidebar">
                  <div className={style.sideBarContent}>
                    <div className={style.sBItemA}>
                      <img src={Filter} alt="filter" />
                      <p>
                        <strong>Filters</strong>
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        setFilter({ ...filter, price: !filter.price })
                      }
                      className={style.sBItem}>
                      <p
                      // className="disable_link"
                      >
                        Price range
                      </p>
                      <img src={filter.price ? Arrow2 : Arrow1} alt="filter" />
                    </div>
                    {filter.price && (
                      <form
                        className={`${
                          dark === "true" ? style.filterBxD : style.filterBxL
                        } animate__animated animate__fadeIn`}>
                        <div className={style.filterItem1}>
                          <div className={style.filterTxt}>
                            <p>Price Ascending</p>
                          </div>

                          {/* <div className={style.radioBx}> <RadioBtn /></div> */}
                          <Radio
                            click={() => {
                              setPage(1);
                              setFilterQuery({
                                ...filterQuery,
                                order: "price",
                                direction: "ASC",
                              });
                            }}
                            on={filterQuery.direction === "ASC"}
                          />
                        </div>
                        <div className={style.filterItem}>
                          <div className={style.filterTxt}>
                            <p>Price Descending</p>
                          </div>
                          <Radio
                            click={() => {
                              setPage(1);
                              setFilterQuery({
                                ...filterQuery,
                                order: "price",
                                direction: "DESC",
                              });
                            }}
                            on={filterQuery.direction === "DESC"}
                          />
                        </div>
                      </form>
                    )}
                    <div
                      className={style.sBItem}
                      onClick={() =>
                        setFilter({ ...filter, saleType: !filter.saleType })
                      }>
                      <p>Sale type"</p>
                      <img
                        src={filter.saleType ? Arrow2 : Arrow1}
                        alt="filter"
                      />
                    </div>
                    {filter.saleType && (
                      <form
                        className={`${
                          dark === "true" ? style.filterBxD : style.filterBxL
                        } animate__animated animate__fadeIn`}>
                        <div className={style.filterItem1}>
                          <div className={style.filterTxt}>
                            <p>Fixed Sale</p>
                          </div>

                          {/* <div className={style.radioBx}> <RadioBtn /></div> */}
                          <Radio
                            click={() => {
                              setPage(1);
                              setFilterQuery({
                                ...filterQuery,
                                listingType: "normal",
                              });
                            }}
                            on={filterQuery.listingType === "normal"}
                          />
                        </div>
                        <div className={style.filterItem}>
                          <div className={style.filterTxt}>
                            <p>Auctions</p>
                          </div>
                          <Radio
                            click={() => {
                              setPage(1);
                              setFilterQuery({
                                ...filterQuery,
                                listingType: "auction",
                              });
                            }}
                            on={filterQuery.listingType === "auction"}
                          />
                        </div>
                        {/* <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                          <p>Lazy Mint</p>
                        </div>
                        <div
                          className={style.pbRadio}
                          onClick={() => setFilterQuery("&marketplace_type=2")}>
                          <input type="radio" name="filter" />
                          <span className={style.checkmark}></span>
                        </div>
                      </div> */}
                      </form>
                    )}

                    <form className={style.sBItem}>
                      <p>Physical Item</p>
                      {/* <AcceptBtn onClick={setDefaults} /> */}
                      <Radio
                        on={filterQuery.physical}
                        click={() => {
                          setPage(1);
                          setFilterQuery({
                            ...filterQuery,
                            physical: !filterQuery.physical,
                          });
                        }}
                      />

                      {/* <img src={Arrow1} alt="filter" /> */}
                    </form>

                    {filter.collection && (
                      <div
                        className={`${
                          dark === "true" ? style.filterBxD : style.filterBxL
                        } animate__animated animate__fadeIn`}>
                        <div className={style.filterItem}>
                          <p>Fixed Sale</p>
                          <div className={style.radio}></div>
                        </div>
                      </div>
                    )}

                    <div className={style.sBItem}>
                      <p>Favorited</p>
                      <Radio click={""} />
                    </div>
                  </div>
                </div>
                <div className={style.itemsContainer}>
                  {collectibles?.length >= 1 ? (
                    <>
                      <div className={style.itemsContent}>
                        {/* <ItemCard nftData={nft} /> */}

                        {collectibles?.map((nft: any, i: number) => {
                          return (
                            nft?.id && (
                              // <div className={style.itemBx} >
                                <ItemCard key={nft._id}nftData={nft} />
                              // </div>
                            )
                          );
                        })}
                        {totalPages > 1 && (
                          <div className={style.pagination}>
                            <div className={style.paginateBtns}>
                              {currentPage > 1 && (
                                <button
                                  className={`${style.filterItem} ${
                                    dark === "true" ? "lightTxt" : "darkTxt"
                                  }`}
                                  onClick={prevPage}>
                                  {"Prev"}
                                </button>
                              )}
                              {currentPage < totalPages && (
                                <button
                                  className={`${style.filterItem} ${
                                    dark === "true" ? "lightTxt" : "darkTxt"
                                  }`}
                                  onClick={nextPage}>
                                  {"Next"}
                                </button>
                              )}
                            </div>
                            <p>
                              Page {currentPage} of {Math.ceil(totalPages)}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className={style.noContent}>
                      <div className={style.noResults}>
                        <img src={Sad} alt="sad" />
                        <h2>No items found</h2>
                        <Link to="/explore" className={style.exploreM}>
                          <p>Explore marketplace</p>
                          <img src={Arrow} alt="arrow" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CollectionDetails;
