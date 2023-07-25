import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap, Expo } from "gsap";
//import { ThemeContext } from '../../context/ThemeContext'
// import { AuthContext } from '../../context/AuthContext'
import style from "./Create.module.scss";
import Header from "../../components/Header/Header";
//import Flow from './assets/fl.png'
import Eth from './assets/eth.svg'
import Polygon from './assets/profile.svg'
import Binance from './assets/binance.svg'
import Skale from './assets/skale.svg'
import Solana from './assets/sol.svg'
import Multiple from './assets/multiple.svg'
import Container from '../../components/Container/Container'
import Switch from '../../components/Modals/Switch'
import UpdatePrompt from '../../components/Modals/UpdatePrompt/UpdatePrompt'
import { useTranslation } from "react-i18next";
import globals from '../../utils/globalVariables'
import { ChainContext } from "src/context/chain";
import { toast } from "react-hot-toast";
import { UserContext } from "src/context/UserContext";


const CreateItemOptions = () => {
  const {chain, setChain} = useContext(ChainContext)
  console.log(chain);
  const [selctedcChain, setSChain] = useState('')

  const currentChain = sessionStorage.getItem('chain')
  const [showModal, setShowModal] = useState<any>()
  const [showPrompt, setShowPrompt] = useState(false)
  const [blockChain, setBlockChain] = useState<any>()
  //console.log(currentChain, "<<<<<")
  // const [themeState] = useContext<any>(ThemeContext)
  // const dark = themeState.dark
  // const [authState] = useContext<any>(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);

    const heroTitle = document.getElementById("heroTitle");
    const heroTitle2 = document.getElementById("heroTitle2");
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
    tl.to(heroTitle2, {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })

  }, [])

  const checkNetwork = (network: any) => {
    // const verified = authState.user.email_verified
    //if (verified === 1) {
    if (network === 'eth') {
      if (currentChain === globals.mainnetEth.chainId) {
        setChain(network)
      } else {
        setBlockChain("Ethereum")
        setShowModal(true)
      }
    }
    if (network === 'binance') {
      console.log(currentChain, globals.testnetBsc.chainId);
      
      if (currentChain === globals.testnetBsc.chainId) {
        setChain('0x61')
      } else {
        setBlockChain("Binance")
        setShowModal(true)
      }
    }
   
  }

  const closeModal = () => {
    setShowModal(false)
  }
  const closePrompt = () => {
    setShowPrompt(false)
  }


  const { t } = useTranslation();
  const {userState,setUserState}=useContext(UserContext)
  const [chose,setCreate]=useState(true)
  return (
    <>
      {/* {showPrompt && <UpdatePrompt closePrompt={closePrompt} />} */}
    {
        chose && <div className={style.createOptions}>
        
            <div
              //className={style.cOptContent2}
              className={`${style.cOptContent2} animate__animated animate__fadeIn `}>
              <div className={style.cOptTop2}>
                <h1>
                  <span id="heroTitle">{t("Choose Collectible")}</span>{" "}
                </h1>
                <p>
                <span> Create an NFT or Collection to get started</span>{" "}
                </p>
              </div>
              <div
                className={`${style.cOptBody} animate__animated animate__fadeInUp animate__delay-1s`}>
                <div className={style.optBoxes2}>
                  <div
                  //  href={undefined}
                   onClick={()=>setCreate(!chose)}
                    className={style.optBox2}>
                    <img className={style.tImg} src={Polygon} alt="single" />
                    <p>NFT</p>
                  </div>
                  <Link
                    to={`/collections`}
                    className={`${style.optBox2} `}
                  >
                    <img className={style.tImg} src={Multiple} alt="single" />
                    <p>Collection</p>
                  </Link>
                </div>
              </div>
            </div>
          
        </div >
    }
      {/* <Header /> */}
      <Container>
        {showModal && (
          <Switch closeModal={closeModal} blockChain={blockChain} />
        )}
        {showPrompt && <UpdatePrompt closePrompt={closePrompt} />}

       {!chose&& <div className={style.createOptions}>
          {selctedcChain === "" ? (
            <div className={style.cOptContent1}>
              <div className={style.cOptTop}>
                <h1>
                  <span id="">Choose Blockchain</span>{' '}
                </h1>
                <p>
                  <span id="">Select  the most suitable blockchain to create your collection. You need to sign in to create.
                  </span>{' '}
                </p>
              </div>
              <div
                className={`${style.cOptBody} animate__animated animate__fadeInUp animate__delay-1s`}>
                <div className={style.optBoxes}>

                  
                    {
                      chain?.map((chain: any) => (
                        <div
                          className={`${style.optBox} `}
                          onClick={() => {
                            if (userState?.user?.email){
                            if (currentChain === chain.chain) {
                              setSChain(chain.chain)
                             
                            } else {
                              //alert("Switch to binance chain")
                              toast.error(`Switch to Selected chain`,
                                {
                                  duration: 3000,
                                }
                              )
                            }
                          }
                          else setShowPrompt(!showPrompt)
                          }
                          }
                        >
                          <img src={chain?.image} alt={chain.chain} />
                          <p>{chain?.name}</p>
                        </div>
                      ))
                  
                  }
              
                
                </div>
              </div >
            </div >
          ) : (
            <div
              //className={style.cOptContent2}
              className={`${style.cOptContent2} animate__animated animate__fadeIn `}>
              <div className={style.cOptTop2}>
                <h1>
                  <span id="heroTitle">{t("Choose Collectible")}</span>{" "}
                </h1>
                <p>
                  <span>{t("Select")}</span>{" "}
                </p>
              </div>
              <div
                className={`${style.cOptBody} animate__animated animate__fadeInUp animate__delay-1s`}>
                <div className={style.optBoxes2}>
                  <Link
                    to={`/createItem/${selctedcChain}/single`}
                    className={style.optBox2}>
                    <img className={style.tImg} src={Polygon} alt="single" />
                    <p>{t("Single")}</p>
                  </Link>
                  {/* <Link
                    to={`/createItem/${selctedcChain}/multiple`}
                    className={`${style.optBox2} `}
                  >
                    <img className={style.tImg} src={Multiple} alt="single" />
                    <p>{t("Multiple")}</p>
                  </Link> */}
                </div>
              </div>
            </div>
          )}
        </div >}
      </Container >
    </>
  );
};

export default CreateItemOptions;
