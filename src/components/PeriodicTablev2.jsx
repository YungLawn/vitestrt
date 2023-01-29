import * as THREE from 'three'
import React, {useRef, useEffect, useState, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import { elements, textures } from './Elements';
import { useCursor, Text } from '@react-three/drei';

const size = elements.length
// const tile = new THREE.boxGeometry()
const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const data = Array.from({ length: size }, () => ({ color:'#f0f0f0', scale: 1}))

function Boxes() {
    const [hovered, set] = useState()
    const [active, setActive] = useState();
    const meshRef = useRef()
    const prevRef = useRef()
    // useEffect(() => void (prevRef.current = hovered), [hovered])
  
    useFrame((state) => {
      const time = state.clock.getElapsedTime()
      // meshRef.current.rotation.x = Math.sin(time / 4)
      // meshRef.current.rotation.y = Math.sin(time / 2)
      let i = 0
  
    for(let c = 0;c < elements.length;c++) {
        const id = i++
            tempObject.position.set((elements[id].x * 1.5) - 14 , (elements[id].y * 1.5) - 10,0)
            // tempObject.rotation.y = Math.sin((c*0.1) + time) 
            // tempObject.rotation.z = tempObject.rotation.y * 2
            // if (hovered !== prevRef.Current) {
            //   ;(id === hovered ? tempColor.setRGB(10, 10, 10) : tempColor.set(data[id].color)).toArray(colorArray, id * 3)
            //   meshRef.current.geometry.attributes.color.needsUpdate = true
            // }
            const scale = (data[id].scale = id == hovered || active ? 1.5 : 1)
            tempObject.scale.setScalar(scale)
            tempObject.mater
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(id, tempObject.matrix)
          }
      meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, size]}
        onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
        onPointerOut={(e) => set(undefined)}>
        onPointerDown={(e) => (e.stopPropagation(), set(e.instanceId))}
            <boxGeometry args={[1, 1, 0.25]} />
            <meshLambertMaterial color={'#ffffff'}/>
        </instancedMesh >
    )
}

function PeriodicTablev2 () {
    return (  
        <mesh>
            <Boxes/>
            {/* <ElementText/> */}
        </mesh>
    )
}

export default PeriodicTablev2 ;