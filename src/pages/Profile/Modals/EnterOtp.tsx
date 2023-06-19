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
    const change = (e :any) => {
        if (e.target.value.length === e.target.maxLength) {
        
            e.target.ElementSibling.focus()
        }
    }
    const inputHandler = (event: customEvent) => {
        const { name, value } = event.target
        
      

           
            
            
        
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const otpData =userInput

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
                            <div onClick={()=>number1Ref.current.focus()} className={style.modalOtp} >
                                    <input maxLength={6} ref={number1Ref} onChange={(e)=>setUserInput(e.target.value)}  type="text" style={{opacity:'0'}} />
                                    <input maxLength={1} type="text" name='number1' value={userInput[0]}   required />
                                <input maxLength={1}  className={style.otpLeft} type="text"  name='number2' value={userInput[1]}  />
                                    <input maxLength={1} className={style.otpLeft} type="text"  name='number3' value={userInput[2]} onChange={inputHandler} />
                                    <input className={style.otpLeft} type="text"  name='number4' value={userInput[3]} onChange={inputHandler} />
                                    <input className={style.otpLeft} type="text" name='number5' value={userInput[4]} onChange={inputHandler} />
                                    <input className={style.otpLeft} type="text"  name='number6' value={userInput[5]} onChange={inputHandler} />
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
