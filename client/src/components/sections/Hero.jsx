import heroBg from '../../assets/hero-bg.png';
import heroBgMobile from '../../assets/herp-bg-mobile.png';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-black md:h-[92vh] md:min-h-[600px]"
    >
      <img src={heroBgMobile} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 md:hidden" />
      <img src={heroBg} alt="" className="absolute inset-0 hidden h-full w-full object-cover opacity-90 md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      {/* Dedicated legibility gradient behind the headline — independent of
          whatever hues sit in that part of the background image, so "Digital
          Marketing Agency" stays readable regardless of what's behind it.
          Stronger/taller on mobile where the cropped background leaves less
          room for the text to land on a naturally dark area. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:h-1/2 md:h-2/5" />
      {/* Softly darkens the area behind the fixed header so its
          mix-blend-difference text/logo reads cleanly instead of picking up
          a color tint from the hero image's own hues — a smooth multi-stop
          fade (no flat plateau) so it reads as a vignette, not a bar. */}
      <div
        className="absolute inset-x-0 top-0 h-32 md:h-36"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 20%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-[8%] px-6 sm:bottom-[6%] md:px-14">
        <div className="relative select-none">
          <h1
            className="giant font-semibold text-white/90"
            style={{ fontSize: 'clamp(2.75rem, 15vw, 15rem)' }}
          >
            Digital
          </h1>
          <p
            className="giant -mt-1 mr-1 text-right font-semibold text-white/90 sm:-mt-2 sm:mr-4 md:-mt-6 md:mr-10"
            style={{ fontSize: 'clamp(1.35rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            Marketing Agency
          </p>
        </div>
      </div>

      <div className="absolute right-6 hidden space-y-2 text-right text-white/90 sm:top-[24%] sm:block md:right-16 md:top-[30%] md:space-y-3">
        <p className="text-sm md:text-lg">/ Performance Marketing</p>
        <p className="text-sm md:text-lg">/ SEO &amp; Content</p>
        <p className="text-sm md:text-lg">/ Social &amp; Branding</p>
      </div>
    </section>
  );
}
