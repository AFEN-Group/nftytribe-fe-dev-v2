import style from './Inputs.module.scss'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const SelectOption3 = (props: any) => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark

    const [showOption,setShowOption]=useState(false)
   
    return (
        <div className={style.inputBx}>
            <div
                // className={`${dark === 'true' ? 'darkTheme' : 'lightTheme'} ${dark === 'true' ? style.selectDark : style.selectLight
                //   }  
                // `}
                className={style.select}
                // name={props.inputName}
               onClick={()=>setShowOption(!showOption)}
            >
                <div  style={{display:'flex',alignItems:'center',height:'100%'}}>{props.value==1?'Fixed Price':'Auction'}</div>
             {showOption && <div className={style.options}>  {props.options.map((opt: any) => (
                    <option onClick={props.inputHandler} value={opt.value} key={opt.value}>
                        {opt.text}

                        <div className="radio">
                            <div></div>
                        </div>
                    </option>
                ))}</div>}
            </div>
        </div>
    )
}

export default SelectOption3
