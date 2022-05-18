import style from './Inputs.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const TextArea = (props: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div className={style.textBox}>
      <textarea
        className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'}`}
        name={props.inputName}
        placeholder={props.holder}
        value={props.value}
        onChange={props.inputHandler}
        autoComplete="off"
      ></textarea>
    </div>
  )
}

export default TextArea
