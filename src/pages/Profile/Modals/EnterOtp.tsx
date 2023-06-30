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
import OtpInput from 'react-otp-input';
import '../index.scss'
const EnterOtp = (props: any) => {

    const [isLoading, setIsLoading] = useState(false)
    const [updated, isUpdated] = useState(false)

    const [userInput, setUserInput, ] = useState<any>(new Array(6).fill(''))

    const { userState, setUserState } = useContext(UserContext)
    

    interface customEvent {
        target: {
            name: string;
            value: any;
        };
    }
   console.log(userInput);
   

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const otpData =userInput.join('')

            console.log(sessionStorage.getItem('token'));
            
            const enterOtpReq =
                await publicRequest.post(`api/user/email/verify`, {token:otpData},{headers:{
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
                            <div  className={style.modalOtp} >
                                 {userInput.map((input:any, idx:number)=>(
                                    // @ts-ignore
                                     <input maxLength={1} value={userInput[idx]} style={{textAlign:'center'}} onPaste={async(e)=>{
                                        const board= await navigator.clipboard.readText()
                                      if(board.length===6)  setUserInput([...board.split('')])
                                         
                                        
                                     }
                                     } onChange={(e)=>{
                                        // @ts-ignore
                                       if(e.target.value&&e.target.nextSibling)e.target.nextSibling.focus()
                                        
                                        setUserInput([...userInput.map((t:number,id:number)=>id===idx?e.target.value:t)])}} />
                                 ))}
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
