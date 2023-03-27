import React, { Suspense, useState, useRef } from 'react';
import { Canvas} from '@react-three/fiber';
import { Stats, Stars, useCursor, OrbitControls} from '@react-three/drei';
import { useSpring, animated} from "@react-spring/three";
import { BoxGeometry } from "three";
import { elements, textures } from './data/Elements';
import IsotopeStack from './Utilities+Helpers/IsotopeStack';
const tile = new BoxGeometry(1, 1, 0.5);
const key = new BoxGeometry(3, 3, 0.5);

const ElementTile = ( {element, material, selected} ) => {
    // console.log(selected)
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const isotopeMap = element.isotopes;
    const { scale } = useSpring({
        scale: active || hover || selected ? 1.5 : 1,
        config: { tension: 200, friction: 12, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
    });

    return (
        <>
            <animated.mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={material}
            scale={scale}
            />
            <IsotopeStack data={isotopeMap} active={selected}/>
        </>)
}

const Keys = ( {materials} ) => {
    // console.log(materials)
    return (
        <group>
            <mesh
                geometry ={key}
                material={materials[0]}
                position={[-4,10,0]}
            />
            <mesh
                geometry ={key}
                material={materials[1]}
                position={[0,10,0]}
            />
            <mesh
                geometry ={key}
                material={materials[2]}
                position={[4,10,0]}
            />
        </group>
    )
}

function PeriodicTable( {elementData} ) {
    // elementData[0].sorted = true;
    const Table = useRef();
    return (
        <>
            {/* <Keys materials={textures}/> */}
            <mesh>
                {elements.map((element, index) =>
                <group ref={Table} position={[(element.x - 9.5) * 1.55, (element.y - 4.75) * 1.55, 0]} key={element.id}>
                    <ElementTile element={elements[index]} material={textures[index]} selected={elementData[index]}/>
                </group>
                )}
            </mesh>
        </>

    )
}

export default function IsotopeActivity( { elementData} ) {
    // console.log(elementData)
    return(
        <div className='canvaswrapper'>
            <Canvas camera={{ fov: 30, position:[0,0,50] }}>
                <OrbitControls
                    minPolarAngle={Math.PI / -1}
                    maxPolarAngle={Math.PI / 1}
                    minAzimuthAngle = {Math.PI / -2}
                    maxAzimuthAngle = {Math.PI / 2}
                    minDistance = {10}
                    maxDistance = {60}
                />

                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <Suspense fallback={<></>}>
                    <PeriodicTable elementData={elementData}/>
                </Suspense>

                <Stars/>
                {/* <Stats showPanel={4}/> */}
            </Canvas>
        </div>
    )
}

