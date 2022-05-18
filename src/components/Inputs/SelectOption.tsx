import style from './Inputs.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const SelectOption = (props: any) => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  return (
    <div className={style.inputBx}>
      <select
        className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'} ${
          dark === 'true' ? style.selectDark : style.selectLight
        }  
        `}
        name={props.inputName}
        onChange={props.inputHandler}
        required
      >
        {props.options.map((opt: any) => (
          <option value={opt.value} key={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectOption
