import React from 'react'
import style from './Header.module.scss'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import Logo from './assets/logoA.svg'
import Logo2 from './assets/logoA-light.svg'
import { motion } from 'framer-motion'
// import Hamburger from './assets/hamburger-dark.svg'
// import Hamburger2 from './assets/menu2.svg'
import Moon from './assets/moon.svg'
import Sun from './assets/sun.svg'
import './menu.css'
import ConnectWallet2 from '../ConnectWallet/ConnectWalletM'
//import Footer from '../Footer/Footer'

const HeaderMobile = () => {
  const currentAccount = localStorage.getItem('currentAccount')
  const [themeState, setThemeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  //const navigate = useNavigate()
  const [showMenuList, setshowMenuList] = useState(false)
  const [showConnect, setShowConnect] = useState(false)
  const [showMConnect, setShowMConnect] = useState(false)

  useEffect(() => {
    // When the user scrolls down Xpx from the top of the page, add styles to the navbar
    window.onscroll = function () {
      scrollFunction()
    }
    const scrollFunction = () => {
      const header: any = document.getElementById('containerM')
      const wrap: any = document.getElementById('menuwrap')
      if (window.scrollY > 50) {
        header.classList.add(style.containerScroll)
        wrap.classList.add('menu-wrap2')
      } else {
        header.classList.remove(style.containerScroll)
        wrap.classList.remove('menu-wrap2')
      }
    }
  }, [])

  const handleTheme = () => {
    // change theme
    if (themeState.dark === 'false') {
      setThemeState({
        dark: 'true',
      })
    } else {
      setThemeState({
        dark: 'false',
      })
    }
  }
  const handleModal = () => {
    setShowConnect(!showConnect)
    setShowMConnect(!showMConnect)
  }
  const handleMConnect = () => {
    setShowMConnect(!showMConnect)
  }

  return (
    <>

      <div className={style.headerM}>
        <div
          className={`${style.containerM} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
            }`}
          id="containerM"
        >
          {showMConnect && (
            <div>
              <ConnectWallet2
                handleModal={handleModal}

                showConnect={showConnect}
                showMConnect={showMConnect}
              //handleClose={handleClose}
              />
            </div>
          )}
          <div className={style.contentM}>
            <Link to="/" className={style.logoBoxM}>
              <img src={dark === 'true' ? Logo2 : Logo} alt="logo" />
            </Link>
            {/* <div className={style.iconBoxM}> */}
            {/* <div className={style.hamBox}>
              <img
                src={dark === 'true' ? Hamburger2 : Hamburger}
                alt="hamburger"
                onClick={handleTheme}
              />
            </div> */}
            {/* <div className={style.themeImg} onClick={handleTheme}>
              <img src={dark === 'true' ? Sun : Moon} alt="change theme" />
            </div> */}
            {/* </div> */}

            {/* Mobile Menu */}
            <div className="menu-wrap" id="menuwrap">
              <input
                type="checkbox"
                className="toggler"
                onChange={() => setshowMenuList(!showMenuList)}
              />
              <div className="hamburger">
                <div className={`${dark === 'true' ? 'dark2' : 'light2'}`}></div>
              </div>
              <div className="menu showMenuX">
                {/* <div className="menuClose"> */}
                {/* <img className="menuClose" src={Close} alt="close" /> */}
                {/* </div> */}

                <div
                  className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
                >
                  <div>
                    {showMenuList && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: {
                            opacity: 0,
                            scale: 0.2,
                          },
                          visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                              delay: 0.4,
                              duration: 0.4,
                            },
                          },
                        }}
                        className={style.themeImg2}
                        onClick={handleTheme}
                      >
                        <img
                          src={dark === 'true' ? Sun : Moon}
                          alt="change theme"
                        />
                      </motion.div>
                    )}
                    {showMenuList && (
                      <ul>
                        <motion.li
                          //className={style.disabled}
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {
                              opacity: 0,
                              scale: 0.2,
                            },
                            visible: {
                              scale: 1,
                              opacity: 1,
                              transition: {
                                delay: 0.6,
                                duration: 0.4,
                              },
                            },
                          }}
                        >
                          <Link to="/explore">Explore</Link>
                        </motion.li>
                        {currentAccount && (
                          <motion.li
                            //className={style.disabled}
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {
                                opacity: 0,
                                scale: 0.2,
                              },
                              visible: {
                                scale: 1,
                                opacity: 1,
                                transition: {
                                  delay: 0.8,
                                  duration: 0.4,
                                },
                              },
                            }}
                          >
                            <Link to="/createOptions">Create</Link>

                          </motion.li>
                        )}
                        <motion.li
                          //className={style.disabled}
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {
                              opacity: 0,
                              scale: 0.2,
                            },
                            visible: {
                              scale: 1,
                              opacity: 1,
                              transition: {
                                delay: 0.8,
                                duration: 0.4,
                              },
                            },
                          }}
                        >
                          <Link to="/rewards">Rewards</Link>
                        </motion.li>

                        <motion.li
                          //className={style.disabled}
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {
                              opacity: 0,
                              scale: 0.2,
                            },
                            visible: {
                              scale: 1,
                              opacity: 1,
                              transition: {
                                delay: 1,
                                duration: 0.4,
                              },
                            },
                          }}
                        >
                          <Link to="/about">About</Link>
                        </motion.li>
                        {currentAccount && (
                          <>
                            <motion.li
                              //className={style.disabled}
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  scale: 0.2,
                                },
                                visible: {
                                  scale: 1,
                                  opacity: 1,
                                  transition: {
                                    delay: 0.8,
                                    duration: 0.4,
                                  },
                                },
                              }}
                            >
                              <Link to="/profile">Profile</Link>

                            </motion.li>
                            <motion.li
                              //className={style.disabled}
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  scale: 0.2,
                                },
                                visible: {
                                  scale: 1,
                                  opacity: 1,
                                  transition: {
                                    delay: 1,
                                    duration: 0.4,
                                  },
                                },
                              }}
                            >
                              <Link to="/collections">My Collections</Link>

                            </motion.li>
                          </>
                        )}
                        <motion.li
                          className={style.connectBtnMobile}
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {
                              opacity: 0,
                              scale: 0.2,
                            },
                            visible: {
                              scale: 1,
                              opacity: 1,
                              transition: {
                                delay: 1.2,
                                duration: 0.4,
                              },
                            },
                          }}
                        >

                          {!currentAccount ? (
                            <div
                              className={`${style.btnM} ${dark === 'true' ? 'yellowBtn' : 'blueBtn'
                                }`}
                              //onClick={() => setShowConnect(!showConnect)}
                              onClick={handleMConnect}
                              id="showIconM"
                            >
                              Connect wallet
                            </div>) : (
                            <div
                              className={`${style.btnM} ${dark === 'true' ? 'yellowBtn' : 'blueBtn'
                                }`}
                              //onClick={() => setShowConnect(!showConnect)}
                              onClick={handleMConnect}
                              id="showIconM"
                            >
                              My wallet
                            </div>
                          )}
                        </motion.li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* .... */}
          </div>
        </div>
      </div></>
  )
}
export default HeaderMobile
