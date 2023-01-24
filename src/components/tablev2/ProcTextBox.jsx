import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useMemo } from 'react'
import { Canvas, createPortal, useFrame } from '@react-three/fiber'
import { Text, Shadow, OrthographicCamera, OrbitControls } from '@react-three/drei'

export default function ProcTextBox({ children }) {
  const cam = useRef()
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('white')
    const target = new THREE.WebGLMultisampleRenderTarget(2048, 2048, {
      format: THREE.RGBFormat,
      stencilBuffer: false
    })
    target.samples = 6
    return [scene, target]
  }, [])

  useFrame((state) => {
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <OrthographicCamera ref={cam} position={[0, 0, 0.1]} zoom={10} />
      {createPortal(
        <Text
          color="#171717"
          fontSize={50}
          maxWidth={60}
          lineHeight={5}
          letterSpacing={0}
          // textAlign="left"
          text={children}
          anchorX="center"
          anchorY="middle">
          {children}
        </Text>,
        scene
      )}
      <mesh>
        {/* <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} /> */}
        <boxBufferGeometry args={[1, 1, 0.25]} />
        <meshStandardMaterial attach="material" map={target.texture} />
      </mesh>
    </>
  )
}
