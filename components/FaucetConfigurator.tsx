"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useState } from "react";

/* =====================================================
   TYPES
===================================================== */

type FaucetPartType =
  | "body"
  | "handle"
  | "spout"
  | "sensor"
  | "shower";

type Position = [number, number, number];

type FaucetPartProps = {
  part: FaucetPartType;
  position: Position;
};

type PlacedPart = {
  id: number;
  type: FaucetPartType;
  position: Position;
};

/* =====================================================
   3D PARTS
===================================================== */

function FaucetPart({ part, position }: FaucetPartProps) {
  const material = {
    color: "#292929",
    metalness: 0.95,
    roughness: 0.15,
  };

  // بدنه شیر
  if (part === "body") {
    return (
      <mesh position={position} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 2.2, 64]} />
        <meshStandardMaterial {...material} />
      </mesh>
    );
  }

  // دسته اهرمی
  if (part === "handle") {
    return (
      <group position={position}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.7, 32]} />
          <meshStandardMaterial {...material} />
        </mesh>

        <mesh
          position={[0, 0.35, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.1, 0.1, 0.65, 32]} />
          <meshStandardMaterial {...material} />
        </mesh>
      </group>
    );
  }

  // آبریز بلند
  if (part === "spout") {
    return (
      <group position={position}>
        <mesh
          rotation={[0, 0, -Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.12, 1.8, 32]} />
          <meshStandardMaterial {...material} />
        </mesh>

        <mesh
          position={[0.85, -0.25, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.12, 0.6, 32]} />
          <meshStandardMaterial {...material} />
        </mesh>
      </group>
    );
  }

  // سنسور هوشمند
  if (part === "sensor") {
    return (
      <mesh position={position} castShadow>
        <boxGeometry args={[0.35, 0.18, 0.25]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    );
  }

  // دوش دستی
  if (part === "shower") {
    return (
      <group position={position}>
        <mesh castShadow>
          <cylinderGeometry args={[0.28, 0.22, 0.18, 32]} />
          <meshStandardMaterial {...material} />
        </mesh>

        <mesh
          position={[0, -0.45, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.1, 0.1, 0.8, 32]} />
          <meshStandardMaterial {...material} />
        </mesh>
      </group>
    );
  }

  return null;
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function FaucetConfigurator() {
  const [draggedPart, setDraggedPart] =
    useState<FaucetPartType | null>(null);

  const [placedParts, setPlacedParts] = useState<PlacedPart[]>([]);

  /* =====================================================
     START DRAG
  ===================================================== */

  const handleDragStart = (part: FaucetPartType) => {
    setDraggedPart(part);
  };

  /* =====================================================
     DROP ON EMPTY WORKSPACE
  ===================================================== */

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    if (!draggedPart) return;

    const workspace = event.currentTarget;
    const rect = workspace.getBoundingClientRect();

    // محل رها کردن موس نسبت به فضای کاری
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // تبدیل مختصات صفحه به مختصات سه‌بعدی تقریبی
    const x = ((mouseX / rect.width) - 0.5) * 6;
    const y = -((mouseY / rect.height) - 0.5) * 4;

    const newPart: PlacedPart = {
      id: Date.now(),
      type: draggedPart,
      position: [x, y, 0],
    };

    setPlacedParts((prev) => [...prev, newPart]);

    setDraggedPart(null);
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    setPlacedParts([]);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-white">

      {/* =================================================
          TITLE
      ================================================= */}

      <div className="absolute left-1/2 top-8 z-20 w-full -translate-x-1/2 px-4 text-center">

        <p className="mb-2 text-xs tracking-[0.3em] text-white/40">
          FAUCET CONFIGURATOR
        </p>

        <h2 className="text-3xl font-semibold md:text-5xl">
          شیرآلات خودت را طراحی کن
        </h2>

        <p className="mt-3 text-sm text-white/50">
          تجهیزات را از پایین بکش و در صفحه قرار بده
        </p>

      </div>

      {/* =================================================
          EMPTY 3D WORKSPACE
      ================================================= */}

      <div
        className="h-[calc(100vh-190px)] w-full pt-24"
        onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
        }}
        onDrop={handleDrop}
      >

        <Canvas
          camera={{
            position: [0, 0, 7],
            fov: 40,
          }}
          shadows
        >

          {/* LIGHTS */}

          <ambientLight intensity={0.7} />

          <directionalLight
            position={[5, 8, 5]}
            intensity={2}
            castShadow
          />

          <directionalLight
            position={[-4, 4, -4]}
            intensity={1}
          />

          {/* DROPPED PARTS */}

          {placedParts.map((part) => (
            <FaucetPart
              key={part.id}
              part={part.type}
              position={part.position}
            />
          ))}

          {/* SHADOW */}

          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.5}
            scale={12}
            blur={2.5}
          />

          {/* ENVIRONMENT */}

          <Environment preset="warehouse" />

          {/* CAMERA CONTROL */}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
          />

        </Canvas>

        {/* EMPTY STATE */}

        {placedParts.length === 0 && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

            <p className="text-5xl text-white/10">
              +
            </p>

            <p className="mt-3 text-sm text-white/30">
              تجهیزات را اینجا قرار بده
            </p>

          </div>
        )}

      </div>

      {/* =================================================
          BOTTOM EQUIPMENT PANEL
      ================================================= */}

      <div className="absolute bottom-0 left-0 z-30 w-full border-t border-white/10 bg-[#111111]/95 px-5 py-4 backdrop-blur-xl">

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4">

          <div className="flex w-full items-center justify-between">

            <p className="text-xs tracking-widest text-white/40">
              EQUIPMENT
            </p>

            <button
              onClick={handleReset}
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              پاک کردن صفحه
            </button>

          </div>

          {/* DRAGGABLE ITEMS */}

          <div className="flex flex-wrap justify-center gap-3">

            {/* BODY */}

            <div
              draggable
              onDragStart={() => handleDragStart("body")}
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10 active:cursor-grabbing"
            >
              بدنه شیر
            </div>

            {/* HANDLE */}

            <div
              draggable
              onDragStart={() => handleDragStart("handle")}
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10 active:cursor-grabbing"
            >
              دسته اهرمی
            </div>

            {/* SPOUT */}

            <div
              draggable
              onDragStart={() => handleDragStart("spout")}
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10 active:cursor-grabbing"
            >
              آبریز بلند
            </div>

            {/* SENSOR */}

            <div
              draggable
              onDragStart={() => handleDragStart("sensor")}
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10 active:cursor-grabbing"
            >
              سنسور هوشمند
            </div>

            {/* SHOWER */}

            <div
              draggable
              onDragStart={() => handleDragStart("shower")}
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10 active:cursor-grabbing"
            >
              دوش دستی
            </div>

          </div>

          <p className="text-center text-xs text-white/30">
            قطعه را بگیر و داخل فضای خالی رها کن
          </p>

        </div>

      </div>

    </section>
  );
}