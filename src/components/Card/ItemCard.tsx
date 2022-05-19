import { Link } from 'react-router-dom'
import koala from './assets/kl.png'
import dots from './assets/dots.svg'
import like from './assets/like.svg'
import user from './assets/user.svg'
import arrow from './assets/icon.svg'
import style from './Card.module.scss'

const ItemCard = (data: any) => {
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
  return (
    <Link
      //to={`/explore/22/22`}
      to={
        data?.nftData?.is_lazy_mint
          ? `/explore/${data?.nftData?.collection_address}/${data?.nftData?.signature}?lazy_mint=true`
          : `/explore/${data?.nftData?.collection_address}/${data?.nftData?.token_id}`
      }
    >
      <div className={style.card}>
        <div className={style.cardContent}>
          <div className={style.cardImgBx}>
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
          </div>
          <div className={style.descBox1}>
            <div className={style.userInfo}>
              <img src={user} alt="user" />
              <p>Michael Carson</p>
              <img src={arrow} alt="arrow" />
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

export default ItemCard
