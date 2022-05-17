import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import style from './Header.module.scss'
import Logo from './assets/logo.svg'
import Search from './assets/search.svg'
import User from './assets/user.svg'
import Wallet from './assets/wallet.svg'
import Light from './assets/light.svg'
import Dark from './assets/dark.svg'
import Profile from './assets/profile.svg'
import Settings from './assets/settings.svg'
import Language from './assets/lang.svg'
import Collection from './assets/collections.svg'
import Notification from './assets/notifications.svg'
//
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const HeaderWeb = (props: any) => {
  //const [isConnected, setIsConnected] = useState(false)
  const [showDropDown, setShowDropDown] = useState('None')
  const [showConnect, setShowConnect] = useState(false)
  const [userState] = useContext<any>(UserContext)
  const currentAccount = userState.userWallet

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
        //header.classList.add('navbar-container')
      }
    }
  }, [])

  const handleModal = () => {
    setShowConnect(!showConnect)
  }

  return (
    <>
      <div className={style.section}>
        <ConnectWallet
          handleModal={handleModal}
          showConnect={showConnect}
          //handleClose={handleClose}
        />
        <div
          className={style.container}
          id="container"
          onMouseLeave={() => setShowDropDown('None')}
        >
          {!currentAccount ? (
            <div className={style.content}>
              <Link to="/" className={style.logoBox}>
                <img src={Logo} alt="logo" />
              </Link>

              <div className={style.navBox}>
                <Link to="/">
                  <p>Home</p>
                </Link>
                <Link to="/about">
                  <p>About us</p>
                </Link>

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
                    className={style.btn}
                    onClick={() => setShowConnect(!showConnect)}
                    id="showIcon"
                  >
                    Connect wallet
                  </div>
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
                <img src={Logo} alt="logo" />
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
                  <input type="text" placeholder="Find collection" />
                  <img src={Search} alt="search" />
                </div>
              </div>
              <div className={style.buttonsBox}>
                <img
                  src={User}
                  alt="user"
                  onMouseOver={() => setShowDropDown('Profile')}
                />
                <img
                  src={Wallet}
                  alt="wallet"
                  onClick={() => setShowConnect(!showConnect)}
                  onMouseOver={() => setShowDropDown('None')}
                  id="showIcon"
                />
              </div>
              {showDropDown === 'Profile' && (
                <div
                  className={`animate__animated animate__fadeIn animate__faster  ${style.dropDown}`}
                  onMouseLeave={() => setShowDropDown('None')}
                >
                  <div className={style.dropContent}>
                    <div className={style.dropTop}>
                      <div className={style.dropBtn1}>
                        <p>Light</p>
                        <img src={Light} alt="light" />
                      </div>
                      <div className={style.dropBtn2}>
                        <p>Dark</p>
                        <img src={Dark} alt="dark" />
                      </div>
                    </div>
                    <div className={style.dropBody}>
                      <Link to="" className={style.dropItem}>
                        <img src={Profile} alt="profile" />
                        <p>Profile</p>
                      </Link>
                      <Link to="/collections" className={style.dropItem}>
                        <img src={Collection} alt="collection" />
                        <p>My collections</p>
                      </Link>
                      <Link to="" className={style.dropItem}>
                        <img src={Language} alt="language" />
                        <p>Language</p>
                      </Link>
                      <Link to="/" className={style.dropItem}>
                        <img src={Notification} alt="notification" />
                        <p>Notifications</p>
                      </Link>
                      <Link to="/settings" className={style.dropItem}>
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
