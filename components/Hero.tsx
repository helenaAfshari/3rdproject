import Faucet3D from "./Faucet3D";
import FaucetConfigurator from "./FaucetConfigurator"
export default function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-12 overflow-hidden px-6 py-16 md:grid-cols-2 md:px-14 md:py-20">
      
      {/* متن سمت چپ */}
      <div className="max-w-xl text-center md:text-right">
        <span className="mb-5 inline-block text-xs tracking-[0.3em] text-white/50">
          PREMIUM COLLECTION
        </span>

        <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          طراحی لوکس،
          <br />
          برای فضای خاص
        </h1>

        <p className="mb-10 max-w-md text-base leading-relaxed text-white/60 md:mr-auto">
          نمایندگی رسمی برندهای برتر شیرآلات دنیا.
          ترکیبی از طراحی مینیمال، مهندسی دقیق و کیفیت بی‌نظیر.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <button className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-neutral-200">
            مشاهده محصولات
          </button>
          <button className="rounded-full border border-white/30 px-7 py-3 text-sm text-white transition hover:border-white hover:bg-white/5">
            تماس با ما
          </button>
        </div>
      </div>

      {/* محصول سه‌بعدی سمت راست */}
      <div className="flex items-center justify-center">
        {/* <Faucet3D /> */}
        <FaucetConfigurator/>
      </div>

    </section>
  );
}