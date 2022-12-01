import React, { useEffect, useMemo, useState } from 'react'
import Container from '../../components/Container/ContainerG'
import Protected from '../../hooks/AxiosConfig/axiosInstance'
import UseAxios from '../../hooks/AxiosConfig/useAxios'
//import Footer from '../../components/Footer/Footer'
// import Header from '../../components/Header/Header'
import FAQs from './components/FAQs'
import Hero from './components/Hero'
import Marketplace from './components/Marketplace'
import TopProjects from './components/TopProjects'
import Trending from './components/Trending'

const Home = () => {

  const [items, setItems] = useState([])
  const [featured, setFeatured] = useState()
  const {Response,error,fetchData,loading}=UseAxios()
  const [isLoading,setIsLoading]=useState(false)
 
  console.log(loading)
 const render= useMemo(()=>{
    if(Response){
      // console.log('rendering');
      
      const {data}:any= Response;
      setItems(data?.data.collectibles);
      setIsLoading(false)
    }
  },[Response])
  return (
    <>
      {/* <Header /> */}
      <Hero isLoading={isLoading} featured={items[0]}  />
      <Container>
        <Trending data={items} />
        <TopProjects />
      </Container>
      <Marketplace />
      <FAQs />

    </>
  )
}

export default React.memo(Home)
