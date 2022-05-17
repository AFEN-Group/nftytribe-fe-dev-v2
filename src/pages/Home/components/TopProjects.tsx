//import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Home.module.scss'
import arrow1 from '../assets/arrow.svg'
import arrow2 from '../assets/arrowgr.svg'
import arrow3 from '../assets/arrowred.svg'
import user from '../assets/user.svg'
import nArrow from '../assets/arrow-right.svg'

const TopProjects = () => {
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
              <div>
                <p>24hr %</p>
              </div>
              <div>
                <p>7d %</p>
              </div>
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
              <Link to="/collectionDetails/01" className={style.tableItem}>
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
              </Link>
              <div className={style.tableItem}>
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
              </div>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>3</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  {/* <img src={arrow3} alt="arrow-down" /> */}
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
              </div>
              <div className={style.tableItem}>
                <div className={style.collectionInfo}>
                  <p>4</p>
                  <img src={user} alt="user" className={style.user} />
                  <p>Avengers</p>
                  {/* <img src={arrow3} alt="arrow-down" /> */}
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
              </div>
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
