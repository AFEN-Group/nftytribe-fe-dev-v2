import style from './Inputs.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const SelectDate = (props: any) => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    return (
        <div
            className={`${dark === 'true' ? style.darkDate : style.lightDate} ${style.inputBx}`} //{props.className}
        >
            <input
                className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'} ${style.datePick}`}
                //type={props.type}
                name={props.inputName}
                placeholder={props.holder}
                value={props.value}
                onChange={props.inputHandler}
                autoComplete="off"
                minLength={props.min}
                maxLength={props.max}
                type="text"
                onFocus={(e: any) => e.target.type = 'datetime-local'}
            />
        </div>
    )
}

export default SelectDate
