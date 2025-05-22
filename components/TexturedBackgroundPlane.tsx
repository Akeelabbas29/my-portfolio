"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber'; // Removed useThree
import * as THREE from 'three';

const TexturedBackgroundPlane = React.memo(() => {
  const meshRef = useRef<THREE.Mesh>(null!);
  // const { viewport } = useThree(); // Removed as viewport was not used

  // Store original vertex positions
  const originalPositions = useMemo(() => {
    if (meshRef.current) {
      return new Float32Array(meshRef.current.geometry.attributes.position.array);
    }
    return null;
  }, [meshRef.current?.geometry.attributes.position.array]); // Dependency on the array itself

  // Create a procedural texture
  const texture = useMemo(() => {
    const width = 256;
    const height = 256;
    const data = new Uint8Array(width * height * 3);
    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const stride = (j * width + i) * 3;
        data[stride] = (i % 32 < 16) ? 50 : 150;
        data[stride + 1] = (j % 32 < 16) ? 50 : 150;
        data[stride + 2] = 100;
      }
    }
    const tex = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
    tex.needsUpdate = true;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // Parameters for interaction
  const intensity = 1.5; // Max displacement height (world Y units)
  const falloff = 3.0;   // How quickly effect diminishes

  useFrame((state) => {
    if (!meshRef.current || !originalPositions) return;

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry; // Cast for PlaneGeometry
    const positions = geometry.attributes.position.array as Float32Array;

    // Mouse coordinates mapped to plane's local space (before rotation and scaling)
    // The plane geometry is 10x10 units.
    // Mouse pointer.x and pointer.y are in NDC space (-1 to 1).
    // We map this to the plane's original dimensions.
    const planeHalfWidth = geometry.parameters.width / 2; // 10 / 2 = 5
    const planeHalfHeight = geometry.parameters.height / 2; // 10 / 2 = 5
    
    // state.pointer gives normalized coordinates.
    // We want to map these to the local coordinates of the plane *before* it's rotated.
    // The plane's definition <planeGeometry args={[10, 10, ...]} /> is in its own XY space.
    // Mouse X should correspond to plane's X.
    // Mouse Y should correspond to plane's Y.
    const mouseXLocal = state.pointer.x * planeHalfWidth;
    const mouseYLocal = state.pointer.y * planeHalfHeight;


    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions[i];     // Original local x of vertex
      const oy = originalPositions[i + 1]; // Original local y of vertex
      const oz = originalPositions[i + 2]; // Original local z of vertex (should be 0)

      // Calculate distance from vertex (in its local XY) to the mapped mouse position
      const dx = ox - mouseXLocal;
      const dy = oy - mouseYLocal; // Corrected from previous notes. Mouse Y maps to plane's local Y.
      const distSq = dx * dx + dy * dy;

      // Gaussian falloff for displacement.
      // Displacement occurs along the plane's local Z axis (which is world Y after rotation).
      const displacement = intensity * Math.exp(-falloff * distSq / 10); // Adjusted scaling factor for distSq

      // Apply displacement to the Z component (local Z of the plane)
      positions[i + 2] = oz + displacement;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals(); // Recompute normals for correct lighting
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} scale={[20, 20, 20]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
});

TexturedBackgroundPlane.displayName = 'TexturedBackgroundPlane';

export default TexturedBackgroundPlane;
