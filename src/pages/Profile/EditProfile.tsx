import { useState, useEffect, useContext } from 'react'
//import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import style from './Profile.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
import Avatar from './assets/avatar.svg'
import Edit from './assets/edit.svg'
// import Sad from './assets/sad.svg'
// import Arrow from './assets/arrow.svg'
import Container from '../../components/Container/Container'
import TextInput from '../../components/Inputs/TextInput'
// import { publicRequest } from '../../utils/requestMethods'
// import ItemCard from '../../components/Card/ItemCard'

const EditProfile = () => {
  //const [tab, setTab] = useState('all')
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  //const [collectibles, setCollectibles] = useState<any>()
  const currentAddress = localStorage.getItem('currentAccount')
  //const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentAddress])
  return (
    <>
      <Header />
      <Container>
        <div className={style.container}>
          <div
            className={`${style.coverBx} animate__animated animate__fadeInDown `}
          >
            <img src={Cover} alt="cover" />
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
                  <TextInput />
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
