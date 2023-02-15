import React from 'react';
import {OrbitControls} from '@react-three/drei';

export default function SpecialControls() {
    return (
        <OrbitControls
            minPolarAngle={Math.PI / -1}
            maxPolarAngle={Math.PI / 1}
            minAzimuthAngle = {Math.PI / -2}
            maxAzimuthAngle = {Math.PI / 2}
            minDistance = {10}
            maxDistance = {60}
        >
        </OrbitControls>
    )
}