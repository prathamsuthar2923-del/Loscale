import ctaImage from '../../assets/cta-band.png';

export default function CtaBand() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[516px]">
      <img src={ctaImage} className="h-full w-full object-cover" alt="" />
    </section>
  );
}
