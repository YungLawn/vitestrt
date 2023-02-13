import {useEffect, useRef, useMemo} from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();
const tempColor = new THREE.Color()

const IsotopeStack = ({ data, active }) => {
  const meshRef = useRef();
  const numPoints = data.length;
  const colorArray = useMemo(() => Float32Array.from(new Array(data.length).fill().flatMap((_, i) => tempColor.set(data[i]).toArray())), [])
  const [{ offsetz }] = useSpring({ offsetz: 1, config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 } }, [active])


  // update instance matrices only when needed
  useEffect(() => {
    const mesh = meshRef.current;

    // set the transform matrix for each instance
    for (let i = 0; i < numPoints; ++i) {
      // console.log(data[i])
      const x = 0;
      const y = 0;
      const z = (i * 0.3);

      scratchObject3D.position.set(x, y, z);
      // scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [numPoints]);


    return (
        <a.instancedMesh
        position={[0,0,0.5]}
        ref={meshRef}
        args={[null, null, numPoints]}
        // frustumCulled={false}
        visible={active}
        >
          <boxGeometry attach="geometry" args={[1, 1, 0.25]}>
              <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
          </boxGeometry>
          <meshStandardMaterial attach="material" vertexColors/>
        </a.instancedMesh>
    );

};

export default IsotopeStack;
