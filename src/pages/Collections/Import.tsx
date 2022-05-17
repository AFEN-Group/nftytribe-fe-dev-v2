//import React from 'react'
import style from './Collections.module.scss'
import Close from './assets/close.svg'

const Import = (props: any) => {
  return (
    <div className={style.import}>
      <div className={style.importContent}>
        <div
          className={`${style.overlay} animate__animated animate__fadeIn `}
        ></div>
        <div className={style.modalContainer}>
          <div
            //className={style.modal}
            className={`${style.modal} animate__animated animate__zoomInUp `}
          >
            <div className={style.modalTop}>
              <h1>Enter Your Contract Address</h1>
              <p>
                What is the adress of your ERC721 or ERC1155 contract on mainnet
                network?
              </p>
              <img src={Close} alt="close" onClick={props.closeImport} />
            </div>
            <div className={style.modalBody}>
              <div className={style.modalInput}>
                <p>Blockchain</p>
                <select name="chain">
                  <option value="rinkeby">Rinkeby</option>
                  <option value="ropsten">Ropsten</option>
                </select>
              </div>
              <div className={style.modalInput}>
                <p>Address</p>
                <input
                  type="text"
                  placeholder="e.g 0x1ed3... or destination.eth"
                />
              </div>
              <div className={style.modalBtns}>
                <button className={style.btn1}>Submit</button>
                <button className={style.btn2} onClick={props.closeImport}>
                  {' '}
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Import
