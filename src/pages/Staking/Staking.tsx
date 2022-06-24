import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
//import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import style from './Staking.module.scss'

import arrow1 from './assets/arrow1.svg'
import arrow2 from './assets/arrow2.svg'
import arrow3 from './assets/arrow3.svg'
import arrow4 from './assets/arrow4.svg'


const Staking = () => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    const [option, setOption] = useState('stake')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <div
                className={`${style.container} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
                    }`}
            >
                <div className={style.content}>
                    <Link to="/rewards" className={style.backBx}>
                        <img src={dark === 'true' ? arrow2 : arrow1} alt="back" />
                        <p className={dark === 'true' ? 'lightTxt' : 'blueTxtDark'}>Back</p>
                    </Link>

                    <div className={`
                    ${style.mainBx}
                    ${dark === 'true' ? style.darkBg : style.lightBg}
                    `}>
                        <div className={style.top}>
                            <div className={style.afenPrice}>
                                <span>1 Afen</span>
                                -
                                <p>$0.002</p>
                            </div>
                            <div className={style.buyBtn}>
                                <button className={`
                                ${style.buyAfen}
                               
                                `}
                                >
                                    Buy Afen
                                    <img src={dark === "true" ? arrow4 : arrow3} alt="stake" />
                                </button>
                            </div>
                        </div>
                        <div className={style.body}>
                            <h2>Statistics</h2>
                            <div className={style.statsBx}>
                                <div className={style.statItems}>
                                    <div className={style.statSingle}>
                                        <h3>Stake</h3>
                                        <p>4 Afen</p>
                                    </div>
                                    <div className={style.statSingle}>
                                        <h3>Earn</h3>
                                        <p>10 Afen</p>
                                    </div>
                                    <div className={style.statSingle}>
                                        <h3>Est APY</h3>
                                        <p>19%</p>
                                    </div>
                                    <div className={style.statSingle}>
                                        <h3>Afen staked in vault</h3>
                                        <p>1000</p>
                                    </div>
                                    <div className={`${style.statSingle} ${style.lst}`}>
                                        <h3>TVL (USDT)</h3>
                                        <p>1000</p>
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
                        <div className={style.btm}>
                            <div className={style.btmLeft}>
                                <div className={style.btmLeftTabs}>
                                    <p onClick={() => setOption("stake")}
                                        className={option === 'stake' ? style.active : ''}>
                                        Stake
                                    </p>
                                    <p onClick={() => setOption("withdraw")}
                                        className={`${style.mgLeft} ${option === 'withdraw' ? style.active : ''}`}>
                                        Withdraw
                                    </p>
                                </div>
                                <div className={style.btmBx1}>
                                    {option === 'stake' && (
                                        <div className={style.box1Content}>
                                            <input type="text" />
                                            <button>Stake</button>
                                        </div>
                                    )}
                                    {option === 'withdraw' && (
                                        <>
                                            <p className={style.bal}>Available bal: <span> 9 Afen</span></p>
                                            <div className={style.box1Content}>
                                                <input type="text" />
                                                <button>Withdraw</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={style.btmRight}>
                                <h2>Rewards</h2>
                                <div className={style.btmBx2}>
                                    <p>Stake - 8 Afen</p>
                                    <p>Reward - 1 Afen</p>
                                    <h3>+15% APY</h3>
                                    <button>Claim reward</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Staking
