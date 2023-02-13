import {useEffect, useRef, useMemo} from 'react';
import * as THREE from 'three';
import { animated, useSpring } from '@react-spring/three'

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();
const tempColor = new THREE.Color()

function updateInstancedMeshMatrices({ mesh, offsetZ, active }) {
  if (!mesh) return

  console.log(mesh.getPositionFromMatrix)

  for (let i = 0; i < numPoints; ++i) {
    // console.log(data[i])
    const x = 0;
    const y = 0;
    const z = (i * 0.3);

    scratchObject3D.position.set(x, y, offsetZ);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
    mesh.instanceMatrix.needsUpdate = true
  }
}

const IsotopeStack = ({ data, active }) => {
  const meshRef = useRef();
  const numPoints = data.length;
  const colorArray = useMemo(() => Float32Array.from(new Array(data.length).fill().flatMap((_, i) => tempColor.set(data[i]).toArray())), [])
  //const [{ offsetZ }] = useSpring({ offsetz: 1, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } }, [active])
  const { offsetZ } = useSpring({
    offsetZ: active ? [0,0,0.5] : [0,0,100],
    config: { tension: 57, friction: 13, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
  });

  // update instance matrices only when needed
  useEffect(() => {
    const mesh = meshRef.current;

    // offsetZ.start({
    //   from: { offsetZ: hovered ? 1 : 100 },
    //   to: { offsetZ: hovered ? 100 : 1 },
    //   reset: true,
    //   onChange: (props, spring) => {
    //     updateInstancedMeshMatrices({ mesh: meshRef.current, offsetZ: spring.get(), hovered })
    //   }
    // })

    // set the transform matrix for each instance
    for (let i = 0; i < numPoints; ++i) {
      // console.log(data[i])
      const x = 0;
      const y = 0;
      const z = (i * 0.3);

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });


    return (
        <animated.instancedMesh
        position={offsetZ}
        ref={meshRef}
        args={[null, null, numPoints]}
        // frustumCulled={false}
        // visible={active}
        >
          <boxGeometry attach="geometry" args={[1, 1, 0.25]}>
              <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
          </boxGeometry>
          <meshStandardMaterial attach="material" vertexColors/>
        </animated.instancedMesh>
    );

};

export default IsotopeStack;
