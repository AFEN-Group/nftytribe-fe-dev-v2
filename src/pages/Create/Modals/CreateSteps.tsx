//import { useState, useContext } from 'react'
//import { ThemeContext } from '../../../context/ThemeContext'
//import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from '../Create.module.scss'
import Close from '../assets/close.svg'
import Happy from '../assets/happy.svg'
import { CircularProgress } from '@material-ui/core'
import { motion } from 'framer-motion'

const CreateSteps = (props: any) => {
  //const [err, setErr] = useState(0)
  //const [themeState] = useContext<any>(ThemeContext)
  //const dark = themeState.dark
  return (
    <div className={style.cm}>
      <div className={style.cmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {/* {!props.created && ( */}
          {props.step === 1 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.7,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.1,
                    //delay: 0.3,
                    scale: {
                      duration: .01,
                    },
                  },
                },
              }}
              className={`${style.modalSm} `}
            >
              <div className={style.modalTop2}>
                <h1> Minting your NFT</h1>
                <p>Minting your NFT on NftyTribe marketplace..</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                {/* <div className={style.successImg}>
                    <img src={Happy} alt="success" />
                  </div> */}
              </div>
              <div className={style.modalBtnSingle2}>
                <button disabled={props.isLoading} onClick={props.handleSteps}>
                  {!props.isLoading ? (
                    'Mint'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
          {props.step === 2 && (
            <div
              className={`${style.modalSm} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Step 2 : Approve</h1>
                <p>Approve NftyTribe to use your wallet</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                {/* <div className={style.successImg}>
                    <img src={Happy} alt="success" />
                  </div> */}
              </div>
              <div className={style.modalBtnSingle2}>
                <button disabled={props.isLoading} onClick={props.handleSteps}>
                  {!props.isLoading ? (
                    'Approve'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          )}
          {props.step === 3 && (
            <div
              className={`${style.modalSm} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Step 3 : Sign Sale Order</h1>
                <p>Put your item(s) on sale.</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                {/* <div className={style.successImg}>
                    <img src={Happy} alt="success" />
                  </div> */}
              </div>
              <div className={style.modalBtnSingle2}>
                <button disabled={props.isLoading} onClick={props.handleSteps}>
                  {!props.isLoading ? (
                    'Sign Sale Order'
                  ) : (
                    <CircularProgress color="inherit" size="20px" />
                  )}
                </button>
              </div>
            </div>
          )}
          {props.step === 4 && (
            <div
              className={`${style.modal} animate__animated animate__zoomInUp `}
            >
              <div className={style.modalTop2}>
                <h1>Item Created!</h1>
                <p>You can now view your item on the explore page.</p>
                <img src={Close} alt="close" onClick={props.handleClose} />
              </div>
              <div className={style.modalBody2}>
                <div className={style.successImg}>
                  <img src={Happy} alt="success" />
                </div>
              </div>
              <div className={style.modalBtnSingle2}>
                <Link to="/explore">
                  <button>View Explore Page</button>
                </Link>
              </div>
            </div>
          )}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default CreateSteps
