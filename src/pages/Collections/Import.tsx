//import {useState} from 'react'
import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import style from './Collections.module.scss'
import Close from './assets/close.svg'
import Happy from './assets/happy.svg'
import globals from '../../utils/globalVariables'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import { useEffect } from 'react'
//import { CircularProgress } from '@material-ui/core'

const Import = (props: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInput, setUserInput, userInputRef] = useState<any>({
    //chain: 'rinkeby',
    chain: 'eth',
    address: '',
  })
  const [isEmpty, setIsEmpty] = useState(true)
  const [imported, setImported] = useState(false)
  const [err, setErr] = useState(0)

  const inputHandler = (event: any) => {
    setIsEmpty(true)
    //console.log(event.target.value)
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
    if (userInputRef.current.address.length >= 6) {
      setIsEmpty(false)
    }
  }
  const {fetchData,Response,error,loading}=UseAxios()
  const importCollection = async (e: any) => {
    e.preventDefault()
    const regex = /^0x[a-fA-F0-9]{40}$/
    if (regex.test(userInputRef.current.address)) {

      fetchData({
        method:'Post',
        url:'api/collection',
        axiosInstance:Protected(sessionStorage.getItem('token')),
        requestConfig:{
          contractAddress: userInput.address,
          chain: userInput.chain.toLowerCase()
        }
      })
    
    } else {
      console.log(err)
      setErr(2)
    }
  }
  // @ts-ignore
  console.log();
  
  useEffect(()=>{
    if(Response){
       setImported(true)
    }
    if(error){
      setErr(1)
    }
  },[error,Response])

  console.log(error?.message);
  
  return (
    <div className={style.import}>
      <div className={style.importContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {!imported && (
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
              //className={style.modal}
              className={`${style.modal}  `}
            >
              <div className={style.modalTop}>
                <h1>Enter Your Contract Address</h1>
                <p>
                  What is the adress of your ERC721 or ERC1155 contract on
                  mainnet network?
                </p>
                <img src={Close} alt="close" onClick={props.closeImport} />
              </div>
              <form  className={style.modalBody}>
                <div className={style.modalInput}>
                  <p style={{width:'fit-content'}}>Blockchain</p>
                  <select name="chain" onChange={inputHandler}>
                    {/* <option value="rinkeby">Rinkeby</option>
                    <option value="bsc testnet">BSC Testnet </option> */}
                    <option value="0x1">Ethereum</option>
                    <option value="0x61">Binance</option>

                  </select>
                </div>
                <div className={style.modalInput}>
                  <p>Address</p>
                  <input
                    type="text"
                    name="address"
                    value={userInput.address}
                    onChange={inputHandler}
                    placeholder="e.g 0x1ed3... or destination.eth"
                  />
                </div>
                <div className={style.modalBtns}>
                  <button
                    className={style.btn1}
                    disabled={isEmpty || isLoading}
                    onClick={importCollection}
                  >
                    Submit
                  </button>
                  <button className={style.btn2} onClick={props.closeImport}>
                    {' '}
                    Cancel
                  </button>
                </div>
                {/* @ts-ignore */}
               {/* <p style={{textAlign:'center',color:'red'}}> {error && error?.message??error?.data.error[0].msg}</p> */}
              </form>
            </motion.div>
          )}
          {imported && (
            <div
              className={`${style.modal} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop}>
                <h1>Congratulations</h1>
                <p>
                  You have successfully imported your collection, you can now
                  view the collection
                </p>
                <img src={Close} alt="close" onClick={props.closeImport} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <Link to="/" className={style.modalBtnSingle}>
                <button>View </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Import
