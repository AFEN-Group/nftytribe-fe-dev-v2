import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from './Verify.module.scss'
import Close from './assets/close.svg'
import Anxious from '../assets/anxious.svg'
//import { Cancel } from '@material-ui/icons'

const UpdatePrompt = (props: any) => {

    return (
        <div>
            <div
                className={`${style.overlay} animate__animated animate__fadeIn `}
            ></div>
            <div className={style.modalContainer}>

                <div
                    className={`${style.modal2} animate__animated animate__zoomInUp `}
                >
                    <div className={style.modalTop2}>
                        <h1>Please update your profile</h1>
                        <p>
                            Please update your email address and other information.
                        </p>
                        <img src={Close} alt="close" onClick={props.closeModal} />
                    </div>
                    <div className={style.modalBody2}>
                        <div className={style.successImg}>
                            <img src={Anxious} alt="success" />
                        </div>
                    </div>
                    <Link to="/editProfile" className={style.modalBtnSingle}>
                        <button>Update</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default UpdatePrompt
