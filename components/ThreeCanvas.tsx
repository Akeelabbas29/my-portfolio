"use client"; // Required for client-side React features

import React from 'react';
import { Canvas } from '@react-three/fiber';

import TexturedBackgroundPlane from './TexturedBackgroundPlane'; 

// Main ThreeCanvas component
const ThreeCanvas = () => {
  return (
    <Canvas 
      dpr={[1, 2]} // Set device pixel ratio for performance optimization
      camera={{ position: [0, 0, 5], fov: 75 }} // Adjusted camera for plane
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100vh', 
        zIndex: -1, 
        background: 'transparent' 
      }}
    >
      <ambientLight intensity={0.5} /> {/* Kept at 0.5 as per initial thought */}
      <directionalLight position={[8, 3, 5]} intensity={1.5} /> {/* Adjusted position and intensity */}
      <TexturedBackgroundPlane /> 
    </Canvas>
  );
};

export default ThreeCanvas;
