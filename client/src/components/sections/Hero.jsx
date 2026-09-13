import heroBg from '../../assets/hero-bg.png';

export default function Hero() {
  return (
    <section id="top" className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-black">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      <div className="absolute bottom-[6%] left-0 right-0 px-6 md:px-14">
        <div className="relative select-none">
          <h1 className="giant font-semibold text-white/100 mix-blend-" style={{ fontSize: 'clamp(3.5rem, 14vw, 15rem)' }}>
            Digital
          </h1>
          <p
            className="giant -mt-2 text-right mr-10 font-semibold text-white/90 mix-blend-overlay md:-mt-6"
            style={{ fontSize: 'clamp(1.6rem, 6.5vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            Marketing Agency
          </p>
        </div>
      </div>

      <div className="absolute right-6 top-[30%] hidden space-y-3 text-right text-white/90 sm:block md:right-16">
        <p className="text-lg">/ Performance Marketing</p>
        <p className="text-lg">/ SEO &amp; Content</p>
        <p className="text-lg">/ Social &amp; Branding</p>
      </div>
    </section>
  );
}
