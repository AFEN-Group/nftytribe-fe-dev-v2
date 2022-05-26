import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import style from './Profile.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
import Avatar from './assets/avatar.svg'
// import Edit from './assets/edit.svg'
// import Sad from './assets/sad.svg'
// import Arrow from './assets/arrow.svg'
import Arrow2 from './assets/arrowLeft.svg'
import Container from '../../components/Container/Container'
import TextInput from '../../components/Inputs/TextInput'
import TextArea from '../../components/Inputs/TextArea'

const EditProfile = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  const currentAddress = localStorage.getItem('currentAccount')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentAddress])
  return (
    <>
      <Header />
      <Container>
        <div className={style.container}>
          <div
            className={`${style.coverBx2} animate__animated animate__fadeInDown `}
          >
            <img className={style.cover} src={Cover} alt="cover" />
            <div className={style.coverBtns}>
              <Link to="/profile">
                {' '}
                <img src={Arrow2} className={style.arrow} />
              </Link>

              <button className={dark === 'true' ? style.bl : style.bd}>
                Edit cover photo
              </button>
            </div>
          </div>
          <div
            className={`${style.content} animate__animated animate__fadeInUp animate__delay-1s `}
          >
            <div className={style.profileInfo}>
              <div className={style.avatar}>
                <img src={Avatar} alt="avatar" />
              </div>
              <div className={style.picBtn}>
                <button>Change Photo</button>
              </div>
              {/* <div className={style.title}>
                <h1>Michael Carson</h1>
                <img src={Edit} alt="edit" />
              </div> */}
            </div>
            <div className={style.editBx}>
              <h2>Edit Profile</h2>
              <form>
                <div className={style.inputField}>
                  <p>Username</p>
                  <TextInput holder="Enter username" />
                </div>
                <div className={style.inputField}>
                  <p>Email address</p>
                  <TextInput holder="Enter email e.g youremail@example.com" />
                </div>
                <div className={style.inputField}>
                  <p>Bio</p>
                  <TextArea holder="Tell the world about yourself! It starts here" />
                </div>
                <div className={style.inputField}>
                  <p>Twitter link</p>
                  <TextInput holder=" http://twitter.com/your username" />
                </div>
                <div className={style.inputField}>
                  <p>Website URL</p>
                  <TextInput holder="Enter your website url e.g http://www.xyz.io" />
                </div>
                <div className={style.inputField}>
                  <p>Website URL</p>
                  <h4>To get verified and a blue tick</h4>
                  <button>Verify</button>
                </div>
                <div className={style.editBtn}>
                  <button>Update Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default EditProfile
