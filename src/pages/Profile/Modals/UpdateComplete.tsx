import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from './Verify.module.scss'
import Close from './assets/close.svg'
import Happy from './assets/happy.svg'
//import { Cancel } from '@material-ui/icons'

const UpdateComplete = (props: any) => {

    return (
        <div>
            <div
                className={`${style.overlay} animate__animated animate__fadeIn `}
            ></div>
            <div className={style.modalContainer}>

                <div
                    className={`${style.modal2} animate__animated animate__zoomInUp `}
                >
                    <div className={style.modalTop}>
                        <h1>Updated!</h1>
                        <p>
                            Your profile was updated successfully.
                        </p>
                        <img src={Close} alt="close" onClick={props.closeModal} />
                    </div>
                    <div className={style.modalBody2}>
                        <div className={style.successImg}>
                            <img src={Happy} alt="success" />
                        </div>
                    </div>
                    <Link to="/profile" className={style.modalBtnSingle}>
                        <button>Continue</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default UpdateComplete
