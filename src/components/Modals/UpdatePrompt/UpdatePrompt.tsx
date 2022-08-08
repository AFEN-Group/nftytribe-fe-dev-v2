import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from './UpdatePrompt.module.scss'
import Close from './assets/close.svg'
import Anxious from '../assets/anxious.svg'
import { motion } from 'framer-motion'
//import { Cancel } from '@material-ui/icons'

const UpdatePrompt = (props: any) => {

    return (
        <div>
            <div
                className={`${style.overlay} animate__animated animate__fadeIn `}
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
                    className={`${style.modal2}  `}
                >
                    <div className={style.modalTop}>
                        <h1>Update your email</h1>
                        <p>
                            Please update and verify your email address, your email address is mandatory on the platform.
                        </p>
                        <img src={Close} alt="close" onClick={props.closePrompt} />
                    </div>
                    <div className={style.modalBody2}>
                        <div className={style.successImg}>
                            <img src={Anxious} alt="success" />
                        </div>
                    </div>
                    <Link to="/editProfile" className={style.modalBtnSingle}>
                        <button>Update</button>
                    </Link>
                </motion.div>

            </div>
        </div>

    )
}

export default UpdatePrompt
