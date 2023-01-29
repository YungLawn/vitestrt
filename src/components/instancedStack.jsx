import ReactDOM from 'react-dom'
import React, { useRef, useMemo, useState, useEffect } from 'react'

import * as THREE from 'three'
import niceColors from 'nice-color-palettes'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

import './styles.css'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const colors = new Array(10000).fill().map(() => niceColors[2][Math.floor(Math.random() * 5)])

const WIDTH = 100
const HEIGHT = 100
const SIZE = 1
const NB_ITEMS = WIDTH * HEIGHT
const centerGroup = [(-WIDTH + SIZE) / 2, 0, (-HEIGHT + SIZE) / 2]

export default function InstancedStack({ mesh, scalex, hovered }) {
  if (!mesh) return

  let i = 0

  console.log(mesh.getPositionFromMatrix)

  for (let x = 0; x < WIDTH; x++)
    for (let y = 0; y < HEIGHT; y++) {
      const id = i++

      if (id === hovered) {
        tempObject.position.set(x, 0, y)
        tempObject.scale.set(1, scalex, 1)
        tempObject.updateMatrix()
        mesh.setMatrixAt(hovered, tempObject.matrix)
        mesh.instanceMatrix.needsUpdate = true
      }
    }
}

function Boxes() {
  const [hovered, setHover] = useState()
  const meshRef = useRef()

  const colorArray = useMemo(
    () => Float32Array.from(new Array(NB_ITEMS).fill().flatMap((_, i) => tempColor.set(colors[i]).toArray())),
    []
  )

  // const { scalex } = useSpring({ scalex: 1 })

  const [{ scalex }] = useSpring({ scalex: 1, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } }, [hovered])

  useEffect(() => {
    scalex.start({
      from: { scalex: hovered ? 1 : 8 },
      to: { scalex: hovered ? 8 : 1 },
      reset: true,
      onChange: (props, spring) => {
        updateInstancedMeshMatrices({ mesh: meshRef.current, scalex: spring.get(), hovered })
      }
    })

    let i = 0

    for (let x = 0; x < WIDTH; x++)
      for (let y = 0; y < HEIGHT; y++) {
        const id = i++

        tempObject.position.set(x, 0, y)
        tempObject.scale.set(1, 1, 1)
        tempObject.updateMatrix()
        meshRef.current.setMatrixAt(id, tempObject.matrix)
      }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <a.instancedMesh
      ref={meshRef}
      args={[null, null, NB_ITEMS]}
      onPointerMove={(e) => setHover(e.instanceId)}
      onPointerOut={(e) => setHover(undefined)}>
      <boxBufferGeometry attach="geometry" args={[0.9, 0.9, 0.9]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxBufferGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </a.instancedMesh>
  )
}

