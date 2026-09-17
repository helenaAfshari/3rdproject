"use client";

import { useEffect, useRef, useState } from "react";
import FaucetExperience from "./FaucetExperience";

export default function DiscoverSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      const progress =
        (windowHeight - rect.top) /
        (rect.height + windowHeight);

      const clampedProgress = Math.min(
        Math.max(progress, 0),
        1
      );

      setRotationY(clampedProgress * Math.PI * 2);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative min-h-screen overflow-hidden bg-[#111] text-white"
    >
      <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 items-center px-8 md:grid-cols-2 md:px-14 lg:px-20">

        {/* TEXT */}
        <div className="relative z-20">
          <p className="mb-6 text-[10px] uppercase tracking-[0.45em] text-white/40">
            02 / Discover
          </p>

          <h2 className="max-w-[650px] text-[clamp(3.5rem,7vw,7rem)] font-light leading-[0.85] tracking-[-0.06em]">
            EVERY
            <br />
            PART
            <br />
            HAS A
            <br />
            PURPOSE
          </h2>

          <p className="mt-10 max-w-[400px] text-sm leading-7 text-white/50">
            Precision engineering meets minimal design.
            Every component is carefully designed to create
            a seamless water experience.
          </p>
        </div>

        {/* 3D FAUCET */}
        <div className="relative z-10 h-[600px] w-full md:h-screen">
          <FaucetExperience rotationY={rotationY} />
        </div>

      </div>

      {/* BOTTOM LABEL */}
      <div className="absolute bottom-8 left-8 z-20 text-[9px] uppercase tracking-[0.35em] text-white/30 md:left-14">
        Scroll to rotate
      </div>
    </section>
  );
}

