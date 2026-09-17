"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

type FaucetExperienceProps = {
  rotationY?: number;
};

function WaterStream({ active }: { active: boolean }) {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!waterRef.current || !active) return;

    const time = state.clock.elapsedTime;

    waterRef.current.scale.x =
      1 + Math.sin(time * 12) * 0.04;

    waterRef.current.scale.z =
      1 + Math.cos(time * 10) * 0.04;
  });

  if (!active) return null;

  return (
    <mesh
      ref={waterRef}
      position={[1.55, 1.02, 0]}
    >
      <cylinderGeometry
        args={[0.035, 0.05, 1.85, 16]}
      />

      <meshStandardMaterial
        color="#7dd3fc"
        transparent
        opacity={0.72}
        roughness={0.05}
        metalness={0.02}
      />
    </mesh>
  );
}

function FaucetModel({
  isOpen,
  onToggle,
  rotationY,
}: {
  isOpen: boolean;
  onToggle: () => void;
  rotationY: number;
}) {
  const handleRef = useRef<THREE.Mesh>(null);
  const faucetRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!faucetRef.current) return;

    faucetRef.current.rotation.y =
      THREE.MathUtils.lerp(
        faucetRef.current.rotation.y,
        rotationY,
        0.08
      );
  });

  useFrame(() => {
    if (!handleRef.current) return;

    const targetRotation = isOpen
      ? -Math.PI / 2.2
      : 0;

    handleRef.current.rotation.z =
      THREE.MathUtils.lerp(
        handleRef.current.rotation.z,
        targetRotation,
        0.12
      );
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.08}
      floatIntensity={0.18}
    >
      <group
        ref={faucetRef}
        position={[0, -1.3, 0]}
        scale={1.4}
        rotation={[0, -0.12, 0]}
      >
        {/* BASE */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry
            args={[0.28, 0.32, 2.2, 64]}
          />

          <meshStandardMaterial
            color="#2b2b2b"
            metalness={0.97}
            roughness={0.13}
          />
        </mesh>

        {/* TOP CAP */}
        <mesh position={[0, 2.25, 0]} castShadow>
          <cylinderGeometry
            args={[0.26, 0.26, 0.12, 64]}
          />

          <meshStandardMaterial
            color="#222"
            metalness={0.98}
            roughness={0.1}
          />
        </mesh>

        {/* ARM CONNECTION */}
        <mesh position={[0.18, 1.95, 0]} castShadow>
          <boxGeometry
            args={[0.4, 0.24, 0.24]}
          />

          <meshStandardMaterial
            color="#252525"
            metalness={0.96}
            roughness={0.14}
          />
        </mesh>

        {/* MAIN ARM */}
        <mesh
          position={[0.85, 1.95, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry
            args={[0.11, 0.11, 1.5, 32]}
          />

          <meshStandardMaterial
            color="#2b2b2b"
            metalness={0.97}
            roughness={0.13}
          />
        </mesh>

        {/* WATER OUTLET */}
        <mesh
          position={[1.55, 1.95, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry
            args={[0.14, 0.14, 0.28, 32]}
          />

          <meshStandardMaterial
            color="#1f1f1f"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* WATER */}
        <WaterStream active={isOpen} />

        {/* HANDLE */}
        <mesh
          ref={handleRef}
          position={[-0.38, 1.2, 0]}
          castShadow
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
        >
          <cylinderGeometry
            args={[0.14, 0.14, 0.2, 32]}
          />

          <meshStandardMaterial
            color="#1f1f1f"
            metalness={0.94}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function FaucetExperience({
  rotationY = 0,
}: FaucetExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [5.2, 2.4, 5.5],
          fov: 30,
        }}
        shadows
      >
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[6, 9, 7]}
          intensity={2.2}
          castShadow
        />

        <directionalLight
          position={[-5, 4, -4]}
          intensity={1}
        />

        <spotLight
          position={[3, 7, 4]}
          intensity={1.4}
          angle={0.45}
          penumbra={0.5}
        />

        <FaucetModel
          isOpen={isOpen}
          onToggle={() => setIsOpen((prev) => !prev)}
          rotationY={rotationY}
        />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.55}
          scale={14}
          blur={2.6}
        />

        <Environment preset="warehouse" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.8}
          maxPolarAngle={Math.PI / 1.65}
        />
      </Canvas>
    </div>
  );
}


