import style from './Inputs.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const TextInput = (props: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div
      className={style.inputBx} //{props.className}
    >
      <input
        className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'} 
        
        `}
        type={props.type}
        name={props.inputName}
        placeholder={props.holder}
        value={props.value}
        //onChange={props.inputHandler}
        autoComplete="off"
        maxLength={props.max}
      />
    </div>
  )
}

export default TextInput
