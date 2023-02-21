import React, {Suspense, useState, useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {Stats, Stars, useCursor, OrbitControls} from '@react-three/drei';
import { useSpring, animated} from "@react-spring/three";
import { BoxGeometry, MeshLambertMaterial } from "three";
import { elements, textures } from './Elements';

const mat = new MeshLambertMaterial({color:'#ffffff'});
const wrongTile = new MeshLambertMaterial({color:'#f00'});
const tile = new BoxGeometry(1, 1, 0.25);
const key = new BoxGeometry(3, 3, 0.5);

const ElementTile = ( {material, selected} ) => {
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const { scale } = useSpring({
        scale: active || hover ? 1.5 : 1,
        config: { tension: 200, friction: 12, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
    });

    if( selected ) {
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

const Key = ({texture}) => {
    return (
        <mesh
            geometry ={key}
            material={texture}
            position={[0,5.5,0]}
        />
    )
}

const Table = ( {textures, elements, selection} ) => {
    const Table = useRef();
    const SelectionKey = [];
    for(let i=0;i<elements.length;i++) {
        if ( selection ==i) SelectionKey.push(true);
        else SelectionKey.push(false);
    }
    return (
        <>
            <Key texture={textures[selection]}/>
            <mesh>
                {
                elements.map((element, index) =>
                <group ref={Table} position={[(element.x - 9.5) * 1.55, (element.y - 5.75) * 1.55, 0]} key={element.id}>
                    <ElementTile material={textures[index]} selected={SelectionKey[index]}/>
                </group>
                )}
            </mesh>
        </>
    )
}

export default function EleLocByIndex( {elementIndex} ) {
    return(
        <div className='canvaswrapper'>
            <Canvas camera={{ fov: 30, position:[0,0,30] }}>
                <OrbitControls
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                    minAzimuthAngle = {Math.PI / -10}
                    maxAzimuthAngle = {Math.PI / 10}
                    minDistance = {10}
                    maxDistance = {60}
                    enablePan= {false}
                />

                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <Suspense fallback={<> <h1>Loading</h1></>}>
                    <Table textures={textures} elements={elements} selection={elementIndex}/>
                </Suspense>

                <Stars/>
                <Stats showPanel={4}/>
            </Canvas>
        </div>
    )
}

