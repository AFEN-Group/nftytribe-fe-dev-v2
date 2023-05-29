import { useState, useEffect, useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
// import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import style from './Profile.module.scss'
// import Header from '../../components/Header/Header'
import Cover from './assets/cover.svg'
import Avatar from './assets/user3.svg'
import Av2 from './assets/user5.svg'

import Arrow2 from './assets/arrowLeft.svg'
import Container from '../../components/Container/Container'
import TextInput from '../../components/Inputs/TextInput'
import TextArea from '../../components/Inputs/TextArea'
import { publicRequest } from '../../utils/requestMethods'
import Verification from './Modals/Verification'
import UpdateComplete from './Modals/UpdateComplete'
import globals from '../../utils/globalVariables'
import EnterOtp from './Modals/EnterOtp'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { UserContext } from '../../context/UserContext'


const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [themeState] = useContext<any>(ThemeContext)
  const [showVerify, setShowVerify] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [updated, setUpdated] = useState(false)
  const dark = themeState.dark
  const currentAddress = sessionStorage.getItem('currentAccount')
  const {userState,setUserState}=useContext(UserContext)
  const {error,loading,Response,fetchData}= UseAxios()
  // const [authState, setAuthState] = useContext<any>(AuthContext)
  const user:any=userState?.user

  const [imageFile, setImageFile] = useState<any>({
    file: '',
    location: '',
  })
  const [coverImage, setCoverImage] = useState<any>({
    file: '',
    location: '',
  })

 

  const [userInput, setUserInput] = useState<any>({
  
  })

  const inputHandler = (event: any) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
  }
 
  const selectMedia2 = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile({
        ...imageFile,
        file: e.target.files[0],
      })
      setUserInput({
        ...userInput,[e.target.name]:e.target.files[0]
      })
    }
  }
 
  
  // const [userState,setUserState]=useContext(UserContext)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData= new FormData()
    for( let keys in userInput){
    if(keys!=='email') formData.append(keys,userInput[keys])
      
    }
    
    try {
      setIsLoading(true)
      const res= await Protected(sessionStorage.getItem('token')).patch('api/user/:field',formData)

      // console.log(res);
      setUserState({...userState,user:res.data})
      
 
      if (userInput.email) {
        try {
         await fetchData({
          method:'post',
          url:'api/user/email',
          axiosInstance:Protected(sessionStorage.getItem('token')),
          requestConfig:{
            email:userInput.email
          }
         })
          
          setShowOtp(true)
        } catch (err) {
          console.log(err)
        }
      } else {
        setUpdated(true)
      }
      setIsLoading(false)
    
     
    

    } catch (err) {
      console.log(err)
    
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setShowVerify(false)
    setUpdated(false)
    setShowOtp(false)
  }
console.log(userState);
const navigate=useNavigate()
  return (
    <>
 
    
      {updated && <UpdateComplete closeModal={closeModal} />}
      {showOtp && <EnterOtp closeModal={closeModal} currentAddress={currentAddress} />}

      <Container>
        <form className={style.container} onSubmit={handleSubmit}>

          <div
            className={`${style.coverBx2} animate__animated animate__fadeInDown `}
          >
            {!coverImage.file && !user?.cover_image && (

              <img className={style.cover} src={Cover} alt="cover" />
            )}
            {!coverImage.file && user?.cover_image && (

              <img className={style.cover} src={user?.cover_image} alt="cover" />
            )}
            {coverImage.file && (
              <img
                className={style.cover}
                src={URL.createObjectURL(coverImage.file)}
                alt="cover"
              //onClick={closeVerify}
              />
            )}

            <div className={style.coverBtns}>
              <Link to="/profile">
                {' '}
                <img src={Arrow2} className={style.arrow} />
              </Link>

              {/* <button className={dark === 'true' ? style.bl : style.bd}>
                Edit cover photo
              </button>
              <div className={style.fileInput1}>
                <input
                  type="file"
                  name="img"
                  onChange={()=>{

                  }}
               
                />
              </div> */}
            </div>

          </div>
          <div
            className={`${style.content} animate__animated animate__fadeInUp animate__delay-1s `}
          >
            <div className={style.profileInfo}>
              {!imageFile.file && !user?.avatar && (
                <div className={style.avatar}>
                  <img src={dark === 'true' ? Avatar : Av2} alt="avatar" />
                </div>
              )}
              {!imageFile.file && user?.avatar && (
                <div className={style.avatar}>
                  <img src={user?.avatar?.url} alt="avatar" />
                </div>
              )}

              {imageFile?.file && (
                <div className={style.avatar}>
                  <img src={URL.createObjectURL(imageFile.file)} alt="avatar" />
                </div>
              )}

              <div className={style.picBtn}>
                <button>Change Photo</button>
                <div className={style.fileInput2}>
                  <input
                    type="file"
                    name="avatar"
                    onChange={selectMedia2}
                  //required
                  />
                </div>
              </div>
            
            </div>
            <div className={style.editBx}>
              <h2>Edit Profile</h2>
              <div>
                <div className={style.inputField}>
                  <p>Username</p>
                  <TextInput
                    type="text"
                    inputName="username"
                    holder={user?.username?user?.username:"Enter username"}
                    inputHandler={inputHandler}
                    value={userInput.username}
                  />
                </div>
                <div className={style.inputField}>
                  <p>Email address</p>
                  <TextInput
                    type="email"
                    inputName="email"
                    holder={user?.email?user?.email:" youremail@example.com"}
                    inputHandler={inputHandler}
                    value={userInput.email}
                  />
                </div>
                <div className={style.inputField}>
                  <p>Bio</p>
                  <TextArea
                    inputName="bio"
                    type="text"
                    inputHandler={inputHandler}
                    holder={user?.bio?user?.bio:"Tell the world about yourself! It starts here"}
                    value={userInput.bio}
                  />
                </div>
                <div className={style.inputField}>
                  <p>Twitter link</p>
                  <TextInput
                    inputName="twitter"
                    type="text"
                    inputHandler={inputHandler}
                    holder=" https://twitter.com/your username"
                    value={userInput.twitter}
                  />
                </div>
                <div className={style.inputField}>
                  <p>Website URL</p>

                  <TextInput
                    inputName="website"
                    type="text"
                    inputHandler={inputHandler}
                    holder="Enter your website url "
                    value={userInput.website}
                  />
                </div>
                <div className={`${style.inputField} ${style.mgTop5}  `}>
                  <p>Verification</p>
                  <h4>To get verified and a blue tick</h4>
                  <button  type='button' onClick={() => navigate('/verify')}>Verify</button>
                </div>
                <div className={style.editBtn}>
                  <button
                    type="submit"
                   
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      'Update Profile'
                    ) : (
                      <CircularProgress color="inherit" size="20px" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </>
  )
}

export default EditProfile
