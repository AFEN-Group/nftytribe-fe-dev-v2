import React from 'react'
//import load from './assets/load3.gif'
import style from './Loader.module.scss'
import { CircularProgress } from '@material-ui/core'

const Loader = () => {
  return (
    <div className={style.loader}>
      {/* <img src={load} alt="loading..." /> */}
      <CircularProgress color="inherit" size="65px" />
    </div>
  )
}

export default Loader
