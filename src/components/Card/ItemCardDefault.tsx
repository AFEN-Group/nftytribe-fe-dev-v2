import { Link } from 'react-router-dom'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import user from './assets/user.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'

const ItemCardDefault = () => {
  return (
    <Link to={`/explore/22/22`}>
      <div className={style.card}>
        <div className={style.cardContent}>
          <div className={style.cardImgBx}>
            <div className={style.cardImg2}>
              <img src={koala} alt="item" />
            </div>
            <div className={style.cardTop}>
              <img src={dots} alt="options" />
              <img src={like} alt="like" />
            </div>
          </div>
          <div className={style.descBox1}>
            <div className={style.userInfo}>
              <img src={user} alt="user" />
              <p>Michael Carson</p>
              <img src={arrow} alt="arrow" />
            </div>
            <div className={style.itemInfo}>
              <p>Cute koala</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemCardDefault
