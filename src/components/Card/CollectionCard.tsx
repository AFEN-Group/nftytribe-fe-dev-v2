import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  const currentAddress: any = localStorage.getItem('currentAccount')
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
  return (
    <Link to={`/collectionDetails/${data?.nftData?.contract_address}`}>
      <div className={style.card}>
        <div className={style.cardContent}>
          <div className={style.cardImg}>
            {data?.nftData?.cardImage !== '' && (
              <img
                //src={user}
                src={`${data?.nftData?.cover_image?.includes('/ipfs') ||
                  data?.nftData?.cover_image?.includes('ipfs://')
                  ? getImage(data?.nftData?.cover_image)
                  : data?.nftData?.cover_image
                    ? data?.nftData?.cover_image
                    : user
                  }`}
                alt="collection"
                className={style.user}
              />
            )}
            {data?.nftData?.cardImage === '' && <img src={koala} alt="item" />}
          </div>
          {/* <div className={style.cardTop}>
            <img src={dots} alt="options" />
            <img src={like} alt="like" />
          </div> */}

          <div
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
            <div className={style.userInfo}>
              <img src={user} alt="user" />
              {data.nftData && (
                <p>{shortenAddress(data?.nftData?.contract_address)}</p>
              )}
              {/* <img src={arrow} alt="arrow" /> */}
            </div>
            <div className={style.itemInfo}>
              <p>{data?.nftData?.title}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
