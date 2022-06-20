import { useContext } from 'react'
import { Link } from 'react-router-dom'
import style from '../Home.module.scss'
import nArrow from '../assets/arrow-right.svg'
import { ThemeContext } from '../../../context/ThemeContext'

const Marketplace = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <>
      <div
        //className={style.mk}
        className={`${style.mk} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
          }`}
      >
        <div className={style.mkContent}>
          <div className={style.mkLeft}>
            <div className={style.mkLeftContent}>
              <h1>Limitless Marketplace</h1>
              <p>Explopre our marketplace to start buying and selling NFTs </p>

              <Link to="/explore" className={style.mkBtn}>
                <p>Explore marketplace</p>
                <img src={nArrow} alt="more" />
              </Link>
            </div>
          </div>
          <div className={style.mkRight}>
            <div className={style.mkBlock1}>
              <div className={style.mkimgBx1}>
                <div className={style.mkimg1}></div>
              </div>
              <div className={style.mkimgBx}>
                <div className={style.mkimg2}></div>
              </div>
            </div>
            <div className={style.mkBlock2}>
              <div className={style.mkimgBx}>
                <div className={style.mkimg3}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Marketplace
