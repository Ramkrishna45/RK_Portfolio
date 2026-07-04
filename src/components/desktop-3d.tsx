"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows, Text, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function StylizedDesk() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 20,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Desk Surface */}
      <RoundedBox args={[6, 0.2, 3]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
      </RoundedBox>

      {/* Monitor */}
      <group position={[0, 1.2, -0.5]}>
        <RoundedBox 
          args={[3.5, 2, 0.1]} 
          radius={0.05}
          onPointerOver={() => setHovered("Projects")}
          onPointerOut={() => setHovered(null)}
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        >
          <meshStandardMaterial color={hovered === "Projects" ? "#444" : "#222"} roughness={0.2} metalness={0.9} />
        </RoundedBox>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.3, 1.8]} />
          <meshBasicMaterial color={hovered === "Projects" ? "#ffffff" : "#444"} transparent opacity={0.1} />
        </mesh>
        <RoundedBox args={[0.2, 1, 0.2]} position={[0, -1, 0]} radius={0.02}>
          <meshStandardMaterial color="#111" />
        </RoundedBox>
        <RoundedBox args={[1, 0.05, 0.8]} position={[0, -1.5, 0.2]} radius={0.02}>
          <meshStandardMaterial color="#222" />
        </RoundedBox>
      </group>

      {/* Keyboard */}
      <RoundedBox 
        args={[1.8, 0.1, 0.6]} 
        position={[0, 0.15, 0.5]} 
        radius={0.02} rotation={[0.1, 0, 0]}
        onPointerOver={() => setHovered("Skills")}
        onPointerOut={() => setHovered(null)}
        onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
      >
        <meshStandardMaterial color={hovered === "Skills" ? "#555" : "#1a1a1a"} roughness={0.7} />
      </RoundedBox>

      {/* Mouse */}
      <RoundedBox 
        args={[0.3, 0.1, 0.5]} 
        position={[1.5, 0.15, 0.5]} 
        radius={0.05}
        onPointerOver={() => setHovered("Experience")}
        onPointerOut={() => setHovered(null)}
        onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
      >
        <meshStandardMaterial color={hovered === "Experience" ? "#666" : "#222"} roughness={0.5} />
      </RoundedBox>

      {/* Coffee Mug */}
      <group 
        position={[-1.5, 0.3, 0.2]}
        onPointerOver={() => setHovered("About")}
        onPointerOut={() => setHovered(null)}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />
          <meshStandardMaterial color={hovered === "About" ? "#ffcc00" : "#111"} roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Steam effect (abstract) */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <MeshDistortMaterial color="#ffffff" transparent opacity={0.2} distort={0.5} speed={2} />
        </mesh>
      </group>

      {/* Floating abstract object for AI/ML */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[2, 1.5, -0.5]}>
        <mesh
          onPointerOver={() => setHovered("Contact")}
          onPointerOut={() => setHovered(null)}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={hovered === "Contact" ? "#00ffcc" : "#333"} wireframe={hovered !== "Contact"} roughness={0} metalness={1} />
        </mesh>
      </Float>

      {hovered && (
        <Text
          position={[0, 3, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {hovered}
        </Text>
      )}
    </group>
  );
}

export function Desktop3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <StylizedDesk />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
