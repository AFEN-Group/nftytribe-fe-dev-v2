import Container from '../../components/Container/Container1'
import Header from '../../components/Header/Header'
import FAQs from './components/FAQs'
import Hero from './components/Hero'
import Marketplace from './components/Marketplace'
import TopProjects from './components/TopProjects'
import Trending from './components/Trending'

const Home = () => {
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
    </>
  )
}

export default Home
