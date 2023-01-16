import Navbar from "./components/Navbar"
// import Pricing from "./pages/Pricing"
import Home from "./components/Home"
import About from "./components/About"
import PeriodicScene from "./components/PeriodicScene";
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/Table" element={<PeriodicScene/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
