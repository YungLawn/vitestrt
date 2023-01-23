import React, { useRef, useState } from "react";
import * as THREE from 'three';
import { useCursor, Text, useTexture} from '@react-three/drei';

function TextTest() {
    const name = (type) => `1-Hydrogen${type}.jpg`;
    const tex = new useTexture([])
    return ( 
        <meshLambertMaterial
        map={name}>

        </meshLambertMaterial>
     );
}

export default TextTest;