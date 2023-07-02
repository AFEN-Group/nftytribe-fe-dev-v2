import style from './Inputs.module.scss'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const SelectOption3 = (props: any) => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark

   
   
    return (
        <div className={style.inputBx}>
            <select onChange={props.inputHandler}
                className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'} ${dark === 'true' ? style.selectDark : style.selectLight
                  }  
                // `}
                // className={style.select}
                // name={props.inputName}
               
            >
                {/* <div  style={{display:'flex',alignItems:'center',height:'100%'}}>{props.value==1?'Fixed Price':'Auction'}</div> */}
              {props.options.map((opt: any) => (
                    <option  value={opt.value} key={opt.value}>
                        {opt.text}

                        <div className="radio">
                            <div></div>
                        </div>
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectOption3


  