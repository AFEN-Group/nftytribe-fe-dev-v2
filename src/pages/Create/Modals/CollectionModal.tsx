import { useState } from 'react'
//import useState from 'react-usestateref'
import { Link } from 'react-router-dom'
import style from '../Create.module.scss'
import Close from '../assets/close.svg'
import Happy from '../assets/happy.svg'
//import { CircularProgress } from '@material-ui/core'

const CollectionModal = (props: any) => {
  //const [err, setErr] = useState(0)

  return (
    <div className={style.cm}>
      <div className={style.cmContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          {/* {!props.created && ( */}
          <div
            className={`${style.modal} animate__animated animate__zoomInUp `}
          >
            <div className={style.modalTop}>
              <h1>Congratulations</h1>
              <p>
                You have successfully created your collection{' '}
                <strong>{props.newCollection}</strong>, you can now view the
                collection.
              </p>
              <img src={Close} alt="close" onClick={props.closeModal} />
            </div>
            <div className={style.modalBody2}>
              <div className={style.successImg}>
                <img src={Happy} alt="success" />
              </div>
            </div>
            <Link to="/profile" className={style.modalBtnSingle}>
              <button>View Profile</button>
            </Link>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default CollectionModal
