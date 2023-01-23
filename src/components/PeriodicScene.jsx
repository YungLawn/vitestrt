import React, {Suspense, useRef} from 'react';
import * as THREE from 'three'
import {Canvas, useFrame} from '@react-three/fiber';
import {Stats, Stars} from '@react-three/drei';
import PeriodicTable from './PeriodicTable';
import PeriodicTablev2 from './PeriodicTablev2';
import tablev2 from './tablev2/tablev2';
import TextTest from './textTest';
// import Universe from './Universe';
// import Grid from './components/Grid';
import SpecialControls from './SpecialControls';


export default function PeriodicScene() {
    const Table = useRef();
    return(
    <div className='canvaswrapper'>
        {/* <div className='controls'>
            <button> Press Me! </button>
        </div> */}
        <Canvas camera={{ fov: 30, position:[0,0,40] }}>
            
                <SpecialControls/>
        
                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                {/* <group ref={Table} position={[-14.25, -11.5, 0]} rotation={[0,0,0]}>
                    <PeriodicTable/>
                </group>     */}

                <Suspense>
                <group ref={Table} position={[0, 0, 0]} rotation={[0,0,0]}>
                    {/* <PeriodicTable/> */}
                    <TextTest/>
                    {/* <PeriodicTablev2/> */}
                    {/* <tablev2/> */}
                </group>  
                </Suspense>
                              

                <Stars/>
                <Stats showPanel={4}/>
                {/* <Grid size={10} /> */}
        </Canvas>
    </div>

    
    )
}

