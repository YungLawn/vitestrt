import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useMemo } from 'react'
import { Canvas, createPortal, useFrame } from '@react-three/fiber'
import { Text, Shadow, OrthographicCamera, OrbitControls } from '@react-three/drei'

const tile = new THREE.BoxGeometry(0.99, 0.99, 0.3);

export default function ProcTextBox({ element, num, mass }) {
  const cam = useRef()
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('white')
    const target = new THREE.WebGLRenderTarget(1024, 1024, {
      format: THREE.RGBAFormat,
      stencilBuffer: false
    })
    target.samples = 0
    return [scene, target]
  }, [])

  useFrame((state) => {
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <OrthographicCamera ref={cam} position={[0, 0, 0.1]} zoom={50} />
      {createPortal(
        <>
          <Text
            position={[12,-2,0]}
            color="#171717"
            fontSize={15}>
            {element}
          </Text>
          <Text
            position={[-12,-3,0]}
            color="#171717"
            fontSize={10}>
            {num}
          </Text>
          <Text
            position={[-2,4,0]}
            color="#171717"
            fontSize={7.5}>
            {mass}
          </Text>
        </>
        ,
        scene
      )}
      <mesh geometry={tile}>
        {/* <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} /> */}
        <meshLambertMaterial attach="material" map={target.texture} />
      </mesh>
    </>
  )
}
