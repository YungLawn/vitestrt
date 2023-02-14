import React, { Suspense, useState, useRef } from 'react';
import { Canvas} from '@react-three/fiber';
import { Stats, Stars, useCursor} from '@react-three/drei';
import { useSpring, animated} from "@react-spring/three";
import { BoxGeometry } from "three";
import { elements, textures } from './Elements';
import IsotopeStack from "./IsotopeStack";
import SpecialControls from './SpecialControls';
import '../styles/controls.css'

const tile = new BoxGeometry(0.99, 0.99, 0.25);

const ElementTile = ( {element, material, button} ) => {
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const isotopeMap = element.isotopes;
    const { scale } = useSpring({
        scale: active || hover ? 1.5 : 1,
        config: { tension: 200, friction: 12, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
    });
    const { offsetZ } = useSpring({
        offsetZ: active ? [0,0,0] : [0,0,-0.25],
        config: { tension: 1000, friction: 50, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
      });
    // console.log(isotopeMap)

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
            // position={offsetZ}
            />
            <IsotopeStack data={isotopeMap} active={button}/>
        </>)
}

function PeriodicTable( {textures, elements, buttons} ) {
    const Table = useRef();
    return (
        <mesh>
            {elements.map((element, index) =>
            <group ref={Table} position={[(element.x - 9.5) * 1.5, (element.y - 5.75) * 1.5, 0]} key={element.id}>
                <ElementTile element={elements[index]} material={textures[index]} button={buttons[index].isOn}/>
            </group>
            )}
        </mesh>
    )
}

export default function PeriodicScene( {buttons} ) {
    return(
        <div className='canvaswrapper'>
            <Canvas camera={{ fov: 30, position:[0,0,30] }}>
                <SpecialControls />

                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <Suspense fallback={<></>}>
                    <PeriodicTable textures={textures} elements={elements} buttons={buttons}/>
                </Suspense>

                <Stars/>
                <Stats showPanel={0} className="stats" parent={parent}/>
            </Canvas>
        </div>
    )
}

