import React, {useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {Stats, Stars} from '@react-three/drei';
import PeriodicTable from './PeriodicTable';
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
        <Canvas camera={{fov: 30, position:[0,0,40] }}>
            
                <SpecialControls/>
        
                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <group ref={Table} position={[-14.25, -11.5, 0]} rotation={[0,0,0]}>
                    <PeriodicTable/>
                </group>               

                <Stars/>
                <Stats showPanel={0}/>
                {/* <Grid size={10} /> */}
        </Canvas>
    </div>

    
    )
}

