"use client"; // Required for client-side React features

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Component for the particle system, memoized for performance
const ParticleSystem = React.memo(() => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate particle positions
  const particles = useMemo(() => {
    const count = 5000; // Current particle count
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.random() * 10 + 5; 
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Animate particles (system rotation)
  // useFrame is efficient for continuous animations
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.025} color="white" sizeAttenuation transparent opacity={0.75} />
    </points>
  );
});
ParticleSystem.displayName = 'ParticleSystem'; // Optional: for better debugging

// Component to handle scene-wide effects like camera control, memoized for performance
const SceneController = React.memo(() => {
  // useFrame is efficient for continuous camera updates
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 2.5, 0.05);
    camera.lookAt(0, 0, 0); 
  });
  return null; 
});
SceneController.displayName = 'SceneController'; // Optional: for better debugging

// Main ThreeCanvas component
const ThreeCanvas = () => {
  return (
    <Canvas 
      dpr={[1, 2]} // Set device pixel ratio for performance optimization
      camera={{ position: [0, 0, 15], fov: 75 }}
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
      <ambientLight intensity={0.7} />
      <ParticleSystem />
      <SceneController />
    </Canvas>
  );
};

export default ThreeCanvas;
