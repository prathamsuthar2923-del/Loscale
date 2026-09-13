// Copy sourced directly from the "Who We Are" content provided for the site.
export default function WhoWeAre() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 pb-10 pt-28 md:px-10 md:pt-40">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">01 — Introduction</p>
      <h2 className="giant font-semibold text-black" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3rem)' }}>
        Who We Are
      </h2>
      <div className="mt-8 space-y-5 text-lg text-black/70 md:text-xl">
        <p>
          In today&apos;s hyper-competitive digital ecosystem, presence alone isn&apos;t enough — you need
          performance. LO SCALE is a full-service digital growth agency dedicated to turning online
          visibility into measurable revenue. We don&apos;t just run campaigns; we build scalable digital
          infrastructure tailored to your business objectives.
        </p>
        <p>
          Whether you are an ambitious startup or an established enterprise, LO SCALE provides
          data-driven strategies, cutting-edge creative assets, and high-ROI execution to accelerate your
          growth trajectory.
        </p>
      </div>
    </section>
  );
}
