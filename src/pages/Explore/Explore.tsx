import { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, Expo } from "gsap";
import { ThemeContext } from "../../context/ThemeContext";
import { publicRequest } from "../../utils/requestMethods";

// import Header from "../../components/Header/Header";
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
import { ChainContext } from "../../context/chain";
import Protected from "../../hooks/AxiosConfig/axiosInstance";
import axios from "axios";

//import RadioBtn from '../../components/RadioBtn/RadioBtn'

const Explore = () => {
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  const [tab, setTab] = useState(sessionStorage.getItem("category") || '');
  const [data, setData] = useState<any>([]);
  const [filter, setFilter] = useState({
    saleType: false,
    blockChain: false,
    collection: false,
  });
 

  const [filterQuery, setFilterQuery] = useState<any>({
    chain:1,
    physical:false
  });
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const chain= useContext(ChainContext)
  const getExploreCollectibles = async () => {
    setIsLoading(true)
    const getParams= ()=>{
      let params;
      for(let key in filterQuery){
      if(params)  params=`${params}&${key}=${filterQuery[key]}`
      else params = `${key}=${filterQuery[key]}`
      }
      return params
    }
    // console.log(getParams());
    
   try {

     const res= await Protected(sessionStorage.getItem('token'))['get'](`/api/nft/listings?${getParams()}`)
     setData(res.data?.results)
     
   } catch (error) {
    console.log(error);
    
   }
   finally{
    setIsLoading(false)
   }
  };
  

  useEffect(() => {
    getExploreCollectibles();
    console.log(filterQuery);
    return ()=>{
      const controller = new AbortController();
      // cancel the request
      controller.abort()
    }
  }, [tab,currentPage,chain,filterQuery]);
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

  const interDemo = useRef(null);

  const callBack = (entries:any) => {
    console.log(entries);
    
    const [entry] = entries;
    if(entry.isIntersecting) nextPage();
  };
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    const target = interDemo.current;
    if (target) observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [interDemo]);

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
    sessionStorage.setItem('category', '')
  }, [tab])
  
  console.log(chain,data);
  
 
  const { t } = useTranslation();
  return (

    <>
      {/* <Header /> */}
      <Container>
        <div className={style.explore}>
          <div className={style.exploreContent}>
            <div className={style.exploreTop}>
              <h1>
                <span id="heroTitle">
                  Explore Collectibles
                  {/* {t("Explore Collections")} */}
                </span>{" "}
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
                  <p >Collectibles</p>
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
                  <div className={style.sBItem}>
                    <p className="disable_link">Price range</p>
                    <img src={Arrow1} alt="filter" />
                  </div>
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
                        <Radio click={() => setFilterQuery({ ...filterQuery, listingType: 'normal' })} on={filterQuery.listingType==='normal'}/>
                      </div>
                      <div className={style.filterItem}>
                        <div className={style.filterTxt}>
                          <p>Auctions</p>
                        </div>
                        <Radio click={()=>setFilterQuery({...filterQuery,listingType:'auction'})} on={filterQuery.listingType === 'auction'}/>
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
                          {
                            chain.map((chain:any)=>(
                              <div onClick={()=>setFilterQuery({...filterQuery,chain:chain.id})} className={style.filterItem1}>
                                <div className={style.filterTxt}>
                                  <p>{chain.name}</p>
                                </div>
                                <Radio on={filterQuery.chain===chain.id}/>
                              </div>
                            ))
                          }
                      
                      
                    </form>
                  )}
                  {/* <div className={style.sBItem}>
                    <p>{t("Recently added")}</p>
                  
                    <Radio click={''} />

                  
                    
                  </div> */}
                  <form className={style.sBItem}>
                    <p >{t("Physical Item")}</p>
                    {/* <AcceptBtn onClick={setDefaults} /> */}
                  <Radio on={filterQuery.physical} click={() => setFilterQuery({ ...filterQuery, physical: !filterQuery.physical })} />

                   
                    {/* <img src={Arrow1} alt="filter" /> */}
                  </form>

                  
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
                  <div className={style.sBItem}>
                    <p>Price ascending</p>
                    <Radio click={''}/>
                    
                  </div>
                  <div className={style.sBItem}>
                    <p>Price descending</p>
                    <Radio click={''} />
                    
                  </div>
                </div>
              </div>
              {isLoading ? (
                <div className={style.loaderBx}>
                  <Loader />
                </div>
              ) : (
                <div className={style.itemsContainer}>
                  {data?.length > 0 ? (
                    !isLoading ? (
                      <>
                        <div className={style.itemsContent}>
                          {data?.map((nft: any) => {
                            return (
                              (nft?.id && nft?.url) && (
                                <div className={style.itemBx} key={nft.id}>
                                  <ItemCard nftData={nft} />
                                </div>

                              )

                            );
                          })}
                          
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
            <div ref={interDemo}></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Explore;


const Radio=(props:any)=>{

  return(
    <div className={style.pbRadio} onClick={props.click}>
      
      {props.on &&<div className={style.checkmark}>
        
      </div>}
    </div>
  )
}