
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#0d0d0d]/80 px-6 backdrop-blur-md md:px-14">

      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-bold tracking-[0.25em]"
      >
        LUX FAUCET
      </Link>

      {/* Navigation */}
      <div className="hidden items-center gap-10 md:flex">
        <Link
          href="#products"
          className="text-lg text-white/70 transition hover:text-white"
        >
          محصولات
        </Link>

        <Link
          href="#brands"
          className="text-lg text-white/70 transition hover:text-white"
        >
          برندها
        </Link>

        <Link
          href="#about"
          className="text-lg text-white/70 transition hover:text-white"
        >
          درباره ما
        </Link>

        <Link
          href="#contact"
          className="text-lg text-white/70 transition hover:text-white"
        >
          تماس
        </Link>
      </div>

      {/* CTA */}
      <button className="rounded-full bg-white px-5 py-2.5 text-lg font-medium text-black transition hover:bg-neutral-200">
        مشاوره رایگان
      </button>

    </nav>
  );
}
