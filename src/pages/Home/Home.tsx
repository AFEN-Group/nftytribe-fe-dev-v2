import { useEffect } from 'react'
import Container from '../../components/Container/ContainerG'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import FAQs from './components/FAQs'
import Hero from './components/Hero'
import Marketplace from './components/Marketplace'
import TopProjects from './components/TopProjects'
import Trending from './components/Trending'

const Home = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  return (
    <>
      <Header />
      <Hero />
      <Container>
        <Trending />
        <TopProjects />
      </Container>
      <Marketplace />
      <FAQs />
      <Footer />
    </>
  )
}

export default Home
