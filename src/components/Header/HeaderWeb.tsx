import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { publicRequest } from '../../utils/requestMethods'
import { CircularProgress } from '@material-ui/core'
import style from './Header.module.scss'
import Logo from './assets/logo.svg'
import Logo2 from './assets/logo-light.svg'
import Search from './assets/search.svg'
import User from './assets/user.svg'
import User2 from './assets/User2.svg'
import Wallet from './assets/wallet.svg'
import Wallet2 from './assets/wallet2.svg'
// import Light from './assets/light.svg'
// import Dark from './assets/dark.svg'
import Profile from './assets/profile.svg'
import Settings from './assets/settings.svg'
import Language from './assets/lang.svg'
import Collection from './assets/collections.svg'
import Notification from './assets/notifications.svg'
import Moon from './assets/moon.svg'
import Sun from './assets/sun.svg'
//
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const HeaderWeb = (props: any) => {
  //const [isConnected, setIsConnected] = useState(false)
  const [showDropDown, setShowDropDown] = useState('None')
  const [showConnect, setShowConnect] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  //const [userState] = useContext<any>(UserContext)
  //const currentAccount = userState.userWallet
  const currentAccount = localStorage.getItem('currentAccount')
  const [themeState, setThemeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const navigate = useNavigate()
  // console.log(dark)

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
  const handleCreate = () => {
    if (currentAccount) {
      navigate('/createOptions')
    } else {
      //setShowModal(true)
    }
  }

  // Hide nav on scroll up and show on scroll down
  // useEffect(() => {
  //   let lastScrollTop = 0;
  //       const nav = document.getElementById(navBox)
  //       window.addEventListener("scroll", function(){
  //           let scrollTop = window.pageXOffset || document.documentElement.scrollTop;
  //           if(scrollTop > lastScrollTop){
  //               setNavStatus(style.navRemove)
  //           } else {
  //               setNavStatus(style.navOn)
  //           }
  //           lastScrollTop = scrollTop;
  //       })
  // }, [])

  useEffect(() => {
    // When the user scrolls down Xpx from the top of the page, add styles to the navbar
    window.onscroll = function () {
      scrollFunction()
    }
    const scrollFunction = () => {
      const header: any = document.getElementById('container')
      if (window.scrollY > 150) {
        header.classList.add(style.containerScroll)
      } else {
        header.classList.remove(style.containerScroll)
      }
    }
  }, [])

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true)
        try {
          const searchReq = await publicRequest.get(
            `/collections/search?search_term=${searchTerm}`,
          )
          console.log('REQ RESPONSE: ', searchReq.data.data.collections)
          //setSearchRes(searchReq1.data.concat(searchReq2.data))
          setSearchRes(searchReq.data.data.collections)
          setIsLoading(false)
        } catch (err) {
          console.log(' ERROR::: ', err)
        }
      } else {
        return
      }
    }
    handleSearch()
  }, [searchTerm])

  const handleModal = () => {
    setShowConnect(!showConnect)
  }

  return (
    <>
      <div
        className={style.section}
      // className={`${style.section} ${
      //   dark === 'true' ? 'darkTheme' : 'lightTheme'
      // }`}
      >
        <ConnectWallet
          handleModal={handleModal}
          showConnect={showConnect}
        //handleClose={handleClose}
        />
        <div
          //className={style.container}
          className={`${style.container} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
            }`}
          id="container"
          onMouseLeave={() => setShowDropDown('None')}
        >
          {!currentAccount ? (
            <div className={style.content}>
              <Link to="/" className={style.logoBox}>
                <img src={dark === 'true' ? Logo2 : Logo} alt="logo" />
              </Link>

              <div className={style.navBox}>
                {/* <Link to="/">
                  <p>Home</p>
                </Link> */}
                <Link to="/about">
                  <p>About us</p>
                </Link>
                <div id="show2" onClick={handleCreate}>
                  <p>Create</p>
                </div>
                <Link to="/explore">
                  <p>Explore</p>
                </Link>
                <Link to="/rewards">
                  <p>Rewards</p>
                </Link>
              </div>
              <div className={style.buttonsBox}>
                <div className={style.buttons}>
                  <div
                    className={`${style.btn} ${dark === 'true' ? 'yellowBtn' : 'blueBtn'
                      }`}
                    onClick={() => setShowConnect(!showConnect)}
                    id="showIcon"
                  >
                    Connect wallet
                  </div>
                </div>
                <div className={style.themeImg} onClick={handleTheme}>
                  <img src={dark === 'true' ? Sun : Moon} alt="change theme" />
                </div>
              </div>
            </div>
          ) : (
            <div className={style.contentFull}>
              <Link
                to="/"
                className={style.logoBox}
                onMouseOver={() => setShowDropDown('None')}
              >
                <img src={dark === 'true' ? Logo2 : Logo} alt="logo" />
              </Link>
              <div
                className={style.navBox}
                onMouseOver={() => setShowDropDown('None')}
              >
                <div className={style.navBoxItems}>
                  <Link to="/about">
                    <p>About us</p>
                  </Link>

                  <Link to="/explore">
                    <p>Explore</p>
                  </Link>
                  <Link to="/rewards">
                    <p>Rewards</p>
                  </Link>
                  <Link to="/createOptions">
                    <p>Create</p>
                  </Link>
                </div>
                <div className={style.searchBox}>
                  <input
                    type="text"
                    placeholder="Find collection"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <img src={Search} alt="search" />
                </div>
                {searchTerm?.length >= 3 && searchRes?.length < 1 && (
                  <div
                    //className="animate__animated animate__fadeIn navSearchRes"
                    className={`animate__animated animate__fadeIn animate__faster  ${style.searchResults
                      } ${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
                  >
                    <div >
                      <div
                        className={style.noResult}>
                        <p>
                          Sorry, no results were found
                        </p>

                      </div>
                    </div>
                  </div>
                )}
                {searchTerm?.length >= 3 && searchRes?.length >= 1 && (
                  <div
                    //className="animate__animated animate__fadeIn navSearchRes"
                    className={`animate__animated animate__fadeIn animate__faster  ${style.searchResults
                      } ${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
                  >
                    <div >
                      {isLoading ? (
                        <div className={style.ld}>
                          <CircularProgress color="inherit" size="25px" />
                        </div>
                      ) : (
                        <div >

                          {searchRes?.map((result: any) => (
                            <Link
                              to={`/collectionDetails/${result.contract_address}`}
                              className={style.searchSingle}
                              key={result.id}
                            >
                              <p>{result.title}</p>
                              <br></br>
                            </Link>
                            // <p>{result?.title}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
              <div className={style.buttonsBox}>
                <img
                  src={dark === 'true' ? User2 : User}
                  alt="user"
                  onMouseOver={() => setShowDropDown('Profile')}
                />
                <img
                  src={dark === 'true' ? Wallet2 : Wallet}
                  alt="wallet"
                  onClick={() => setShowConnect(!showConnect)}
                  onMouseOver={() => setShowDropDown('None')}
                  id="showIcon"
                />
                <div className={style.themeImg} onClick={handleTheme}>
                  <img src={dark === 'true' ? Sun : Moon} alt="change theme" />
                </div>
              </div>
              {showDropDown === 'Profile' && (
                <div
                  className={`animate__animated animate__fadeIn animate__faster  ${style.dropDown
                    } ${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
                  onMouseLeave={() => setShowDropDown('None')}
                >
                  <div className={style.dropContent}>
                    {/* <div className={style.dropTop}>
                      <div
                        //className={style.dropBtn1}
                        className={`${style.dropBtn1} ${
                          dark !== 'true' ? style.dropA : ''
                        }`}
                        onClick={handleTheme}
                      >
                        <p>Light</p>
                        <img src={Light} alt="light" />
                      </div>
                      <div
                        className={`${style.dropBtn2} ${
                          dark === 'true' ? style.dropA : ''
                        }`}
                        onClick={handleTheme}
                      >
                        <p>Dark</p>
                        <img src={Dark} alt="dark" />
                      </div>
                    </div> */}
                    <div className={style.dropBody}>
                      <Link to="/profile" className={style.dropItem}>
                        <img src={Profile} alt="profile" />
                        <p>Profile</p>
                      </Link>
                      <Link to="/collections" className={style.dropItem}>
                        <img src={Collection} alt="collection" />
                        <p>My collections</p>
                      </Link>
                      {/* <Link to="" className={style.dropItem}>
                        <img src={Language} alt="language" />
                        <p>Language</p>
                      </Link>
                      <Link to="/" className={style.dropItem}>
                        <img src={Notification} alt="notification" />
                        <p>Notifications</p>
                      </Link> */}
                      <Link to="/editProfile" className={style.dropItem}>
                        <img src={Settings} alt="settings" />
                        <p>Settings</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HeaderWeb
