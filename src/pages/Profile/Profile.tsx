import { useEffect } from 'react'
import style from './Profile.module.scss'
import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
import Avatar from './assets/avatar.svg'
import Edit from './assets/edit.svg'
import Sad from './assets/sad.svg'
import Arrow from './assets/arrow.svg'

const Profile = () => {
  //const [tab, setTab] = useState('all')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Header />
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
            <div className={style.title}>
              <h1>Michael Carson</h1>
              <img src={Edit} alt="edit" />
            </div>
          </div>
        </div>
        <div
          //className={style.filters}
          className={`${style.filters} animate__animated animate__fadeInUp animate__delay-1s `}
        >
          <div className={style.filterItemA}>
            <p>All</p>
          </div>
          <div className={style.filterItem}>
            <p>Collected</p>
          </div>
          <div className={style.filterItem}>
            <p>On sale</p>
          </div>
          <div className={style.filterItem}>
            <p>Created</p>
          </div>
          <div className={style.filterItem}>
            <p>Activity</p>
          </div>
          <div className={style.filterItem}>
            <p>Sold</p>
          </div>
          <div className={style.filterItem}>
            <p>Physical Items</p>
          </div>
        </div>
        <div
          //className={style.items}
          className={`${style.items} animate__animated animate__fadeInUp animate__delay-2s `}
        >
          <div className={style.itemContent}>
            <div className={style.noResults}>
              <img src={Sad} alt="sad" />
              <h2>No items found</h2>
              <div className={style.explore}>
                <p>Explore marketplace</p>
                <img src={Arrow} alt="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
