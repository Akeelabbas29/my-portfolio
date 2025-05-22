"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TexturedBackgroundPlane = React.memo(() => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Store original vertex positions
  const originalPositions = useMemo(() => {
    if (meshRef.current) {
      return new Float32Array(meshRef.current.geometry.attributes.position.array);
    }
    return null;
  }, [meshRef.current?.geometry.attributes.position.array]);

  // Restored procedural stripe texture
  const texture = useMemo(() => {
    const width = 256;
    const height = 256;
    const data = new Uint8Array(width * height * 3);
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const stride = (j * width + i) * 3;
        // Simple stripes example:
        data[stride] = (i % 32 < 16) ? 50 : 150; // R
        data[stride + 1] = (j % 32 < 16) ? 50 : 150; // G
        data[stride + 2] = 100; // B
      }
    }
    const tex = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
    tex.needsUpdate = true; // Crucial for the texture to update
    tex.wrapS = THREE.RepeatWrapping; // Ensure texture repeats
    tex.wrapT = THREE.RepeatWrapping; // Ensure texture repeats
    return tex;
  }, []);

  // Parameters for interaction (mouse-driven vertex displacement)
  const intensity = 1.5; 
  const falloff = 3.0;   

  // Mouse interaction logic for vertex displacement
  useFrame((state) => {
    if (!meshRef.current || !originalPositions) return; // Guard clause

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position.array as Float32Array;

    // Map mouse coordinates to plane's local space
    const planeHalfWidth = geometry.parameters.width / 2; 
    const planeHalfHeight = geometry.parameters.height / 2;
    
    const mouseXLocal = state.pointer.x * planeHalfWidth;
    const mouseYLocal = state.pointer.y * planeHalfHeight;

    // Iterate through vertices and apply displacement
    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions[i];     
      const oy = originalPositions[i + 1]; 
      const oz = originalPositions[i + 2]; 

      const dx = ox - mouseXLocal;
      const dy = oy - mouseYLocal; 
      const distSq = dx * dx + dy * dy;

      // Gaussian falloff for displacement
      const displacement = intensity * Math.exp(-falloff * distSq / 10); 

      positions[i + 2] = oz + displacement; // Apply displacement to Z (world Y)
    }

    geometry.attributes.position.needsUpdate = true; // Notify Three.js of updates
    geometry.computeVertexNormals(); // Recompute normals for correct lighting
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} scale={[20, 20, 20]}>
      <planeGeometry args={[10, 10, 64, 64]} /> {/* Segments for deformation */}
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
});

TexturedBackgroundPlane.displayName = 'TexturedBackgroundPlane';

export default TexturedBackgroundPlane;
