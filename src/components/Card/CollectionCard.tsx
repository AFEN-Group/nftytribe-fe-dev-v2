import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import user from './assets/user3.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'
//import Logo from './assets/logo.svg'
// import eth from './assets/eth.svg'
// import Web3 from 'web3'

const CollectionCard = (data: any) => {
  const currentAddress: any = sessionStorage.getItem('currentAccount')
  const getImage = (uri: any) => {
    let url
    if (uri.includes('ipfs/')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
    } else if (uri.includes('ipfs://')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
    }
    return url
  }
 console.log(data);
 
  console.log(data.data.coverImage);
  
  const navigate=useNavigate()
  const open=()=>{
    navigate(`/collectionDetails/${data?.data?.id}`)
  }
  return (
    <div onClick={open}>
      <div className={style.card}>
        <div className={style.cardContent}>
          <div className={style.cardImg}>
            
              <img
                //src={user}
                src={data.data.coverImage}
                alt="collection"
                className={style.user}
              />
            
            {data?.data?.coverImage === '' && <img src={koala} alt="item" />}
          </div>
          <div onClick={(e)=>e.stopPropagation()} className={style.cardTop}>
            {/* <img src={dots} alt="options" /> */}
            <img src={like} alt="like" />
          </div>

          <div
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
            <div className={style.userInfo}>
              <img src={user} alt="user" />
              {data.data && (
                <p>{shortenAddress(data?.data?.contractAddress)}</p>
              )}
              {/* <img src={arrow} alt="arrow" /> */}
            </div>
            <div className={style.itemInfo}>
              <p>{data?.data?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard
