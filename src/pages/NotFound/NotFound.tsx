import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import style from './NotFound.module.scss'

const NotFound = () => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    return (
        <>
            <Header />
            <div

                className={`${style.content} ${dark === 'true' ? 'darkTheme' : 'lightTheme'
                    }`}
            >
                <div className={style.bigTxt}> <h1>404</h1></div>
                <div className={style.smTxt}>
                    <h3>Sorry the page you're looking for was not found</h3>
                </div>

                <Link to="/">
                    <button
                        className={`${dark === 'true' ? 'yellowBtn' : 'blueBtn'} `}
                    >Back to Home</button>
                </Link>
            </div>
        </>
    )
}

export default NotFound