//import React from 'react'
import style from '../About.module.scss'
//import Card from '../../../components/Card/ItemCard'
//import m1 from '../assets/member1.svg'
import m1 from '../team/01.svg'
import m2 from '../team/02.svg'
import m3 from '../team/03.svg'
import m4 from '../team/04.svg'
import m5 from '../team/05.svg'
import m6 from '../team/06.svg'
import m7 from '../team/07.svg'
import m8 from '../team/08.svg'
import m9 from '../team/9.svg'
//import m10 from '../assets/member10.svg'
import Marquee from 'react-fast-marquee'

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
            <Marquee
              speed={110}
              pauseOnHover={true}
              gradient={false}
              className={style.slidesContainer}
            >
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m1} alt="member" />
                  <div className={style.mText}>
                    <h3>Deborah-Ojengbede</h3>
                    <p>(CEO, Afen)</p>
                  </div>

                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m2} alt="member" />
                  <div className={style.mText}>
                    <h3>Keith Mali Chung </h3>
                    <p>(Growth lead, Afen)</p>
                  </div>
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m3} alt="member" />
                  <div className={style.mText}>
                    <h3>Oliva-Nwoko Excel</h3>
                    <p>(Growth lead, Afen)</p>
                  </div>
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m9} alt="member" />
                  <div className={style.mText}>
                    <h3>Onyinye Okoye</h3>
                    <p>(Project Mgr, Nfty Tribe)</p>
                  </div>
                </div>
                <div className={style.overlay}></div>
              </div>

            </Marquee>

            <Marquee
              speed={110}
              pauseOnHover={true}
              direction="right"
              gradient={false}
              className={style.slidesContainer}
            >
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m4} alt="member" />
                  <div className={style.mText}>
                    <h3>Akinpelu Bukola</h3>
                    <p>(Design lead, Afen)</p>
                  </div>
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m5} alt="member" />
                  <div className={style.mText}>
                    <h3>Oliva-Nwoko Flourish</h3>
                    <p>(QA Officer, Afen)</p>
                  </div>
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m6} alt="member" />
                  <div className={style.mText}>
                    <h3>Olagoke Juwon </h3>
                    <p>(Product Designer, Nfty Tribe)</p>
                  </div>
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m7} alt="member" />
                  <div className={style.mText}>
                    <h3>David Saba</h3>
                    <p>(Branding & Design, Afen)</p>
                  </div>
                </div>
              </div>
              <div className={style.trSlide}>
                <div className={style.teamMember}>
                  <img src={m8} alt="member" />
                  <div className={style.mText}>
                    <h3>Ayo Niyi</h3>
                    <p>(FrontEnd lead, Nfty Tribe)</p>
                  </div>
                </div>
              </div>

            </Marquee>
          </div>
        </div>
      </div>
    </>
  )
}

export default Team
