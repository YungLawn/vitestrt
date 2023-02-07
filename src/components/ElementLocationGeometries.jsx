import React, { useRef, useState } from "react";
import { BoxGeometry, MeshLambertMaterial } from "three";
import { useCursor } from '@react-three/drei';

const mat = new MeshLambertMaterial({color:'#ffffff'});
const wrongTile = new MeshLambertMaterial({color:'#ff0000'});
const tile = new BoxGeometry(0.99, 0.99, 0.25);
const key = new BoxGeometry(2, 2, 0.5);


const ElementTile = (material, button) => {
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    if( button ) {
    return (
        <>
            <mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={ active ? material : mat }
            scale={active || hover ? 1.5 : 1} />
        </>)
    }
    else {
        return (
            <mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={active ? wrongTile : mat}
            scale={hover || active ? 1.5 : 1}
            />)
    }
}

const Key = (materials, buttons) => {
    for(let i = 0; i < buttons.length; i++) {
        console.log(buttons[i])
        if (buttons[i].isOn) {
            return (
                <mesh
                    geometry ={key}
                    material={materials[i]}
                    position={[0,4,0]}
                >
                </mesh>
            )
        }
    }

}

export default function ElementLocation(textures, elements, buttons) {
    const Table = useRef();
    return (
        <>
            {Key(textures, buttons)}
            <mesh>
                {
                elements.map((element, index) =>
                <group ref={Table} position={[(element.x - 9.5) * 1.5, (element.y - 5.75) * 1.5, 0]} key={element.id}>
                    {ElementTile(textures[index], buttons[index].isOn)}
                </group>
                )}
            </mesh>
        </>

    )
}