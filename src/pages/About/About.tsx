import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Header from '../../components/Header/Header'
import Hero from './components/Hero'
import style from './About.module.scss'
import vidImg from './assets/vidImg.svg'
import Info from './components/Info'
import Container from '../../components/Container/Container'
import ContainerG from '../../components/Container/ContainerG'
import Team from './components/Team'
//
import logo1 from './assets/logo1.svg'
import logo2 from './assets/logo2.svg'
import logo3 from './assets/logo3.svg'
import logo4 from './assets/logo4.svg'
import logo5 from './assets/logo5.svg'

const About = () => {
  const [themeState] = useContext<any>(ThemeContext)
  const dark = themeState.dark
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <Container>
        <div className={style.sectionTwo}>
          <h1>
            Welcome to the{' '}
            <span className={dark === 'true' ? 'yellowTxt' : 'blueTxt'}>
              tribe!
            </span>{' '}
          </h1>
          <div className={style.sTwoVid}>
            <img src={vidImg} alt="vid" />
          </div>
        </div>

        <Info />
        <div className={style.sectionFour}>
          <h1>Our angels</h1>
          <div className={style.angels}>
            <div className={style.angel}>
              <img src={logo1} alt="logo1" />
            </div>
            <div className={style.angel}>
              <img src={logo2} alt="logo2" />
            </div>
            <div className={style.angel}>
              <img src={logo3} alt="logo3" />
            </div>
            <div className={style.angel}>
              <img src={logo1} alt="logo1" />
            </div>
            <div className={style.angel}>
              <img src={logo4} alt="logo4" />
            </div>
            <div className={style.angel}>
              <img src={logo1} alt="logo1" />
            </div>
            <div className={style.angel}>
              <img src={logo5} alt="logo5" />
            </div>
          </div>
        </div>
      </Container>
      <ContainerG>
        <Team />
      </ContainerG>
    </>
  )
}

export default About
