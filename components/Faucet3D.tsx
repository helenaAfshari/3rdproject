"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Float,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

/* =====================================================
   TYPES
===================================================== */

type WaterStreamProps = {
  active: boolean;
};

type FaucetModelProps = {
  isOpen: boolean;
  onToggle: () => void;
};

type FaucetMode = "click" | "hover" | "full";

/* =====================================================
   WATER STREAM
===================================================== */

function WaterStream({ active }: WaterStreamProps) {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!waterRef.current || !active) return;

    const time = state.clock.elapsedTime;

    // حرکت طبیعی و خیلی ظریف آب
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
        opacity={0.62}
        roughness={0.05}
        metalness={0.02}
      />
    </mesh>
  );
}

/* =====================================================
   FAUCET MODEL
===================================================== */

function FaucetModel({
  isOpen,
  onToggle,
}: FaucetModelProps) {
  const handleRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!handleRef.current) return;

    const targetRotation = isOpen
      ? -Math.PI / 2.2
      : 0;

    // حرکت نرم دسته
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
      rotationIntensity={0.1}
      floatIntensity={0.2}
    >
      <group
        position={[0, -1.3, 0]}
        scale={1.65}
        onClick={onToggle}
      >

        {/* =================================================
            BASE
        ================================================= */}

        <mesh
          position={[0, 1.1, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[0.28, 0.32, 2.2, 64]}
          />

          <meshStandardMaterial
            color="#2b2b2b"
            metalness={0.97}
            roughness={0.13}
          />
        </mesh>

        {/* =================================================
            TOP CAP
        ================================================= */}

        <mesh
          position={[0, 2.25, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[0.26, 0.26, 0.12, 64]}
          />

          <meshStandardMaterial
            color="#222"
            metalness={0.98}
            roughness={0.1}
          />
        </mesh>

        {/* =================================================
            ARM CONNECTION
        ================================================= */}

        <mesh
          position={[0.18, 1.95, 0]}
          castShadow
        >
          <boxGeometry
            args={[0.4, 0.24, 0.24]}
          />

          <meshStandardMaterial
            color="#252525"
            metalness={0.96}
            roughness={0.14}
          />
        </mesh>

        {/* =================================================
            MAIN ARM
        ================================================= */}

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

        {/* =================================================
            WATER OUTLET
        ================================================= */}

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

        {/* =================================================
            WATER
        ================================================= */}

        <WaterStream active={isOpen} />

        {/* =================================================
            HANDLE
        ================================================= */}

        <mesh
          ref={handleRef}
          position={[-0.38, 1.2, 0]}
          castShadow
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

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function Faucet3D() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [mode, setMode] =
    useState<FaucetMode>("click");

  /* =====================================================
     CLICK MODE
  ===================================================== */

  const handleClick = () => {
    if (mode === "click") {
      setIsOpen((prev) => !prev);
    }
  };

  /* =====================================================
     HOVER MODE
  ===================================================== */

  const handleHover = () => {
    if (mode === "hover") {
      setIsOpen(true);
    }
  };

  const handleLeave = () => {
    if (mode === "hover") {
      setIsOpen(false);
    }
  };

  /* =====================================================
     FULL OPEN MODE
  ===================================================== */

  const handleFullOpen = () => {
    setMode("full");
    setIsOpen(true);
  };

  return (
    <div className="relative h-[540px] w-full md:h-[620px]">

      {/* =================================================
          DEMO CONTROLS
      ================================================= */}

      <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 flex-wrap justify-center gap-2">

        {/* CLICK */}

        <button
          onClick={() => {
            setMode("click");
            setIsOpen(false);
          }}
          className={`rounded-full px-4 py-2 text-xs transition ${
            mode === "click"
              ? "bg-white text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Click
        </button>

        {/* HOVER */}

        <button
          onClick={() => {
            setMode("hover");
            setIsOpen(false);
          }}
          className={`rounded-full px-4 py-2 text-xs transition ${
            mode === "hover"
              ? "bg-white text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Hover
        </button>

        {/* FULL OPEN */}

        <button
          onClick={handleFullOpen}
          className={`rounded-full px-4 py-2 text-xs transition ${
            mode === "full"
              ? "bg-white text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Full Open
        </button>

      </div>

      {/* =================================================
          3D SCENE
      ================================================= */}

      <Canvas
        camera={{
          position: [5.2, 2.4, 5.5],
          fov: 30,
        }}
        shadows
      >

        {/* =================================================
            LIGHTS
        ================================================= */}

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

        {/* =================================================
            FAUCET
        ================================================= */}

        <group
          onPointerOver={handleHover}
          onPointerOut={handleLeave}
        >
          <FaucetModel
            isOpen={isOpen}
            onToggle={handleClick}
          />
        </group>

        {/* =================================================
            SHADOW
        ================================================= */}

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.55}
          scale={14}
          blur={2.6}
        />

        {/* =================================================
            ENVIRONMENT
        ================================================= */}

        <Environment preset="warehouse" />

        {/* =================================================
            ORBIT CONTROLS
        ================================================= */}

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

// "use client";

// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   ContactShadows,
//   Environment,
//   Float,
//   OrbitControls,
// } from "@react-three/drei";
// import { useRef, useState } from "react";
// import * as THREE from "three";

// type WaterStreamProps = {
//   active: boolean;
// };

// type FaucetModelProps = {
//   isOpen: boolean;
//   onToggle: () => void;
// };

// function WaterStream({ active }: WaterStreamProps) {
//   const ref = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (!ref.current || !active) return;

//     ref.current.position.y =
//       -1.1 - (state.clock.elapsedTime % 0.6) * 1.8;

//     ref.current.scale.y =
//       1 + Math.sin(state.clock.elapsedTime * 8) * 0.15;
//   });

//   if (!active) return null;

//   return (
//     <mesh
//       ref={ref}
//       position={[1.55, -0.3, 0]}
//     >
//       <cylinderGeometry args={[0.035, 0.05, 1.6, 8]} />

//       <meshStandardMaterial
//         color="#7dd3fc"
//         transparent
//         opacity={0.7}
//         roughness={0.1}
//         metalness={0.1}
//       />
//     </mesh>
//   );
// }

// function FaucetModel({
//   isOpen,
//   onToggle,
// }: FaucetModelProps) {
//   const handleRef = useRef<THREE.Mesh>(null);

//   useFrame(() => {
//     if (!handleRef.current) return;

//     const target = isOpen ? -Math.PI / 2.2 : 0;

//     handleRef.current.rotation.z = THREE.MathUtils.lerp(
//       handleRef.current.rotation.z,
//       target,
//       0.1
//     );
//   });

//   return (
//     <Float
//       speed={1.1}
//       rotationIntensity={0.1}
//       floatIntensity={0.2}
//     >
//       <group
//         position={[0, -1.3, 0]}
//         scale={1.65}
//         onClick={onToggle}
//       >
//         {/* بدنه اصلی */}
//         <mesh
//           position={[0, 1.1, 0]}
//           castShadow
//         >
//           <cylinderGeometry
//             args={[0.28, 0.32, 2.2, 64]}
//           />

//           <meshStandardMaterial
//             color="#2b2b2b"
//             metalness={0.97}
//             roughness={0.13}
//           />
//         </mesh>

//         {/* درپوش بالای بدنه */}
//         <mesh
//           position={[0, 2.25, 0]}
//           castShadow
//         >
//           <cylinderGeometry
//             args={[0.26, 0.26, 0.12, 64]}
//           />

//           <meshStandardMaterial
//             color="#222"
//             metalness={0.98}
//             roughness={0.1}
//           />
//         </mesh>

//         {/* اتصال بازو */}
//         <mesh
//           position={[0.18, 1.95, 0]}
//           castShadow
//         >
//           <boxGeometry args={[0.4, 0.24, 0.24]} />

//           <meshStandardMaterial
//             color="#252525"
//             metalness={0.96}
//             roughness={0.14}
//           />
//         </mesh>

//         {/* بازوی اصلی */}
//         <mesh
//           position={[0.85, 1.95, 0]}
//           rotation={[0, 0, -Math.PI / 2]}
//           castShadow
//         >
//           <cylinderGeometry
//             args={[0.11, 0.11, 1.5, 32]}
//           />

//           <meshStandardMaterial
//             color="#2b2b2b"
//             metalness={0.97}
//             roughness={0.13}
//           />
//         </mesh>

//         {/* سر خروجی آب */}
//         <mesh
//           position={[1.55, 1.95, 0]}
//           rotation={[0, 0, -Math.PI / 2]}
//           castShadow
//         >
//           <cylinderGeometry
//             args={[0.14, 0.14, 0.28, 32]}
//           />

//           <meshStandardMaterial
//             color="#1f1f1f"
//             metalness={0.95}
//             roughness={0.15}
//           />
//         </mesh>

//         {/* دسته */}
//         <mesh
//           ref={handleRef}
//           position={[-0.38, 1.2, 0]}
//           castShadow
//         >
//           <cylinderGeometry
//             args={[0.14, 0.14, 0.2, 32]}
//           />

//           <meshStandardMaterial
//             color="#1f1f1f"
//             metalness={0.94}
//             roughness={0.2}
//           />
//         </mesh>

//         {/* آب */}
//         <WaterStream active={isOpen} />
//       </group>
//     </Float>
//   );
// }

// export default function Faucet3D() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="h-[540px] w-full md:h-[620px]">
//       <Canvas
//         camera={{
//           position: [5.2, 2.4, 5.5],
//           fov: 30,
//         }}
//         shadows
//       >
//         <ambientLight intensity={0.7} />

//         <directionalLight
//           position={[6, 9, 7]}
//           intensity={2.2}
//           castShadow
//         />

//         <directionalLight
//           position={[-5, 4, -4]}
//           intensity={1}
//         />

//         <spotLight
//           position={[3, 7, 4]}
//           intensity={1.4}
//           angle={0.45}
//           penumbra={0.5}
//         />

//         <FaucetModel
//           isOpen={isOpen}
//           onToggle={() => setIsOpen((prev) => !prev)}
//         />

//         <ContactShadows
//           position={[0, -1.5, 0]}
//           opacity={0.55}
//           scale={14}
//           blur={2.6}
//         />

//         <Environment preset="warehouse" />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           minPolarAngle={Math.PI / 3.8}
//           maxPolarAngle={Math.PI / 1.65}
//           enableDamping
//           dampingFactor={0.08}
//         />
//       </Canvas>
//     </div>
//   );
// }