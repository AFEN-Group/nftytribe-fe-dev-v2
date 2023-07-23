import { useContext, useEffect } from "react";
import useState from 'react-usestateref'
import { ThemeContext } from "../../context/ThemeContext";
//import { motion } from 'framer-motion'
import { Link } from "react-router-dom";
// import Header from "../../components/Header/Header";
import style from "./Staking.module.scss";
import { round } from "mathjs";
import arrow1 from "./assets/arrow1.svg";
import arrow2 from "./assets/arrow2.svg";
import arrow3 from "./assets/arrow3.svg";
import arrow4 from "./assets/arrow4.svg";
import useStaking from "../../hooks/staking";
//import Loader from '../../components/Loader/Loader'
import { CircularProgress } from '@material-ui/core'
import Switch from '../../components/Modals/Switch'
import toast from 'react-hot-toast'
import Web3 from "web3";

const Staking = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  const [isLoading, setIsLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const [err, setErr] = useState("")
  const currentChain = localStorage.getItem('chain')
  const [showModal, setShowModal] = useState<any>()
  const [blockChain, setBlockChain] = useState<any>()
  const [userInput, setUserInput, userInputRef] = useState({
    stake: "",
    unstake: "",
  });
  interface customEvent {
    target: {
      name: string;
      value: any;
    };
  }
  const handleInput = (e: customEvent) => {
    // setState({
    //   ...state,
    //   [e.target.name]: e.target.value,
    // });

    setValidated(false)
    const { name, value } = e.target

    let letters = /[a-zA-Z]/
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
    let dots = value.match(/\./g)
    if (
      letters.test(value) ||
      specialChars.test(value) ||
      dots?.length >= 2
    ) {
      //console.log(value)
    } else {
      setUserInput({
        ...userInput,
        [name]: value,
      })
    }
    if (
      userInputRef.current.unstake !== '' ||
      userInputRef.current.stake !== ''
    ) {
      setValidated(true)
    }
  }
  
  const [themeState] = useContext<any>(ThemeContext);
  const dark = themeState.dark;
  const [option, setOption] = useState("stake");
  const { getStatistics,statistics, responses, loading, stake, collectReward, unstake,PanicUnstake, loadedStats } =
    useStaking();


  const closeModal = () => {
    setShowModal(false)
  }
  console.log(statistics?.reward);
  
  const walletAddress: any = sessionStorage.getItem('currentAccount')
  const handleStake = async () => {
    if (walletAddress) {
      if (userInput.stake !== '') {
        if (currentChain === "0x38") {
          //setChain(network)
          setErr("")
          setIsLoading(true)
          try {
            const stakeFunction = await stake(userInput.stake)
            console.log(stakeFunction)
          } catch (err) {
            console.log(err)
          }
          finally {
            getStatistics()
          }

          setIsLoading(false)
        } else {
          setBlockChain("Binance")
          setShowModal(true)
        }
      } else {
        setErr('Please enter a value')
      }
    } else {
      toast.error(`Please connect your wallet`,
        {
          duration: 5000,
        }
      )
    }
  }
  // console.log(statistics);
  

  const handleWithdraw = async () => {
    console.log('yes');
    // setUnstakeModal(!unstakeModal)
    if (parseInt(statistics.userStakeData.stake) < parseInt(userInput.unstake)) {
      setStakingError({ error: true, type: 'unstaking' })
      console.log('not');
    }
    else{ 
    if (walletAddress) {
      if (userInput.unstake !== '' && Number(userInput.unstake) !== 0) {
        if (userInput.unstake <= statistics?.unstakable) {
          if (currentChain === "0x38") {
            //setChain(network)
            setErr("")
            setIsLoading(true)
            try {
              const unstakeFunction = await unstake(userInput.unstake)
              console.log(unstakeFunction)
              //console.log(loading.errMsg)
            } catch (err) {
              console.log(err)
            }
            finally {
              getStatistics()
            }
            setIsLoading(false)
          } else {
            setBlockChain("Binance")
            setShowModal(true)
          }
        } else {
          setUnstakeModal(!unstakeModal)
        
        }
      } else {
        setErr('Please enter a value')
      }
    } else {
      toast.error(`Please connect your wallet`,
        {
          duration: 5000,
        }
      )
    }}
  }
  const handlePanic = async () => {
    setUnstakeModal(!unstakeModal)
    if(parseInt(statistics.userStakeData.stake)<parseInt(userInput.unstake)){
      setStakingError({error:true,type:'unstaking'})
    }
    
  else{
      if (walletAddress) {
        if (userInput.unstake !== '' && Number(userInput.unstake) !== 0) {

          if (currentChain === "0x38") {
            console.log('yes');
            
            setErr("")
            setIsLoading(true)
            try {

              const unstakeFunction = await PanicUnstake(userInput.unstake)
              console.log(unstakeFunction)
              //console.log(loading.errMsg)
            } catch (err) {
              console.log(err)
            }
            finally {
              getStatistics()
            }
            setIsLoading(false)
          } else {
            console.log('no');
            setBlockChain("Binance")
            setShowModal(true)
          }

        } else {
          setErr('Please enter a value')
        }
      } else {
        toast.error(`Please connect your wallet`,
          {
            duration: 5000,
          }
        )
      }
  }
   
  }

  const [unstakeModal,setUnstakeModal]=useState(false)
  const [closed,setClosed]=useState(false)
  const [stakingError,setStakingError]=useState({error:false,type:''})
    console.log(statistics);
  return (
    <>
   
      {/* {showModal && (
        <Switch closeModal={closeModal} blockChain={blockChain} />
      )} */}
      {
        unstakeModal && <Switch
        button={'Unstake'} message=
        {'Your staked tokens are locked for 12 months .\n\nNote that Emergency unstake will attract a 5% fee on token withdrawal.'} closeModal={()=>setUnstakeModal(!unstakeModal)} clicked={handlePanic} header={'Hi there'}/>
      }
      {
        stakingError.error  && <Switch
          button={'Unstake'} message=
          {'Insufficient Tokens'} closeModal={() => setStakingError({...stakingError,error:!stakingError.error})} clicked={() => setStakingError({...stakingError,error:!stakingError.error})} header={'Hi there'} />
      }
      {
        closed && <Switch
          button={'Close'} message=
          {'Staking is Closed for now'} closeModal={() => setClosed(!closed)} clicked={() => setClosed(!closed)} header={'Hi there'} />
      }
      <div
        className={`${style.container} ${dark === "true" ? "darkTheme" : "lightTheme"
          }`}>
        <div className={style.content}>
          <Link to="/rewards" className={style.backBx}>
            <img src={dark === "true" ? arrow2 : arrow1} alt="back" />
            <p className={dark === "true" ? "lightTxt" : "blueTxtDark"}>Back</p>
          </Link>

          <div
            className={`
                    ${style.mainBx}
                    ${dark === "true" ? style.darkBg : style.lightBg}
                    `}>
            <div className={style.top}>
              {/* {loadedStats && ( */}
              <div className={style.afenPrice}>
                <span>1 Afen</span>-
                <p>${statistics && round(statistics.usdPrice, 4)}</p>
              </div>
              {/* )} */}
              <div className={style.buyBtn}>
                <button
                  className={`
                                ${style.buyAfen}
                               
                                `}>
                  Buy Afen
                  <img src={dark === "true" ? arrow4 : arrow3} alt="stake" />
                </button>
              </div>
            </div>
            {/* {loadedStats && ( */}
            <div className={style.body}>
              <h2>Statistics</h2>
              <div className={style.statsBx}>
                <div className={style.statItems}>
                  {/* <div className={style.statSingle}>
                    <h3>Stake</h3>
                    <p>{statistics?.hint.stake} Afen</p>
                  </div>
                  <div className={style.statSingle}>
                    <h3>Earn</h3>
                    <p>{statistics && round(statistics.hint.earn, 1)} Afen</p>
                  </div> */}
                  <div className={style.statSingle}>
                    <h3>Est APY</h3>
                    <p>{statistics && round(statistics.apy, 1)}%</p>
                  </div>
                  <div className={style.statSingle}>
                    <h3>Afen staked in vault</h3>
                    <p>{ statistics && round(statistics?.totalStakedInVault,2)}</p>
                  </div>
                  <div className={`${style.statSingle} ${style.lst}`}>
                    <h3>TVL (USDT)</h3>
                    <p>${statistics && round(statistics.tvl, 3)}</p>
                  </div>
                </div>
                {/* <div className={style.statTitles}>
                                    <p>Stake</p>
                                    <p>Earn</p>
                                    <p>Est APY</p>
                                    <p>Afen staked in vault</p>
                                    <p className={style.lst}>TVL (USDT)</p>
                                </div>
                                <div className={style.statItems}>
                                    <p>4 Afen</p>
                                    <p>10 Afen</p>
                                    <p>19%</p>
                                    <p>1000</p>
                                    <p className={style.lst}>1000</p>
                                </div> */}
              </div>
            </div>
            {/* )} */}
            <div className={style.btm}>
              <div className={style.btmLeft}>
                <div className={style.btmLeftTabs}>
                  <p

                    onClick={() => setOption("stake")}
                    className={option === "stake" ? style.active : ""}>
                    Stake 
                  </p>
             
                  <p
                    onClick={() => setOption("withdraw")}
                    className={`${style.mgLeft} ${option === "withdraw" ? style.active : ""
                      }`}>
                   Unstake

                  </p>
                </div>
                <div className={style.btmBx1}>
                  {option === "stake" && (
                    <>
                      <p className={style.bal}>
                        wallet balance:{" "}
                        <span>
                          {" "}
                          {statistics &&
                            statistics?.unstakable &&
                            round(statistics.balance, 3)}{" "}
                          Afen
                        </span>
                      </p>
                    <div className={style.box1Content}>
              

                      <input
                        type="text"
                        onChange={handleInput}
                        value={userInput.stake}
                        name="stake"
                        placeholder="Enter amount"

                      />
                      {/* <p className={style.inputLabel}>(BSC)</p> */}
                      <button onClick={
                        ()=>setClosed(true)
                        // handleStake
                      }
                        disabled={isLoading || !validated}>
                        {!isLoading ? (
                          'Stake'
                        ) : (
                          <CircularProgress color="inherit" size="20px" />
                        )}
                      </button>
                      {err !== "" && (
                        <p className="redtxt">{err}</p>
                      )}
                    </div>
                    </>
                  )}
                  {option === "withdraw" && (
                    <>
                      <p className={style.bal}>
                        Staked bal:{" "}
                        <span>
                          {" "}
                          {statistics &&
                            statistics?.unstakable &&
                            round(statistics.unstakable, 3)}{" "}
                          Afen
                        </span>
                      </p>
                      <div className={style.box1Content}>
                        <input
                          type="text"
                          name="unstake"
                          onChange={handleInput}
                          value={userInput.unstake}
                          placeholder="Enter amount"
                        />
                        {/* <p className={style.inputLabel}>(BSC)</p> */}
                        <button
                          disabled={isLoading || !validated}
                          onClick={handleWithdraw}>
                         Unstake
                        </button>
                        {err !== "" && (
                          <p className="redtxt">{err}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className={style.btmRight}>
                <h2>Rewards</h2>
                <div className={style.btmBx2}>
                  <p >
                    Stake -{" "}
                   {statistics &&
                      statistics.userStakeData &&
                      Web3.utils.fromWei(statistics.userStakeData.stake, 'ether')}{" "}
                    Afen
                  </p>
                  <p style={{ display: 'flex',alignItems:"center" }}>
                    Reward -{" "}
                  <span style={{fontSize:'0.8em'}}>
                    {statistics &&
                      round(statistics.userStakeData &&
                      statistics.reward,6) }{" "}
                    </span>
                    Afen
                  </p>
                  {statistics &&
                    statistics.userStakeData &&
                    statistics.reward>0  && (
                      <>
                        {" "}
                        <h3>+{statistics && round(statistics.apy)}% APY</h3>
                        <button
                          onClick={()=>collectReward()
                }>
                          Claim reward
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
