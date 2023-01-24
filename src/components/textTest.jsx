import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import * as THREE from 'three'

export default function TextTest( scale ) {
  const texture_1 = useLoader(TextureLoader, 'src/assets/textures/1-Hydrogen.jpg')
  const tile  = new THREE.BoxGeometry(0.99,0.99,0.25)
  const tex = new THREE.MeshLambertMaterial({map:texture_1});

  const mesh = useRef()
  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.005
  // })
  return (
    <mesh ref={mesh} geometry={tile} material={tex} scale={scale}/>
  )
}
