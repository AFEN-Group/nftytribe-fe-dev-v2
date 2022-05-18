import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.scss'
import './theme.scss'
import 'animate.css'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import ExploreSingle from './pages/Explore/ExploreSingle/ExploreSingle'
import Collections from './pages/Collections/MyCollections'
import CollectionDetails from './pages/CollectionDetails/CollectionDetails'
import CollectionDashboard from './pages/CollectionDashboard/CollectionDashboard'
import CreateItemOptions from './pages/Create/CreateItemOptions'
import CreateItems from './pages/Create/CreateItems'
import Profile from './pages/Profile/Profile'

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route
              path="/explore/:collectionAddress/:id"
              element={<ExploreSingle />}
            ></Route>
            <Route path="/collections" element={<Collections />}></Route>

            <Route
              path="/collectionDetails/:id"
              element={<CollectionDetails />}
            ></Route>
            <Route
              path="/collectionDashboard"
              element={<CollectionDashboard />}
            ></Route>
            <Route
              path="/createOptions"
              element={<CreateItemOptions />}
            ></Route>
            <Route
              path="/createItem/:chain/:itemType"
              element={<CreateItems />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
      <div className="app_info">
        <p>Mobile version still in progress, please view on larger device.</p>
      </div>
    </>
  )
}

export default App
