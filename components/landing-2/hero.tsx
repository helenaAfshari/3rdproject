"use client";

import FaucetExperience from "./FaucetExperience";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f4f3ef] text-[#111]">

      {/* NAVBAR */}
      <header className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-8 py-7 md:px-14">

        <div className="text-sm font-semibold tracking-[0.35em]">
          ZEPHYR
        </div>

        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.2em] md:flex">

          <a
            href="#explore"
            className="transition-opacity hover:opacity-50"
          >
            Explore
          </a>

          <a
            href="#details"
            className="transition-opacity hover:opacity-50"
          >
            Details
          </a>

          <a
            href="#water"
            className="transition-opacity hover:opacity-50"
          >
            Water
          </a>

        </nav>

        <button className="text-xs uppercase tracking-[0.2em] md:hidden">
          Menu
        </button>

      </header>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center">

        <div className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center px-8 pt-20 md:grid-cols-2 md:px-14 lg:px-20">

          {/* TEXT */}
          <div className="relative z-10">

            <p className="mb-6 text-[10px] uppercase tracking-[0.45em] text-black/50">
              Modern Faucet Collection
            </p>

            <h1 className="max-w-[700px] text-[clamp(4rem,9vw,9rem)] font-light leading-[0.82] tracking-[-0.07em]">
              FORM
              <br />
              MEETS
              <br />
              FUNCTION
            </h1>

            <p className="mt-10 max-w-[380px] text-sm leading-7 text-black/55">
              A contemporary water experience where precision,
              movement and minimal design come together.
            </p>

            <a
              href="#explore"
              className="mt-10 inline-flex items-center gap-5 text-[10px] uppercase tracking-[0.3em]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/30">
                ↓
              </span>

              Scroll to explore
            </a>

          </div>

          {/* 3D FAUCET */}
          <div className="pointer-events-none absolute inset-0 z-0 md:relative md:h-screen md:pointer-events-auto">

            <FaucetExperience />

          </div>

        </div>
      </div>

      {/* BOTTOM LABEL */}
      <div className="absolute bottom-8 left-8 z-20 text-[9px] uppercase tracking-[0.35em] text-black/40 md:left-14">
        01 / Introduction
      </div>

      <div className="absolute bottom-8 right-8 z-20 text-[9px] uppercase tracking-[0.35em] text-black/40 md:right-14">
        Scroll
      </div>

    </section>
  );
}
