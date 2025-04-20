
import {BrowserRouter,Route,Routes} from "react-router-dom"

import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import TrackOrderPage from "./components/TrackOrderPage"
import OrderForm from "./components/OrderForm"
import AdminPanel from "./components/AdminPanel"


const App=()=>{
  return(<BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/order/:id" element={<OrderForm/>}/>
      <Route path="/track-orders" element={<TrackOrderPage/>}/>
      <Route path="/admin" element={<AdminPanel/>}/>
    </Routes>
  </BrowserRouter>)
}

export default App;