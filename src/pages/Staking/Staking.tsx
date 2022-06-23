import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
//import { motion } from 'framer-motion'
import Header from '../../components/Header/Header'
// import Footer from '../../components/Footer/Footer'
// import style from './Rewards.module.scss'
// import Shape1 from './assets/shape01.svg'
// import Shape2 from './assets/shape2.svg'
// import Shape3 from './assets/shape3.svg'
// import Shape4 from './assets/shape4.svg'

// import arrow1 from './assets/arrow1.svg'
// import arrow2 from './assets/arrow2.svg'
// import Staking from './assets/'

const Staking = () => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <div className="">
                {/* <img src={} alt="" /> */}
            </div>

        </>
    )
}

export default Staking
