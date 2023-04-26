//import {useState} from 'react'
import useState from 'react-usestateref'
import { Link, useNavigate } from 'react-router-dom'
import style from './Verify.module.scss'
import Close from './assets/close.svg'
import Happy from './assets/happy.svg'
import { Cancel } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import step1 from './assets/step1.svg'
import step2 from './assets/step2.svg'
import stepc from './assets/stepC.svg'
import shapes from './assets/shapes.svg'
import { useEffect, useRef } from 'react'
import UseAxios from 'src/hooks/AxiosConfig/useAxios'
import Protected from 'src/hooks/AxiosConfig/axiosInstance'
import axios from 'axios'
import baseUrl from '../../../utils/globalVariables'
import UpdateComplete from './UpdateComplete'
const Verification = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userInput, setUserInput, userInputRef] = useState<any>({
        socialLinks:[]
        // chain: 'rinkeby',
        // address: '',
    })
    const navigate = useNavigate()
    const [isEmpty, setIsEmpty] = useState(true)
    const [completed, setCompleted] = useState(false)
    const [err, setErr] = useState(0)
    const [currentStep, setCurrentStep] = useState(1)
    const [imageFile, setImageFile] = useState<any>(null)

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
    console.log(userInput);
    const upload=UseAxios()
    const selectMedia = async (e: any) => {
        setIsLoading(true)
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0])
            var form_data = new FormData()
            form_data.append('upload', e.target.files[0])
            //   try {
            //     const resp = await fetch(
            //       'https://dev.api.nftytribe.io/api/collectibles/upload-image',
            //       {
            //         method: 'POST',
            //         body: form_data,
            //       },
            //     )
            //     const data = await resp.json()
            //     setCardImage(data.location)
            //     console.log(data)
            //     setIsLoading(false)
            //   } catch (error) {
            //     console.log(error)
            //     setIsLoading(false)
            //   }
        }
    }
    const [socials,setSocials]=useState({})
    const videoRef = useRef(null)
    const pictureRef = useRef(null)
    const [showPrev,setShowPrev]=useState(false)
    const [liveImage,setLiveImage]=useState<any>()
    const takePicture = () => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
               
                let video: any = videoRef.current;
               
                video.srcObject = stream;
                video.play()
            })
        }
    }
    function dataURLtoFile(dataurl:any, filename: any) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    
    const Capture=()=>{
        let video= videoRef.current
       let width=500;
       let height=width/(16/9)
       let photo: any=pictureRef.current
       photo.width=width
       photo.height=height
       photo.style=style
       let ctx=photo.getContext('2d')
       ctx.drawImage(video,0,0,width,height)
        let image_data_url = photo.toDataURL('image/jpeg');
        setLiveImage(dataURLtoFile(image_data_url,'selfie'))
       setShowPrev(!showPrev)
    }
    console.log(liveImage);
    
    useEffect(()=>{if(showPrev)takePicture()},[showPrev])
   const header={
       Authorization: `Bearer ${sessionStorage.getItem('token')}`
   }
    const [updated, setUpdated] = useState(false)
    const [error, setError] = useState(false)
    return (
        <div >
            {updated && <UpdateComplete closeModal={()=>navigate(-1)} />}
            {showPrev&&<div className={style.imagePrev}>
                 <video  style={{width:'400px',height:'600px'}} ref={videoRef} ></video>
                 <button onClick={Capture}>Take Photo</button>
            </div>}
            <div className={style.modalContainer}>
                {!completed && (
                    <div
                        //className={style.modal}
                        className={`${style.modal} animate__animated animate__zoomInUp `}
                    >
                        <div className={style.modalTop}>
                            <h1>Verify your account</h1>
                            <p>
                                Please check the completed fields before submitting your request
                            </p>
                            { error &&<p style={{color:'red'}}> Please Update all neccessary details</p>}
                        </div>
                        <form className={style.modalBody}>
                        
                            <div className={style.modalInput}>
                                <p>Your name</p>
                                <input
                                    type="text"
                                    name="fullName"
                                    //value={userInput.address}
                                    onChange={inputHandler}
                                    placeholder="Enter Full name"
                                />
                            </div>
                     
                            <div className={style.modalInputTwo}>
                                <div >
                                    <p>Email Address</p>
                                    <input
                                        type="email"
                                    name="email"
                                    //value={userInput.address}
                                    onChange={inputHandler}
                                        placeholder="yourname@gmail.com"
                                    />
                                </div>
                                <div >
                                    <p>Phone Number</p>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        //value={userInput.address}
                                        onChange={inputHandler}
                                    placeholder="Enter phone Number"
                                    />
                                </div>
                            </div>
                            <div className={style.modalInput}>
                                <p>Live Photo</p>
                                <div style={{ backgroundColor:'#424141'}}className={style.fileContainer}>
                                    {!imageFile && (
                                        <div  className={style.fileTxt}>
                                            <svg onClick={() => setShowPrev(true)} width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <circle cx="36.6205" cy="36" r="27.931" fill="#3CC13B" />
                                                <rect x="20.4829" y="19.8621" width="31.0345" height="31.0345" fill="url(#pattern0)" />
                                                <circle cx="36" cy="36" r="35.6897" stroke="#D4D3D8" stroke-width="0.62069" />
                                                <defs>
                                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                        <use xlinkHref="#image0_4175_18913" transform="scale(0.0078125)" />
                                                    </pattern>
                                                    <image id="image0_4175_18913" width="128" height="128" xlinkHref="data:image/png;base64,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" />
                                                </defs>
                                            </svg>

                                            <p>Tap on the button to take a  selfie</p>
                                           <canvas className='canv' ref={pictureRef}></canvas>
                                        </div>
                                    )}
                                    {/* <input
                                        type="file"
                                        name="img"
                                        onChange={selectMedia}
                                        required
                                    /> */}
                                    {imageFile && (
                                        <div className={style.fileBx}>
                                            {/* <img src={guy} alt="guy" /> */}
                                            <img src={URL.createObjectURL(imageFile)} alt="nft" />
                                            <Cancel
                                                className={style.cancel}
                                                onClick={() => setImageFile(null)}
                                            />
                                        </div>
                                    )}
                            
                            
                            
                            
                            
                                </div>

                            </div>
                            <div className={style.modalInput}>
                                <p>Social link(s)</p>
                                <input
                                    type="text"
                                    // name="address"
                                    //value={userInput.address}
                                    onChange={(e) => setSocials({ ...socials, one: e.target.value })}
                                    placeholder="http/twitterusername.com"
                                /> 
                                 <input
                                    type="text"
                                    //name="address"
                                    //value={userInput.address}
                                    onChange={(e) => setSocials({ ...socials, two:e.target.value })}
                                    placeholder="http/twitterusername.com"
                                /> 
                                 <input
                                    type="text"
                                    //name="address"
                                    //value={userInput.address}
                                    onChange={(e) => setSocials({ ...socials, three: e.target.value })}
                                    placeholder="http/twitterusername.com"
                                />  
                            </div>
                            <div className={style.modalInput}>
                                <p>Upload gov issued ID</p>
                                <div className={style.fileContainer}>
                                    {!imageFile && (
                                        <div className={style.fileTxt}>
                                            <img src={require('./assets/cloud.png')} alt="upload" />
                                           
                                            <p style={{color:'black'}}>Upload an image of your selected ID. Image should be PNG/JPEG format</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        name="img"
                                        onChange={selectMedia}
                                        required
                                    />
                                    {imageFile && (
                                        <div className={style.fileBx}>
                                            {/* <img src={guy} alt="guy" /> */}
                                            <img src={URL.createObjectURL(imageFile)} alt="nft" />
                                            <Cancel
                                                className={style.cancel}
                                                onClick={() => setImageFile(null)}
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className={style.modalBtns}>

                               
                            </div>
                            <div className={style.modalInput}>
                                    <p>Refferal Code (optional)</p>
                                    <input
                                        type="text"
                                        //name="address"
                                        //value={userInput.address}
                                        onChange={inputHandler}
                                        placeholder="*******"
                                    />
                                </div>
                            
                            <div
                                onClick={async () => {
                                    // console.log(liveImage &&  && userInput.fullName && imageFile, liveImage, socials.one, userInput.fullName, imageFile);

                                    const form = new FormData()
                                    if (liveImage && Object.values(socials).length && userInput.fullName && imageFile) {

                                        form.append('selfie', liveImage)
                                        form.append('phoneNumber', userInput.phoneNumber)
                                        form.append('fullName', userInput.fullName)
                                        form.append('professionalName', userInput.fullName)
                                        form.append('id', imageFile)
                                        form.append('socialLinks', JSON.stringify(Object.values(socials)))
                                       
                                        let res = await axios.post(`${baseUrl.baseURL}/api/user/kyc-v1`, form, { headers: header }).catch(error=>setError(true))
                                        if(res)setUpdated(true)

                                      
                                    }
                                }} className={style.button}>
                                    <div
                                       
                                        //onClick={showCon}
                                        id="showIcon">
                                       Submit
                                    </div>
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
