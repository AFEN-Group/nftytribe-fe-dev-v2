import useState from 'react-usestateref'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import style from './Verify.module.scss'
import Close from './assets/close.svg'
import { CircularProgress } from '@material-ui/core'
import { publicRequest } from '../../../utils/requestMethods'
import Happy from './assets/happy.svg'
import toast from 'react-hot-toast'
import { e } from 'mathjs'
import { UserContext } from 'src/context/UserContext'
//import { Cancel } from '@material-ui/icons'
import '../index.scss'
const EnterOtp = (props: any) => {

    const [isLoading, setIsLoading] = useState(false)
    const [updated, isUpdated] = useState(false)

    const [userInput, setUserInput, userInputRef] = useState<any>({
        number1: "",
        number2: "",
        number3: "",
        number4: "",
        number5: "",
        number6: "",
    })

    const { userState, setUserState } = useContext(UserContext)

    const number1Ref = useRef<any>()
    const number2Ref = useRef<any>()
    const number3Ref = useRef<any>()
    const number4Ref = useRef<any>()
    const number5Ref = useRef<any>()
    const number6Ref = useRef<any>()

    interface customEvent {
        target: {
            name: string;
            value: any;
        };
    }

    const inputHandler = (event: customEvent) => {
        const { name, value } = event.target
        
      

            setUserInput({
                ...userInput,
                [name]: value,
            })

           
            //console.log(userInputRef.current.number1.length)
            if (userInputRef.current.number1.length === 1) {
                number2Ref.current.focus()
            }
            if (userInputRef.current.number2.length === 1) {
                number3Ref.current.focus()
            }
            if (userInputRef.current.number3.length === 1) {
                number4Ref.current.focus()
            }
            if (userInputRef.current.number4.length === 1) {
                number5Ref.current.focus()
            }
            if (userInputRef.current.number5.length === 1) {
                number6Ref.current.focus()
            }
            if (userInputRef.current.number6.length === 1) {
                number1Ref.current.focus()
            }
        
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const otpData = {
                token: userInput.number1 + userInput.number2 + userInput.number3 + userInput.number4 +
                    userInput.number5 + userInput.number6,
                // wallet_address: props.currentAddress
            }

            console.log(sessionStorage.getItem('token'));
            
            const enterOtpReq =
                await publicRequest.post(`api/user/email/verify`, otpData,{headers:{
                    'Authorization':`Bearer ${sessionStorage.getItem('token')}`
                }})
            setUserState({ ...userState, user: enterOtpReq.data })

            console.log(enterOtpReq)
            
            isUpdated(true)

        } catch (err) {
            console.log(err)
            toast.error(`${err}`,
                {
                    duration: 3000,
                }
            )
        }
        setIsLoading(false)
    }

    return (
        <div>
            <div
                className={`overlay animate__animated animate__fadeIn `}
            >


                <div className={style.modalContainer}>
                {!updated ? (
                    <form
                        className={`${style.modal2} animate__animated animate__zoomInUp `}
                    >
                        <div className={style.modalTop}>
                            <h1>Enter OTP</h1>
                            <p>
                                Please enter the otp code sent to your email.
                            </p>
                            <img src={Close} alt="close" onClick={props.closeModal} />
                        </div>
                        <div className={style.modalBody2}>
                            <div className={style.modalOtp} >
                                <input type="text" ref={number1Ref} name='number1' value={userInput.number1} onChange={inputHandler} required />
                                <input  className={style.otpLeft} type="text" ref={number2Ref} name='number2' value={userInput.number2} onChange={inputHandler} />
                                <input className={style.otpLeft} type="text" ref={number3Ref} name='number3' value={userInput.number3} onChange={inputHandler} />
                                <input className={style.otpLeft} type="text" ref={number4Ref} name='number4' value={userInput.number4} onChange={inputHandler} />
                                <input className={style.otpLeft} type="text" ref={number5Ref} name='number5' value={userInput.number5} onChange={inputHandler} />
                                <input className={style.otpLeft} type="text" ref={number6Ref} name='number6' value={userInput.number6} onChange={inputHandler} />
                            </div>
                            {/* <div className={style.successImg}>
                            <img src={Happy} alt="success" />
                        </div> */}
                        </div>
                        <div className={style.modalBtnSingle}>
                            <button type="submit" onClick={handleSubmit} disabled={isLoading}>
                                {!isLoading ? (
                                    'Submit'
                                ) : (
                                    <CircularProgress color="inherit" size="20px" />
                                )}
                            </button>
                        </div>
                    </form>) : (

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
                    </div>)}


            </div>  
            </div>
          
        </div>

    )
}

export default EnterOtp
