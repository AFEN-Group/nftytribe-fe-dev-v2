//import React from 'react'
import style from '../About.module.scss'
//import Card from '../../../components/Card/ItemCard'
import m1 from '../assets/member1.svg'
import m2 from '../assets/member2.svg'
import m3 from '../assets/member3.svg'
import m4 from '../assets/member4.svg'
import m5 from '../assets/member5.svg'
import m6 from '../assets/member6.svg'
import m7 from '../assets/member7.svg'
import m8 from '../assets/member8.svg'
import m9 from '../assets/member9.svg'
import m10 from '../assets/member10.svg'

const Team = () => {
  return (
    <>
      <div className={style.trending} id="team">
        <div className={style.trContent}>
          <div className={style.trTop}>
            <h1>
              <span>Meet the team</span>{' '}
            </h1>
          </div>
          <div className={style.trBody}>
            <div className={style.trSlides1}>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m1} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m2} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m3} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m4} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m5} alt="member" />
                </div>
              </div>

              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m1} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m2} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m3} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m4} alt="member" />
                </div>
              </div>
            </div>

            <div className={style.trSlides2}>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m6} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m7} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m8} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m9} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m10} alt="member" />
                </div>
              </div>

              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m6} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m7} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m8} alt="member" />
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m9} alt="member" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Team
