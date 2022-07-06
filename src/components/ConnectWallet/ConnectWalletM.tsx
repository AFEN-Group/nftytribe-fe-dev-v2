import { useEffect, useState, useContext } from 'react'
import { gsap, Power3 } from 'gsap'
//import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import WalletContext from '../../context/WalletContext'
import { shortenAddress } from '../../utils/formatting'
import style from './ConnectWallet.module.scss'
import { motion } from 'framer-motion'

import Cancel from './assets/x.svg'
import Cancel2 from './assets/x2.svg'
import User from './assets/profile.svg'
import User2 from './assets/profile2.svg'
import Metamask from './assets/metamask.svg'
import Wc from './assets/wc.svg'
import Coinbase from './assets/coinbase.svg'
import Check from './assets/check.svg'
import Check2 from './assets/check2.svg'
import Add from './assets/add.svg'
import SwapH from './assets/swaph.svg'
import Afen from './assets/afen.svg'
import BNB from './assets/bnb.svg'
import Swap from './assets/swap01.svg'
import Swap2 from './assets/swap02.svg'

const ConnectWalletM = (props: any) => {
    const [userInput, setUserInput] = useState<any>({
        value1: '',
        value2: '',
    })
    //const [userState, setUserState] = useContext<any>(UserContext)
    //const currentAccount = userState.userWallet
    //console.log(currentAccount)
    const {
        connectToMetaMask,
        disableEthereum,
        walletError,
        enableWalletConnect,
        disconnectWalletConnect
    } = useContext<any>(WalletContext)
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    // current view
    const [view, setView] = useState('wallet')
    //swap states
    const [afenSwap, setAfenSwap] = useState(true)
    //const [currentAccount, setCurrentAccount] = useState('')
    const currentAccount = localStorage.getItem('currentAccount')
    const userObj = localStorage.getItem('user')
    const numberInputHandler = async (event: any) => {
        const valueFiltered = event.target.value.replace(/\D/g, '')
        setUserInput({
            ...userInput,
            [event.target.name]: valueFiltered,
        })
    }
    useEffect(() => {
        const t1 = gsap.timeline({ paused: true })
        let box: any = document.getElementById('box')
        let overlay: any = document.getElementById('overlay')
        let icon: any = document.getElementById('showIcon')
        //let iconM: any = document.getElementById('showIconM')
        let show2: any = document.getElementById('show2')
        let close: any = document.getElementById('close')
        if (document.getElementById('showBtn')) {
            let btn: any = document.getElementById('showBtn')
            btn.onclick = function () {
                t1.reversed(!t1.reversed())
                overlay.classList.toggle(style.overlay)
            }
        }
        icon.onclick = function () {
            t1.reversed(!t1.reversed())
            overlay.classList.toggle(style.overlay)
        }
        if (document.getElementById('showIconM')) {
            let iconM: any = document.getElementById('showIconM')
            iconM.onclick = function () {
                t1.reversed(!t1.reversed())
                overlay.classList.toggle(style.overlay)
            }
        }

        if (!currentAccount) {
            show2.onclick = function () {
                t1.reversed(!t1.reversed())
                overlay.classList.toggle(style.overlay)
            }
        }
        t1.to(box, 0.001, {
            right: 0,
            ease: Power3.easeInOut,
        })
        t1.reverse()

        // if (props.showConnect) {
        overlay.onclick = function () {
            t1.reversed(!t1.reversed())
            overlay.classList.toggle(style.overlay)
        }
        close.onclick = function () {
            t1.reversed(!t1.reversed())
            overlay.classList.toggle(style.overlay)
        }
        //}
    }, [])
    // const showM = () => {
    //   const t1 = gsap.timeline({ paused: true })
    // }
    const handleSignOut = async () => {
        disableEthereum()
        disconnectWalletConnect()
        props.handleModal()
    }
    const handleSignIn = async () => {
        props.handleModal()
        connectToMetaMask()
        props.handleModal()
    }
    const handleSignIn2 = async () => {
        props.handleModal()
        enableWalletConnect()
        props.handleModal()
    }

    // const handleSignOut = async () => {
    //   //disableEthereum()
    //   // setCurrentAccount('')
    //   //localStorage.setItem('currentAccount', '')
    //   setUserState({
    //     ...userState,
    //     userWallet: '',
    //   })
    //   props.handleModal()
    //   window.location.reload()
    // }
    // const handleSignIn = async () => {
    //   // setCurrentAccount('0x3bc4aa..')
    //   // localStorage.setItem('currentAccount', '0x3bc4aa..')
    //   // connectToMetaMask()
    //   //props.handleModal()
    //   setUserState({
    //     ...userState,
    //     userWallet: '0x3bc4aa..',
    //   })
    //   props.handleModal()
    //   window.location.reload()
    // }
    const walletType = localStorage.getItem("walletType")


    return (
        <>
            <div className={`${style.container}`}>
                <div className={style.content}>
                    <div onClick={props.handleModal} id="overlay"></div>
                    <motion.div
                        //className={style.box}
                        className={`${style.box} ${dark === 'true' ? 'lBdark2' : 'lightTheme'
                            }`}
                        id="box"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {
                                //opacity: 0,
                                x: 800,
                            },
                            visible: {
                                x: 0,
                                //opacity: 1,
                                transition: {
                                    delay: 0,
                                    duration: 0.4,
                                },
                            },
                        }}
                    >
                        {currentAccount ? (
                            <div className={style.top}>
                                <div className={style.topLeft}>
                                    <img src={dark === 'true' ? User2 : User} alt="user" />{' '}
                                    <p className={style.addy}>
                                        {shortenAddress(currentAccount)}

                                        <br />
                                        <span>
                                            {/* <Link
                        className={`${
                          dark === 'true' ? 'lightTxt' : 'darkTxt'
                        }`}
                        to="/profile"
                      >
                        View Profile
                      </Link> */}
                                            Connected
                                        </span>
                                    </p>
                                </div>
                                <div className={style.topRight}>
                                    {/* <button>Connected</button> */}
                                    <img
                                        src={dark === 'true' ? Cancel2 : Cancel}
                                        alt="cancel"
                                        onClick={props.handleModal}
                                        id="close"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={style.top}>
                                <div className={style.topLeft}>
                                    <img src={dark === 'true' ? User2 : User} alt="user" />{' '}
                                    <p>Connect Wallet</p>
                                </div>
                                <div className={style.topRight}>
                                    <img
                                        src={dark === 'true' ? Cancel2 : Cancel}
                                        alt="cancel"
                                        onClick={props.handleModal}
                                        id="close"
                                    />
                                </div>
                            </div>
                        )}
                        {currentAccount ? (
                            <div className={style.body}>
                                <div className={style.bodyTxt}></div>
                                {view === 'wallet' && (
                                    <>
                                        <div className={style.wallets}>
                                            <div className={style.activeWallet}>
                                                <div className={style.awleft}>
                                                    <img src={walletType === "MetaMask" ? Metamask : Wc} alt="wallet" />
                                                    <div className={style.awInfo}>
                                                        <h3>{shortenAddress(currentAccount)}</h3>

                                                        <p>Ethereum</p>
                                                    </div>
                                                </div>
                                                <div className={style.awRight}>
                                                    <img
                                                        src={dark === 'true' ? Check2 : Check}
                                                        alt="check"
                                                    />
                                                    <p>0.00</p>
                                                </div>
                                            </div>
                                            {/* <div className={style.activeWallet}>
                        <div className={style.awleft}>
                          <img src={Wc} alt="wallet" />
                          <div className={style.awInfo}>
                            <h3>{shortenAddress(currentAccount)}</h3>

                            <p>Polygon</p>
                          </div>
                        </div> */}
                                            {/* <div className={style.awRight}> */}
                                            {/* <img src={dark === 'true' ? Check2 : Check} alt="check" /> */}
                                            {/* <p>0.00</p>
                        </div> */}
                                            {/* </div> */}
                                        </div>
                                        {/* <div className={style.swapOptions}>
                                            <div className={style.swOption}>
                                                <img src={Add} alt="add" />
                                                <p>Add Funds</p>
                                            </div>
                                            <div
                                                className={`${style.swOption} disabled`}
                                                onClick={(e) => setView('swap')}
                                            >
                                                <img src={SwapH} alt="swap" />
                                                <p>Swap</p>
                                            </div>
                                        </div> */}
                                    </>
                                )}

                                {view === 'wallet' && (
                                    <div
                                        className={style.signOutM}
                                        onClick={handleSignOut}
                                    //onClick={() => setCurrentAccount('')}
                                    >
                                        Sign Out
                                    </div>
                                )}

                                {view === 'swap' && (
                                    <div className={style.swapBox}>
                                        <div className={style.swapTop}>
                                            <h3>Swap</h3>
                                            <p
                                                className={dark === 'true' ? 'lightTxt' : 'blueTxt'}
                                                onClick={() => setView('wallet')}
                                            >
                                                Cancel
                                            </p>
                                        </div>

                                        <div className={style.sInput}>
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'
                                                    } 
                       ${dark === 'true' ? 'lightTxt' : 'darkTxt'}`}
                                                onChange={numberInputHandler}
                                                //name={afenSwap ? 'value1' : 'value2'}
                                                name="value1"
                                                value={userInput.value1}
                                            //value={afenSwap ? userInput.value1 : userInput.value2}
                                            />
                                            <div className={style.sInfo}>
                                                <img src={afenSwap ? Afen : BNB} alt="afen" />
                                                <p>{afenSwap ? 'Afen' : 'BNB'}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={style.swapIcon}
                                            onClick={() => setAfenSwap(!afenSwap)}
                                        >
                                            <img src={dark === 'true' ? Swap2 : Swap} alt="swap" />
                                        </div>
                                        <div className={style.sInput}>
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'
                                                    } ${dark === 'true' ? 'lightTxt' : 'darkTxt'}`}
                                                onChange={numberInputHandler}
                                                //name={afenSwap ? 'value2' : 'value1'}
                                                name="value2"
                                                value={userInput.value2}
                                            //value={afenSwap ? userInput.value2 : userInput.value1}
                                            />
                                            <div className={style.sInfo}>
                                                <img src={afenSwap ? BNB : Afen} alt="BNB" />
                                                <p>{afenSwap ? 'BNB' : 'Afen'}</p>
                                            </div>
                                            <div className={style.slippageTxt}>
                                                <p className={dark === 'true' ? 'lightTxt' : 'blueTxt'}>
                                                    Slippage Tolerance (%)
                                                </p>
                                                <p className={dark === 'true' ? 'lightTxt' : 'blueTxt'}>
                                                    0.5%
                                                </p>
                                            </div>
                                        </div>
                                        {/* <div className={style.swapBtn}>
                      <button>Add Funds</button>
                    </div> */}
                                    </div>
                                )}

                                {view === 'swap' && (
                                    <div
                                        className={style.reviewBtn}
                                        onClick={() => setView('review')}
                                    >
                                        Review Swap
                                    </div>
                                )}

                                {view === 'review' && (
                                    <div className={style.swapBox}>
                                        <div className={style.swapTop}>
                                            <p
                                                className={dark === 'true' ? 'lightTxt' : 'blueTxt'}
                                                onClick={() => setView('swap')}
                                            >
                                                Edit
                                            </p>
                                            <h3>Swap</h3>
                                            <p
                                                className={dark === 'true' ? 'lightTxt' : 'blueTxt'}
                                                onClick={() => setView('wallet')}
                                            >
                                                Cancel
                                            </p>
                                        </div>
                                        <div className={style.sReview}>
                                            <div className={style.swapValue}>
                                                <p>{userInput.value1}</p>
                                                <img src={afenSwap ? Afen : BNB} alt="token" />
                                                <p>{afenSwap ? 'Afen' : 'BNB'}</p>
                                            </div>
                                            <div className={style.swapIcon}>
                                                <img src={dark === 'true' ? Swap2 : Swap} alt="swap" />
                                            </div>
                                            <div className={style.swapValue}>
                                                <img src={afenSwap ? BNB : Afen} alt="token" />
                                                <p>{afenSwap ? 'BNB' : 'Afen'}</p>
                                            </div>
                                        </div>
                                        <div className={style.swapTotal}>
                                            <h1>10.5000000</h1>
                                            <p>1BNB - 248.956777777 Afen token</p>
                                        </div>
                                    </div>
                                )}
                                {view === 'review' && (
                                    <div className={style.reviewBtn}>Complete Swap</div>
                                )}
                            </div>
                        ) : (
                            <div className={style.body}>
                                <div className={style.bodyTxt}>
                                    <p className={`${dark === 'true' ? style.b1 : style.b2}`}>
                                        Connect with one of our wallet providers or{' '}
                                        {/* <span
                                            className={`${dark === 'true' ? 'yellowMain' : 'blueLight'
                                                }`}
                                        > */}
                                        Create{' '}
                                        {/* </span>{' '} */}
                                        a new one
                                    </p>
                                </div>

                                <div className={style.wallets}>
                                    <div className={style.wallet} onClick={handleSignIn}>
                                        <img src={Metamask} alt="metamask" />
                                        <p>Metamask</p>
                                    </div>

                                    <div className={style.wallet} onClick={handleSignIn2}>
                                        <img src={Wc} alt="wallet-connect" />
                                        <p>Wallet Connect</p>
                                    </div>
                                    <p className={style.err}>{walletError}</p>
                                    {/* <div className={style.wallet}>
                    <img src={Coinbase} alt="coinbase" />
                    <p>Coinbase Wallet</p>
                  </div> */}
                                    {/* <div className={style.wallet}>
                <button>Show More Options</button>
              </div> */}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default ConnectWalletM
