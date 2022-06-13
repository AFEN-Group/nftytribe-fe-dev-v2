import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import style from './Container.module.scss'

const Container = (props: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={`${style.container} ${
        dark === 'true' ? 'darkTheme' : 'lightTheme'
      }`}
    >
      <div className={style.content}>{props.children}</div>
    </div>
  )
}

export default Container
