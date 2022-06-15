import style from './Inputs.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const NumberInput = (props: any) => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    return (
        <div
            className={style.inputBx} //{props.className}
        >
            <input
                className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'} 
        
        `}
                type='number'
                name={props.inputName}
                placeholder={props.holder}
                value={props.value}
                onChange={props.inputHandler}
                autoComplete="off"
                maxLength={1}
                min={props.min}
                max={props.max}
                required
            />
        </div>
    )
}

export default NumberInput
