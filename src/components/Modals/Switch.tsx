import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../context/ThemeContext'
import WalletContext from '../../context/WalletContext'
import style from './Modals.module.scss'
import Close from './assets/close.svg'
import Anxious from './assets/anxious.svg'
//import { CircularProgress } from '@material-ui/core'

//import { Cancel } from '@material-ui/icons'

const Switch = (props: any) => {
    const [themeState] = useContext<any>(ThemeContext)
    const dark = themeState.dark
    const { handleNetworkSwitch, handleNetworkSwitch2 } = useContext<any>(WalletContext)
    return (
        <div>
            <div
                className={`${style.overlay} animate__animated animate__fadeIn`}
            ></div>
            <div className={style.modalContainer}>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {
                            opacity: 0,
                            scale: .3,
                        },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                type: 'spring',
                                duration: .1,
                            },
                        },
                    }}
                    className={`${style.modal2} `}
                >
                    <div className={style.modalTop}>
                        <h1>Chain Error</h1>
                        <p>
                            Please switch to <strong>{props.blockChain}</strong> chain
                        </p>
                        <img src={Close} alt="close" onClick={props.closeModal} />
                    </div>
                    <div className={style.modalBody2}>
                        <div className={style.successImg}>
                            <img src={Anxious} alt="success" />
                        </div>
                    </div>

                    {/* <Link to="/editProfile" className={style.modalBtnSingle}> */}
                    <div className={style.modalBtnSingle}>
                        {props.blockChain === 'Binance' && (
                            <button
                                className="blueBtn"
                                onClick={() => handleNetworkSwitch("bsc")}
                            >Switch to Binance </button>
                        )}
                        {props.blockChain === 'Ethereum' && (
                            <button
                                className="blueBtn"
                                onClick={() => handleNetworkSwitch2("rinkeby")}
                            >Switch to Ethereum </button>
                        )}
                    </div>
                    {/* <button>Update</button> */}
                    {/* </Link> */}
                </motion.div>

            </div>
        </div>

    )
}

export default Switch
