import { useState } from 'react'
import { Link } from 'react-router-dom'
import { shortenAddress } from '../../utils/formatting'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import user from './assets/user3.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'
//import Logo from './assets/logo.svg'
import eth from './assets/eth.svg'
import Web3 from 'web3'

const ItemCard = (data: any) => {
  const [showFull, setShowFull] = useState(false)
  const getImageUrl = (uri: any) => {
    let url
    if (uri.includes('ipfs/')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs/')[1]}`
    } else if (data?.nftData?.cardImage.includes('ipfs://')) {
      // eslint-disable-next-line
      url = 'https://ipfs.io/ipfs/' + `${uri.split('ipfs://')[1]}`
    }
    return url
  }
  // if (data) {
  //   const nftPrice = data?.nftData?.price
  //   //.toString()
  //   console.log('price>>>>', data)
  // }
  const currentAddress: any = localStorage.getItem('currentAccount')

  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        {/* <div className={style.cardImgBx}> */}
        <Link
          //to={`/explore/22/22`}
          to={
            data?.nftData?.is_lazy_mint
              ? `/explore/${data?.nftData?.collection_address}/${data?.nftData?.signature}?lazy_mint=true`
              : `/explore/${data?.nftData?.collection_address}/${data?.nftData?.token_id}`
          }
        >
          <div className={style.cardImg}>
            {data?.nftData?.cardImage !== '' && (
              <img
                //className={style.imgBg}
                src={
                  data?.nftData?.cardImage.includes('/ipfs') ||
                    data?.nftData?.cardImage.includes('ipfs://')
                    ? `${getImageUrl(data?.nftData?.cardImage)}`
                    : data?.nftData?.cardImage
                }
                alt="item"
              />
            )}
            {data?.nftData?.cardImage === '' && (
              <img
                //className={style.imgBg}
                src={koala}
                alt="item"
              />
            )}
            {/* <img src={koala} alt="item" /> */}
          </div>
          <div className={style.cardTop}>
            <img src={dots} alt="options" />
            <img src={like} alt="like" />
          </div>
        </Link>
        {!showFull && (
          <div
            //className={style.descBox1}
            className={`${style.descBox1} animate__animated animate__fadeIn `}
          >
            <div className={style.userInfo} onClick={() => setShowFull(true)}>
              <img src={user} alt="user" />
              {data.nftData && (
                <p>{shortenAddress(data?.nftData?.wallet_address)}</p>
              )}
              <img src={arrow} alt="arrow" />
            </div>
            <div className={style.itemInfo}>
              <p>{data?.nftData?.title}</p>
            </div>
          </div>
        )}
        {showFull && (
          <div
            className={`${style.descBox2} animate__animated animate__fadeIn `}
          >
            <div className={style.itemInfo2}>
              <div
                className={style.itemSubtxt}
                onClick={() => setShowFull(false)}
              >
                <h3>{data?.nftData?.title}</h3>
                <div className={style.userBx}>
                  <img src={user} alt="user" />
                  {data.nftData && (
                    <p>{shortenAddress(data?.nftData?.wallet_address)}</p>
                  )}
                </div>
              </div>
              <Link
                //to={`/explore/22/22`}
                to={
                  data?.nftData?.is_lazy_mint
                    ? `/explore/${data?.nftData?.collection_address}/${data?.nftData?.signature}?lazy_mint=true`
                    : `/explore/${data?.nftData?.collection_address}/${data?.nftData?.token_id}`
                }
                className={style.buyBtn}
              >
                <button>
                  {data?.nftData?.marketplace_type === 2 &&
                    data?.nftData?.wallet_address !== currentAddress
                    ? 'Bid'
                    : data?.nftData?.marketplace_type !== 2 &&
                      data?.nftData?.wallet_address !== currentAddress
                      ? 'Buy'
                      : data?.nftData?.wallet_address === currentAddress
                        ? 'View'
                        : ''}
                </button>
              </Link>
            </div>
            <div className={style.actionBx}>
              <div className={style.aBcontent}>
                <div className={style.aleft}>
                  <img src={eth} alt="eth" />
                  {data?.nftData?.price ? (
                    <p>
                      {' '}
                      {Web3.utils.fromWei(data?.nftData?.price.toString(), 'ether') ||
                        ''}{' '}
                    </p>
                  ) : (
                    <p>0.00</p>
                  )}
                  {/* <p>2800 Afen</p> */}
                </div>
                <div className={style.aright}>
                  <p>$2800 </p>
                </div>
              </div>
              <div className={style.aleft}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCard
