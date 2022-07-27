import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { Toaster } from 'react-hot-toast'

import useWeb3 from "./hooks/web3";
import Web3ContextProvider from "./context/Web3Context";

function App() {
  const AOS = require("aos");
  const web3Object = useWeb3();
  const data: any = UserConnect();
  const methods: any = useContractMethods();
  const { langState }: { langState: any } = useLanguage();
  useEffect(() => {
    AOS.init();
  }, [AOS]);
  return (

    <Web3ContextProvider>
      <LanguageContext.Provider value={langState}>
        <ContractContext.Provider value={methods}>
          <WalletContext.Provider value={data}>
            <>
              <div className="app">
                <Toaster />
                <Router>
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
                    <Route
                      path="/exploreBid/:collectionAddress/:id"
                      element={<ExploreBid />}></Route>
                    <Route path="/collections" element={<Collections />}></Route>

                    <Route
                      path="/collectionDetails/:collectionId"
                      element={<CollectionDetails />}></Route>
                    <Route
                      path="/collectionDashboard"
                      element={<CollectionDashboard />}></Route>
                    <Route
                      path="/createOptions"
                      element={<CreateItemOptions />}></Route>
                    <Route
                      path="/createItem/:chain/:itemType"
                      element={<CreateItems />}></Route>
                    <Route
                      path="/createCollectionOptions"
                      element={<CreateCollectionOptions />}></Route>
                    <Route
                      path="/createcollection/:chain"
                      element={<CreateCollection />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/editProfile" element={<EditProfile />}></Route>
                    <Route path="/about" element={<About />}></Route>

                    <Route path="/rewards" element={<Rewards />}></Route>
                    <Route path="/staking" element={<Staking />}></Route>
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
    </Web3ContextProvider>
  )

}

export default App;
