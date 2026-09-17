"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useState } from "react";

/* =====================================================
   FAUCET MODEL
===================================================== */

function FaucetModel() {
  return (
    <group>

      {/* بدنه اصلی شیر */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.65, 2.6, 64]} />

        <meshStandardMaterial
          color="#252525"
          metalness={0.95}
          roughness={0.14}
        />
      </mesh>

      {/* قسمت بالایی */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <cylinderGeometry args={[0.58, 0.58, 0.25, 64]} />

        <meshStandardMaterial
          color="#202020"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* بازوی شیر */}
      <mesh
        position={[0.8, 1.05, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.14, 0.14, 1.7, 32]} />

        <meshStandardMaterial
          color="#292929"
          metalness={0.96}
          roughness={0.13}
        />
      </mesh>

      {/* خروجی آب */}
      <mesh
        position={[1.55, 1.05, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.18, 0.18, 0.3, 32]} />

        <meshStandardMaterial
          color="#1c1c1c"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

    </group>
  );
}

/* =====================================================
   MAIN
===================================================== */

export default function FaucetConfigurator() {

  const [draggedPart, setDraggedPart] = useState(null);
  const [droppedParts, setDroppedParts] = useState([]);

  /* =====================================================
     DRAG START
  ===================================================== */

  const handleDragStart = (part) => {
    setDraggedPart(part);
  };

  /* =====================================================
     DROP
  ===================================================== */

  const handleDrop = () => {

    if (!draggedPart) return;

    setDroppedParts((prev) => [
      ...prev,
      draggedPart,
    ]);

    setDraggedPart(null);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-white">

      {/* =================================================
          TITLE
      ================================================= */}

      <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2 text-center">

        <p className="mb-2 text-xs tracking-[0.3em] text-white/40">
          FAUCET CONFIGURATOR
        </p>

        <h2 className="text-3xl font-semibold md:text-5xl">
          شیرآلات خودت را طراحی کن
        </h2>

        <p className="mt-3 text-sm text-white/50">
          تجهیزات را بکش و روی شیر قرار بده
        </p>

      </div>


      {/* =================================================
          3D AREA
      ================================================= */}

      <div
        className={`h-[calc(100vh-190px)] w-full pt-24 ${
          draggedPart ? "cursor-copy" : ""
        }`}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDrop}
      >

        <Canvas
          camera={{
            position: [4.5, 2.5, 5],
            fov: 35,
          }}
          shadows
        >

          {/* LIGHT */}

          <ambientLight intensity={0.7} />

          <directionalLight
            position={[6, 8, 6]}
            intensity={2.2}
            castShadow
          />

          <directionalLight
            position={[-4, 4, -4]}
            intensity={1}
          />

          {/* MODEL */}

          <FaucetModel />

          {/* SHADOW */}

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.55}
            scale={10}
            blur={2.5}
          />

          {/* ENVIRONMENT */}

          <Environment preset="warehouse" />

          {/* CONTROLS */}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
          />

        </Canvas>

      </div>


      {/* =================================================
          BOTTOM EQUIPMENT PANEL
      ================================================= */}

      <div className="absolute bottom-0 left-0 z-30 w-full border-t border-white/10 bg-[#111]/95 px-6 py-5 backdrop-blur-xl">

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">

          {/* TITLE */}

          <p className="text-xs tracking-widest text-white/40">
            EQUIPMENT
          </p>


          {/* ITEMS */}

          <div className="flex flex-wrap justify-center gap-3">

            {/* HANDLE */}

            <div
              draggable
              onDragStart={() =>
                handleDragStart("دسته اهرمی")
              }
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm transition hover:border-white/30 hover:bg-white/10 active:cursor-grabbing"
            >
              دسته اهرمی
            </div>


            {/* SPOUT */}

            <div
              draggable
              onDragStart={() =>
                handleDragStart("آبریز بلند")
              }
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm transition hover:border-white/30 hover:bg-white/10 active:cursor-grabbing"
            >
              آبریز بلند
            </div>


            {/* SENSOR */}

            <div
              draggable
              onDragStart={() =>
                handleDragStart("سنسور هوشمند")
              }
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm transition hover:border-white/30 hover:bg-white/10 active:cursor-grabbing"
            >
              سنسور هوشمند
            </div>


            {/* SHOWER */}

            <div
              draggable
              onDragStart={() =>
                handleDragStart("دوش دستی")
              }
              className="cursor-grab rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm transition hover:border-white/30 hover:bg-white/10 active:cursor-grabbing"
            >
              دوش دستی
            </div>

          </div>


          {/* DROPPED PARTS */}

          {droppedParts.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 text-xs text-white/50">

              {droppedParts.map((part, index) => (
                <span key={index}>
                  {part}
                </span>
              ))}

            </div>
          )}

        </div>

      </div>

    </section>
  );
}