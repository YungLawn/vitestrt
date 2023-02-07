import React, {Suspense, useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {Stats, Stars} from '@react-three/drei';
import { MeshLambertMaterial } from "three";
import { elements, textures } from './Elements';
import PeriodicTable from './PeriodicTable';
import ElementLocation from './ElementLocationActivity';
import ControlPanel from './PeriodicTableControlPanel';
import SpecialControls from './SpecialControls';
import '../styles/controls.css'

export default function PeriodicScene() {
    const [buttons, setButtons] = useState(
        Array.from({ length: elements.length }, (_, i) => ({
            id: elements[i].id,
            isOn: false,
            x: elements[i].x,
            y: elements[i].y
        }))
      );

    const handleButtonState = newButtons => {setButtons(newButtons);};
    const [TextToggle, setTextToggle] = useState(true);
    const [IsotopeToggle, setIsotopeToggle] = useState(true);
    return(
        <>
        <div className='controls'>
            <div className='controlpanel'>
                <ControlPanel elements={elements} handleButtonState={handleButtonState}/>

                <label>
                <input
                    type="checkbox"
                    checked={TextToggle}
                    onChange={() => setTextToggle(!TextToggle)}
                />
                Text!
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={IsotopeToggle}
                    onChange={() => setIsotopeToggle(!IsotopeToggle)}
                />
                Isotopes!
            </label>
            </div>

        </div>
        <div className='canvaswrapper'>
            <Canvas camera={{ fov: 30, position:[0,0,30] }}>
                <SpecialControls />

                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <Suspense fallback={<></>}>
                    {PeriodicTable(TextToggle, IsotopeToggle, textures, elements, buttons)}
                    {/* {InstancedStack(textures)} */}
                    {/* <PeriodicTablev2/> */}
                    {/* {ElementLocation(textures, elements, buttons)} */}
                </Suspense>

                <Stars/>
                <Stats showPanel={0}/>
            </Canvas>
        </div>
        </>
    )
}

