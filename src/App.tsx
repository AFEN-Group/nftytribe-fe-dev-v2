import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import WalletContext from "./context/WalletContext";
import UserConnect from "./web3-Service/UserConnect";
import ContractContext from "./context/ContractContext";
import useContractMethods from "./web3-Service/contractMethods";
import "./App.scss";
import "./theme.scss";
import "aos/dist/aos.css";
import "animate.css";
//import AOS from 'aos'

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Explore from "./pages/Explore/Explore";
//import ExploreSingle from './pages/Explore/ExploreSingle/ExploreSingle'
import ExploreBuy from "./pages/Explore/ExploreSingle/ExploreSingleBuy";
import ExploreBid from "./pages/Explore/ExploreSingle/ExploreSingleBid";
import Collections from "./pages/Collections/MyCollectionsFull";
import CollectionDetails from "./pages/CollectionDetails/CollectionDetails";
import CollectionDashboard from "./pages/CollectionDashboard/CollectionDashboard";
import CreateItemOptions from "./pages/Create/CreateItemOptions";
import CreateItems from "./pages/Create/CreateItems";
import CreateCollection from "./pages/Create/CreateCollection";
import CreateCollectionOptions from "./pages/Create/CreateCollectionOptions";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import Footer from "./components/Footer/Footer";
//import LaunchPartners from './pages/LaunchPartners/LaunchPartners'
import Rewards from "./pages/Rewards/Rewards";
import Staking from "./pages/Staking/Staking";
import NotFound from './pages/NotFound/NotFound'
import useLanguage, { LanguageContext } from "./context/Language";
import toast, { Toaster } from 'react-hot-toast'
import Protected from './hooks/AxiosConfig/axiosInstance'
import useWeb3 from "./hooks/web3";
import Web3ContextProvider from "./context/Web3Context";
import Header from "./components/Header/Header";
import { UserContext } from "./context/UserContext";
import UseAxios from "./hooks/AxiosConfig/useAxios";
import { ChainContext } from "./context/chain";

function App() {
  const AOS = require("aos");
  const web3Object = useWeb3();
  const data: any = UserConnect();
  const methods: any = useContractMethods();
  const { langState }: { langState: any } = useLanguage();
  useEffect(() => {
    AOS.init();
  }, [AOS]);

  const { userState,setUserState}= useContext(UserContext)
  const {error:getError,loading:getLoading,Response:response,fetchData:getData}=UseAxios()
  const {error:usererror,loading:loading,Response:user,fetchData:getuser}=UseAxios()
  const { error: chianerror, loading: loadingChains, Response: chains, fetchData: getChains} = UseAxios()

  useEffect(()=>{
    if(user) {
      const {data}= user
      setUserState({...userState,user:data})
    }
     if(user && userState?.currentAccount){
       login()
     }
  },[user])
  useEffect(()=>{
    if(usererror && userState?.currentAccount){
    create()
  }
  },[usererror])
  
  const getUser= async(data:any)=>{
    console.log(data);
    
  await  getuser({
      method:'get',
      url:`api/user/${data}`,
      axiosInstance:Protected(null)
    })
  
  }
   
  const create= async()=>{
    try {

    
      await getData({
        method:'post',
        url:'/api/user/signup',
        axiosInstance:Protected(null),
        requestConfig:{
          walletAddress:userState.currentAccount
        }
      })
      console.log(response);
      
      sessionStorage.setItem("walletType",userState?.walletType)
      setTimeout(() => {
        // window.location.reload()
      }, 500)
      toast.success(`Wallet connected successfully.`,
        { duration: 5000 })
    } catch (err) {
      console.log(err)
     
    } 
  }
  console.log(sessionStorage.getItem('token'));
  
  const login= async()=>{
    try {

      const user = {
        params: {
          wallet_address: userState.currentAccount,
        },
      }
      await getData({
        method:'post',
        url:'/api/user/login',
        axiosInstance:Protected(null),
        requestConfig:{
          walletAddress:userState.currentAccount
        }
      })
      console.log(response);
      
      sessionStorage.setItem("walletType",userState?.walletType)
      setTimeout(() => {
        // window.location.reload()
      }, 500)
      toast.success(`Wallet connected successfully.`,
        { duration: 5000 })
    } catch (err) {
      console.log(err)
     
    } 
  }
console.log(userState);


  useEffect(()=>{
    const current= sessionStorage.getItem('currentAccount') 
    console.log(current);
      getChains(
        {
          method:'get',
          url:'/api/chain',
          axiosInstance:Protected(sessionStorage.getItem('token'))
        }
      )
      getUser(sessionStorage.getItem('currentAccount'))

  },[userState?.currentAccount])

  /* @ts-ignore */
  const chain= chains?.data
  console.log('these are the chains:' ,chain);
  
  
  
  return (

    <Web3ContextProvider>
      <ChainContext.Provider value={chain}>???
      <LanguageContext.Provider value={langState}>
        <ContractContext.Provider value={methods}>
          <WalletContext.Provider value={data}>
            <>
              <div className="app">
                <Toaster />
                <Router>
                  <Header/>
                  <Routes>

                    <Route path="/" element={<Home />}></Route>
                    <Route path="/explore" element={<Explore />}></Route>
                    {/* <Route
                  path="/explore/:collectionAddress/:id"
                  element={<ExploreSingle />}
                ></Route> */}
                    <Route
                      path="/exploreBuy/:collectionAddress/:id"
                      element={<ExploreBuy />}></Route>
                    {/* <Route
                      path="/exploreBid/:collectionAddress/:id"
                      element={<ExploreBid />}></Route> */}
                    <Route path="/collections" element={<Collections />}></Route>

                    <Route
                      path="/collectionDetails/:collectionId"
                      element={<CollectionDetails />}></Route>
                    {/* <Route
                      path="/collectionDashboard"
                      element={<CollectionDashboard />}></Route> */}
                    {/* <Route
                      path="/createOptions"
                      element={<CreateItemOptions />}></Route> */}
                    {/* <Route
                      path="/createItem/:chain/:itemType"
                      element={<CreateItems />}></Route> */}
                    <Route
                      path="/createCollectionOptions"
                      element={<CreateCollectionOptions />}></Route> 
                    <Route
                      path="/createcollection/:chain"
                      element={<CreateCollection />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/editProfile" element={<EditProfile />}></Route>
                    <Route path="/about" element={<About />}></Route>

                    {/* <Route path="/rewards" element={<Rewards />}></Route> */}
                    {/* <Route path="/staking" element={<Staking />}></Route> */}
                    <Route path="*" element={<NotFound />}></Route>
                  </Routes>
                  <Footer />
                </Router>
              </div>

              {/* <div className="app_info">
              <p>
                Mobile version still in progress, please view on larger device.
              </p>
            </div> */}
            </>
          </WalletContext.Provider>
        </ContractContext.Provider>
      </LanguageContext.Provider>
        </ChainContext.Provider>
    </Web3ContextProvider>
  )

}

export default App;
