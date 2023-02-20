import { Route, Routes } from "react-router-dom"
import React, {Suspense, useState, useRef} from 'react';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import { elements } from "./components/Elements";
// import StarRating from "./components/StarRating";
import ElementLocation from "./components/ElementLocation";
import EleLocByIndex from "./components/EleLocByIndex";
import ControlPanel from "./components/PeriodicTableControlPanel";
import PeriodicSandbox from "./components/PeriodicSandbox";
// import PeriodicSandbox from "./components/PeriodicSandboxNoButt";
import About from "./components/About"
import './styles/controls.css'

function App() {
  const [buttons, setButtons] = useState(
    Array.from({ length: elements.length }, (_, i) => ({
        id: elements[i].id,
        isOn: false,
        x: elements[i].x,
        y: elements[i].y
    }))
  );
  const handleButtonState = newButtons => {setButtons(newButtons);};

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/table" element={
            <>
              <div className='controls'>
                <div className='controlpanel'>
                    <ControlPanel elements={elements} handleButtonState={handleButtonState}/>
                </div>
              </div>
              <PeriodicSandbox buttons={buttons}/>
            </>
          }/>
          {/* <Route path="/activity" element={<ElementLocation buttons={buttons} />}/> */}
          <Route path="/activity" element={<EleLocByIndex elementIndex={0}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
