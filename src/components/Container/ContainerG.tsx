import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import style from './Container.module.scss'

const ContainerG = (props: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={` ${dark === 'true' ? style.containerD : style.containerG}`}
    >
      <div>{props.children}</div>
    </div>
  )
}

export default ContainerG
