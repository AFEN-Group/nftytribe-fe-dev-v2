import React from 'react'
import Header from '../../components/Header/Header'
import Container from '../../components/Container/Container'
import style from './LP.module.scss'
import Logobg from './assets/logo-bg.svg'
import Logosm from './assets/logo-sm.svg'
import Coming from './assets/coming.svg'
import { motion } from 'framer-motion'
import Rocket from './assets/rocket.svg'
import dot1 from './assets/dot1.svg'
import dot2 from './assets/dot2.svg'
import icon1 from './assets/icon1.svg'
import icon2 from './assets/icon2.svg'
import icon3 from './assets/icon3.svg'
import user1 from './assets/user1.svg'
import user2 from './assets/user2.svg'
import user3 from './assets/user3.svg'
import user4 from './assets/user4.svg'
//import TextInput from '../../components/Inputs/TextInput'
import Offer from './components/Offer'

const LaunchPartners = () => {
  return (
    <>
      <Header />
      <Container>
        <div className={style.lp}>
          <div className={style.lpContent}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 1.25,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.1,
                    delay: 0.3,
                    scale: {
                      duration: 0.7,
                    },
                  },
                },
              }}
              className={style.lpHero}
            >
              <motion.img
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: [120, 0, 120],
                    // x: [-25, 0, -25],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 10.4,
                        ease: 'linear',
                      },
                    },
                  },
                }}
                className={style.dot1}
                src={dot1}
                alt="dot1"
              />
              <motion.img
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: [-90, 0, -90],
                    x: [-75, 0, 75, 0, -75],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 12.4,
                        ease: 'linear',
                      },
                      x: {
                        repeat: Infinity,
                        duration: 10.4,
                        ease: 'linear',
                      },
                    },
                  },
                }}
                className={style.dot2}
                src={dot2}
                alt="dot2"
              />
              <div className={style.logoBx}>
                <img src={Logobg} alt="logo" />
              </div>
              <motion.div className={style.comingBx}>
                <motion.img
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      //rotate: 15,
                      //scale: 2,
                    },
                    visible: {
                      scale: 1,
                      rotate: [
                        0,
                        2.5,
                        -1.2,
                        2.5,
                        -1.2,
                        2.5,
                        -1.2,
                        2.5,
                        -1.2,
                        2.5,
                        -1.2,
                        2.5,
                        -1.2,
                        0,
                      ],
                      transition: {
                        repeat: Infinity,
                        type: 'spring',
                        delay: 0.2,
                        duration: 9,
                      },
                    },
                  }}
                  className={style.coming1}
                  src={Coming}
                  alt="coming"
                />
                <img className={style.rocket} src={Rocket} alt="coming" />
              </motion.div>
            </motion.div>
            <div data-aos="fade-up" className={style.first}>
              <div className={style.fLeft}>
                <h1>Join the tribe that puts you first</h1>
                <p>
                  Become our launch partner and become the first to experience
                  nifty tribe and all our new features{' '}
                </p>
              </div>
              <div className={style.fRight}>
                <div className={style.fBoxes}>
                  <div className={style.fBx}>
                    <h3>Import collection 1st</h3>
                    <p>
                      Get to import your NFT collection before everyone else
                    </p>
                  </div>
                  <div className={style.fBx}>
                    <h3>Early access</h3>
                    <p>
                      Be amogts the first users to experience the platforms cool
                      ux.
                    </p>
                  </div>
                  <div className={style.fBx}>
                    <h3>Verification</h3>
                    <p>
                      Get that instant blue tick just by launching with our
                      platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" className={style.built}>
              <h1>Built on</h1>
              <div className={style.builtIcons}>
                <img src={icon1} alt="icon1" />
                <img src={icon2} alt="icon2" />
                <img src={icon3} alt="icon3" />
              </div>
            </div>
            <div data-aos="fade-up" className={style.meet}>
              <div className={style.formBx}>
                <iframe
                  title="form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfWeHMogrk6ZWWWEjik1slhZRYvjrHMrE2en1U7CuB3VW_1Gw/viewform?embedded=true"
                  width="100%"
                  height="800"
                  frameBorder="0"
                >
                  Loading…
                </iframe>
              </div>
            </div>
            {/* <div data-aos="fade-up" className={style.meet}>
              <h1>Interested in launching your collection?</h1>
              <h3>Let's meet you!</h3>
              <div className={style.formBx}>
                <form> */}
            {/* <div className={style.inputField}>
                    <p>Creator name</p>
                    <TextInput />
                  </div>
                  <div className={style.inputField}>
                    <p>Creator name</p>
                    <TextInput />
                  </div>
                  <div className={style.inputField}>
                    <p>Creator name</p>
                    <TextInput />
                  </div>
                  <div className={style.inputField}>
                    <p>Creator name</p>
                    <TextInput />
                  </div>
                  <div className={style.inputField}>
                    <p>Creator name</p>
                    <TextInput />
                  </div>
                  <div className={style.inputField}>
                    <p>Creator name</p>
                    <TextInput />
                  </div> */}
            {/* <div className={style.formBtn}>
                    <button>Submit</button>
                  </div>
                </form>
              </div>
            </div> */}
            <div data-aos="fade-up">
              {' '}
              <Offer />
            </div>
            <div data-aos="fade-up" className={style.partner}>
              <h1>Who can become a launch partner?</h1>
              <div className={style.pBoxes}>
                <div className={style.pBox}>
                  <div className={style.pImg}>
                    <img src={user1} alt="user" />
                  </div>
                  <div className={style.pInfo}>
                    <h2>@Aramide</h2>
                    <p>Independent NFT Artist on Opensea</p>
                  </div>
                </div>
                <div className={style.pBox}>
                  <div className={style.pImg}>
                    <img src={user2} alt="user" />
                  </div>
                  <div className={style.pInfo}>
                    <h2>@Zenga</h2>
                    <p>New NFT Artist on Opensea</p>
                  </div>
                </div>
                <div className={style.pBox}>
                  <div className={style.pImg}>
                    <img src={user3} alt="user" />
                  </div>
                  <div className={style.pInfo}>
                    <h2>@Top bunnies</h2>
                    <p>Project listed on secondary marketplace</p>
                  </div>
                </div>
                <div className={style.pBox}>
                  <div className={style.pImg}>
                    <img src={user4} alt="user" />
                  </div>
                  <div className={style.pInfo}>
                    <h2>@Avamnte </h2>
                    <p>Project yet to open presale</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" className={style.bottom}>
              <img src={Logosm} className={style.logoSm} alt="logo" />
              <motion.img
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    //rotate: 15,
                    //scale: 0,
                  },
                  visible: {
                    scale: 1,
                    rotate: [
                      0,
                      2.5,
                      -1.2,
                      2.5,
                      -1.2,
                      2.5,
                      -1.2,
                      2.5,
                      -1.2,
                      2.5,
                      -1.2,
                      2.5,
                      -1.2,
                      0,
                    ],
                    transition: {
                      repeat: Infinity,
                      type: 'spring',
                      delay: 0.2,
                      duration: 9,
                    },
                  },
                }}
                className={style.coming2}
                src={Coming}
                alt="coming"
              />
              <div className={style.tribersBtn}>
                <p>Tribers.niftytribe.io</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default LaunchPartners
