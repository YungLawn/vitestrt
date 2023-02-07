import React, { useRef, useState } from "react";
import { BoxGeometry, MeshLambertMaterial } from "three";
import { useCursor } from '@react-three/drei';
import IsotopeStack from "./IsotopeStack";

const mat = new MeshLambertMaterial({color:'#ffffff'});
const tile = new BoxGeometry(0.99, 0.99, 0.25);

const ElementTile = (element, textToggle, isotopeToggle, material, button) => {
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const isotopeMap = element.isotopes;
    // console.log(isotopeMap)
    if( button ) {
    return (
        <>
            <mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={textToggle ? material : mat}
            scale={active || hover ? 1.5 : 1} />
            <IsotopeStack  data={isotopeMap} active={active && isotopeToggle}/>
        </>)
    }
    else {
        return (
            <mesh
            ref={ElementTile}
            geometry={tile}
            material={textToggle || button ? material : mat}
            scale={1}
            />)
    }
}

// const IsotopeStack = (isotopeMap, pactive, toggle) => {
//     if(pactive && toggle) {
//         return (
//             isotopeMap.map((isotope, index) =>
//             <mesh
//             scale={1}
//             position={[0,0,(index * 0.3) + 0.25]}
//             geometry={tile}
//             material={isotope}
//             />)
//         )
//     }
//     return;
// }

export default function PeriodicTable(textToggle, elementToggle, textures, elements, buttons) {
    const Table = useRef();
    return (
        <mesh>
            {elements.map((element, index) =>
            <group ref={Table} position={[(element.x - 9.5) * 1.5, (element.y - 5.75) * 1.5, 0]} key={element.id}>
                {ElementTile(element, textToggle, elementToggle, textures[index], buttons[index].isOn)}
            </group>
            )}
        </mesh>
    )
}