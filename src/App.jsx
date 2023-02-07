import Navbar from "./components/Navbar"
// import Pricing from "./pages/Pricing"
import Home from "./components/Home"
import About from "./components/About"
import ElementLocation from "./components/ElementLocation";
import PeriodicScene from "./components/PeriodicScene";
import { Route, Routes } from "react-router-dom"
import StarRating from "./components/StarRating";

function App() {



  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          <Route path="/about" element={<StarRating/>} />
          <Route path="/Table" element={<ElementLocation/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
