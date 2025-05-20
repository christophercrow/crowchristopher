import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls } from "@react-three/drei";

function AnimatedBlob({ color = "#47FFE9", speed = 2, distort = 0.45 }) {
  const mesh = useRef();
  useFrame((state) => {
    // Optional: Blob can gently rotate for more life
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() / 2) / 8;
    mesh.current.rotation.y = Math.cos(state.clock.getElapsedTime() / 2) / 8;
  });
  return (
    <mesh ref={mesh} scale={2.1}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function Blob3D() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "480px",
        height: "480px",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 3.2], fov: 75 }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <AnimatedBlob color="#8afff3" speed={2.1} distort={0.5} />
      </Suspense>
      {/* Optionally, let users interact: <OrbitControls enableZoom={false} /> */}
    </Canvas>
  );
}
