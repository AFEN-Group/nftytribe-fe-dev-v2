//import {useState} from 'react'
import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from './Verify.module.scss'
import Close from './assets/close.svg'
import Happy from './assets/happy.svg'
//import { CircularProgress } from '@material-ui/core'
import step1 from './assets/step1.svg'
import step2 from './assets/step2.svg'
import stepc from './assets/stepC.svg'

const Verification = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userInput, setUserInput, userInputRef] = useState<any>({
        // chain: 'rinkeby',
        // address: '',
    })
    const [isEmpty, setIsEmpty] = useState(true)
    const [completed, setCompleted] = useState(false)
    const [err, setErr] = useState(0)
    const [currentStep, setCurrentStep] = useState(1)

    const inputHandler = (event: any) => {
        setIsEmpty(true)
        setUserInput({
            ...userInput,
            [event.target.name]: event.target.value,
        })
        if (userInputRef.current.address.length >= 6) {
            setIsEmpty(false)
        }
    }


    return (
        <div>
            <div
                className={`${style.overlay} animate__animated animate__fadeIn `}
            ></div>
            <div className={style.modalContainer}>
                {!completed && (
                    <div
                        //className={style.modal}
                        className={`${style.modal} animate__animated animate__zoomInUp `}
                    >
                        <div className={style.modalTop}>
                            <h1>Verify your account</h1>
                            <p>
                                Verify your creator account to get a blue tick for better reach
                            </p>
                            <img src={Close} alt="close" onClick={props.closeVerify} />
                        </div>
                        <form className={style.modalBody}>
                            <div className={style.stepBoxes}>
                                <div className={style.stepBx}>
                                    <img src={currentStep === 1 ? step1 : stepc} alt="step1" />
                                    <p>Creator information</p>
                                </div>
                                <div className={style.line}></div>
                                <div className={style.stepBx}>
                                    <img src={step2} alt="" />
                                    <p>Social proof</p>
                                </div>
                            </div>
                            {/* <div className={style.stepTop}>
                                <div className={style.stepImg}>
                                    <img src={currentStep === 1 ? step1 : stepc} alt="step1" />
                                </div>
                                <div className={style.line}></div>
                                <div className={style.stepImg}>
                                    <img src={step2} alt="" />
                                </div>
                            </div>
                            <div className={style.stepTxt}>
                                <p>Creator information</p>
                                <div className={style.line2}></div>
                                <p>Social proof</p>
                            </div> */}
                            <div className={style.modalInput}>
                                <p>First name</p>
                                <input
                                    type="text"
                                    //name="address"
                                    //value={userInput.address}
                                    onChange={inputHandler}
                                    placeholder="Enter first name"
                                />
                            </div>
                            <div className={style.modalInput}>
                                <p>Last name</p>
                                <input
                                    type="text"
                                    //name="address"
                                    //value={userInput.address}
                                    onChange={inputHandler}
                                    placeholder="Enter last name"
                                />
                            </div>
                            <div className={style.modalInputTwo}>
                                <div >
                                    <p>Date of birth</p>
                                    <input
                                        type="date"
                                    //name="address"
                                    //value={userInput.address}
                                    //onChange={inputHandler}
                                    //placeholder="Enter last name"
                                    />
                                </div>
                                <div >
                                    <p>Place of birth</p>
                                    <input
                                        type="text"
                                        //name="address"
                                        //value={userInput.address}
                                        onChange={inputHandler}
                                    //placeholder="Enter last name"
                                    />
                                </div>
                            </div>
                            <div className={style.modalInput}>
                                <p>Upload gov issued ID</p>

                            </div>
                            <div className={style.modalBtns}>

                                <button className={style.btn2} onClick={props.closeVerify}>
                                    {' '}
                                    Cancel
                                </button>

                                <button
                                    className={style.btn1}
                                    disabled={isEmpty || isLoading}
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                )}
                {completed && (
                    <div
                        className={`${style.modal} animate__animated animate__zoomInUp `}
                    >
                        <div className={style.modalTop}>
                            <h1>Congratulations!</h1>
                            <p>
                                Your verification request was sent, you will recieve a notification shortly.
                            </p>
                            <img src={Close} alt="close" onClick={props.closeVerify} />
                        </div>
                        <div className={style.modalBody2}>
                            <div className={style.successImg}>
                                <img src={Happy} alt="success" />
                            </div>
                        </div>
                        <Link to="/editProfile" className={style.modalBtnSingle}>
                            <button>Continue</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Verification
