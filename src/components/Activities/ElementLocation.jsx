import React, {Suspense, useState, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {Stats, Stars, useCursor, OrbitControls} from '@react-three/drei';
import { useSpring, animated} from "@react-spring/three";
import { BoxGeometry, MeshLambertMaterial } from "three";
import { elements, textures } from './data/Elements';

const mat = new MeshLambertMaterial({color:'#ffffff'});
const wrongTile = new MeshLambertMaterial({color:'#f00'});
const tile = new BoxGeometry(1, 1, 0.25);
const key = new BoxGeometry(2, 2, 0.5);

const ElementTile = ( {material, button} ) => {
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const { scale } = useSpring({
        scale: active || hover ? 1.5 : 1,
        config: { tension: 200, friction: 12, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
    });

    if( button ) {
    return (
            <animated.mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={ active ? material : mat }
            scale={scale} />
        )
    }
    else {
        return (
            <animated.mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={active ? wrongTile : mat}
            scale={scale}
            />
        )
    }
}

const Key = (materials, buttons) => {
    for(let i = 0; i < buttons.length; i++) {
        // console.log(buttons[i])
        if (buttons[i].isOn) {
            return (
                <mesh
                    geometry ={key}
                    material={materials[i]}
                    position={[0,4,0]}
                />
            )
        }
    }
}

const Table = ( {textures, elements, buttons} ) => {
    const Table = useRef();
    return (
        <>
            {Key(textures, buttons)}
            <mesh>
                {
                elements.map((element, index) =>
                <group ref={Table} position={[(element.x - 9.5) * 1.55, (element.y - 5.75) * 1.55, 0]} key={element.id}>
                    <ElementTile material={textures[index]} button={buttons[index].isOn}/>
                </group>
                )}
            </mesh>
        </>

    )
}

export default function ElementLocation( {buttons} ) {
    return(
        <div className='canvaswrapper'>
            <Canvas camera={{ fov: 30, position:[0,0,30] }}>
                <OrbitControls
                    minPolarAngle={Math.PI / -1}
                    maxPolarAngle={Math.PI / 1}
                    minAzimuthAngle = {Math.PI / -1}
                    maxAzimuthAngle = {Math.PI / 1}
                    minDistance = {10}
                    maxDistance = {60}
                />

                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <Suspense fallback={<> <h1>Loading</h1></>}>
                    <Table textures={textures} elements={elements} buttons={buttons}/>
                </Suspense>

                <Stars/>
                <Stats showPanel={4}/>
            </Canvas>
        </div>
    )
}

