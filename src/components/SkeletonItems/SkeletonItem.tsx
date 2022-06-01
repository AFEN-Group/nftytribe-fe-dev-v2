import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import style from './SkeletonItems.module.scss'

const SkeletonItems = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <>
      <div
        className={`${style.itemBx} ${
          dark === 'true' ? style.dark : style.light
        }`}
      >
        <div className={style.itemImg}>
          <div className={style.imgSkeleton}></div>
        </div>
        <div className={style.itemDesc}>
          <div className={style.itemTxt}>
            <div className={style.itemSubtxt}>
              {/* <h3>The swirling man</h3> */}
              <div className={style.blackBg}></div>
              <div className={style.userBx}>
                <div className={style.blackBg}></div>
              </div>
            </div>
            <div className={style.btn}>
              <button></button>
            </div>
          </div>
          <div className={style.actionBx}>
            <div className={style.aBcontent}>
              <div className={style.aleft}></div>
              <div className={style.aright}>
                {/* <p>2d 13h 23m 19s</p> */}
                <div className={style.blackBg}></div>
              </div>
            </div>
            <div className={style.aleft}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SkeletonItems
