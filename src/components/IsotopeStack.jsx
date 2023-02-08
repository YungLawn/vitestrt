import * as React from 'react';
import * as THREE from 'three';
import { useSpring, animated} from "@react-spring/three";

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();
const tempColor = new THREE.Color()

const IsotopeStack = ({ data, active }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;
  const colorArray = React.useMemo(() => Float32Array.from(new Array(data.length).fill().flatMap((_, i) => tempColor.set(data[i]).toArray())), [])
  // const { positionOffset } = useSpring({
  //   positionOffset: active  ? 100 : 0,
  //   config: { tension: 200, friction: 12, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
  // });

  //   console.log(active)

  // update instance matrices only when needed
  React.useEffect(() => {
    const mesh = meshRef.current;

    // set the transform matrix for each instance
    for (let i = 0; i < numPoints; ++i) {
      // console.log(data[i])
      const x = 0;
      const y = 0;
      const z = (i * 0.3) + 0;

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [numPoints]);


    return (
        <animated.instancedMesh
        position={[0,0,0.5]}
        ref={meshRef}
        args={[null, null, numPoints]}
        frustumCulled={false}
        visible={active}
        >
        <boxGeometry attach="geometry" args={[1, 0.25, 1]}>
            <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
        </boxGeometry>
        <meshStandardMaterial attach="material" vertexColors/>
        </animated.instancedMesh>
    );

};

export default IsotopeStack;
