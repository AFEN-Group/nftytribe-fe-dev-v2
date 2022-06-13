import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { publicRequest } from '../../../utils/requestMethods'
import style from '../Home.module.scss'
import arrow1 from '../assets/arrow.svg'
import arrow2 from '../assets/arrowgr.svg'
//import arrow3 from '../assets/arrowred.svg'
import user from '../assets/user.svg'
import nArrow from '../assets/arrow-right.svg'

const TopProjects = () => {
  //const [number, setNumber] = useState(1)
  let itemNumber = 1
  const [collections, setCollections] = useState([])
  useEffect(() => {
    getCollections()
  }, [])

  const getCollections = async () => {
    const resp = await publicRequest.get(`/collections`)
    console.log(resp.data.data)
    //setCollections(resp.data.data.splice(0, 9))
    setCollections(resp.data.data)
  }

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
    <>
      <div className={style.topPro}>
        <div className={style.topProCotent}>
          <div className={style.topProTop}>
            <h1>
              <span>Top projects</span>{' '}
            </h1>
            <div className={style.topProFilters}>
              <div className={style.tpFilter}>
                <p>All categories</p>
                <img src={arrow1} alt="filter" />
              </div>
              <div className={style.tpFilterC}>
                <p>All chains</p>
                <img src={arrow1} alt="filter" />
              </div>
              <div className={style.tpFilter}>
                <p>7 days</p>
                <img src={arrow1} alt="filter" />
              </div>
            </div>
          </div>
          <div className={style.topProTable}>
            <div className={style.tpTableTitles}>
              <p>Collection</p>
              <div>
                <p>Volume</p>
              </div>
              {/* <div>
                <p>24hr %</p>
              </div>
              <div>
                <p>7d %</p>
              </div> */}
              <div>
                <p>Floor price</p>
              </div>
              <div>
                <p>Owners</p>
              </div>
              <div>
                <p>Items</p>
              </div>
            </div>
            <div className={style.tpTableItems}>
              {/* <Link to="/collectionDetails/01" className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>1</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  <img src={arrow2} alt="arrow-up" />
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </Link> */}
              {!collections
                ? null
                : collections.map((collection: any, i) => {
                  return (
                    collection.title && (
                      <Link
                        to={`/collectionDetails/${collection.contract_address}`}
                        className={style.tableItem}
                        key={collection._id}
                      >
                        <div className={style.collectionInfo}>
                          <p>{itemNumber++}</p>
                          <img
                            //src={user}
                            src={`
                          ${collection?.cover_image?.includes('/ipfs') ||
                                collection?.cover_image?.includes('ipfs://')
                                ? getImage(collection?.cover_image)
                                : collection?.cover_image
                                  ? collection?.cover_image
                                  : user
                              }
                         
                        `}
                            alt="collection"
                            className={style.user}
                          />
                          <p>{collection?.title || 'Untitled'}</p>
                          {/* <img src={arrow2} alt="arrow-up" /> */}
                        </div>
                        <div className={style.itemAlign}>
                          {/* <p>61,555</p> */}
                          <p>0</p>
                        </div>
                        {/* <div className={style.itemAlign}>
                            <p>
                              <span>+70%</span>
                            </p>
                          </div>
                          <div className={style.itemAlign}>
                            <p>
                              <span>+800%</span>
                            </p>
                          </div> */}
                        <div className={style.itemAlign}>
                          {/* <p>1 ETH</p> */}
                          <p>0</p>
                        </div>
                        <div className={style.itemAlign}>
                          {/* <p>2k</p> */}
                          <p>0</p>
                        </div>
                        <div className={style.itemAlign}>
                          {/* <p>500</p> */}
                          <p>0</p>
                        </div>
                      </Link>
                    )
                  )
                })}

              {/* <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>2</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  <img src={arrow3} alt="arrow-down" />
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div> */}
              {/* <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>3</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                 \
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div> */}
              {/* <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>4</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                 
                </div>
                <div className={style.itemAlign}>
                  <p>61,555</p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+70%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>
                    <span>+800%</span>
                  </p>
                </div>
                <div className={style.itemAlign}>
                  <p>1 ETH</p>
                </div>
                <div className={style.itemAlign}>
                  <p>2k</p>
                </div>
                <div className={style.itemAlign}>
                  <p>500</p>
                </div>
              </div> */}
              <div className={style.line1}></div>
            </div>
            <div className={style.more}>
              <Link to="/collectionDashboard" className={style.moreBtn}>
                <p>See full list</p>
                <img src={nArrow} alt="more" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopProjects
