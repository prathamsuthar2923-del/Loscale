import Stats from '../components/sections/Stats';
import Button from '../components/ui/Button';

const values = [
  {
    title: 'Data over guesswork',
    description:
      'Every strategy starts with numbers — audience behavior, funnel performance, and competitor benchmarks — not assumptions.',
  },
  {
    title: 'Built to scale',
    description:
      'We design campaigns and systems that keep working as you grow, not one-off wins that need to be rebuilt every quarter.',
  },
  {
    title: 'Full-funnel ownership',
    description:
      'From the first impression to the final conversion, one team is accountable for the entire journey — no handoffs, no gaps.',
  },
  {
    title: 'Transparent by default',
    description:
      'Clear reporting, honest timelines, and direct access to the people doing the work — always.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-32 md:px-10 md:pt-44">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">01 — Introduction</p>
        <h1 className="giant font-semibold text-black" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
          Who We Are
        </h1>
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

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">02 — Our Approach</p>
        <h2 className="giant mb-10 font-semibold text-black" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3rem)' }}>
          How we work
        </h2>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-t border-black/10 pt-6">
              <h3 className="text-xl font-semibold text-black">{v.title}</h3>
              <p className="mt-3 text-black/60">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-6 pt-16 md:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">03 — By the Numbers</p>
          <h2 className="giant mb-2 font-semibold text-black" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3rem)' }}>
            Results that speak first
          </h2>
        </div>
        <div className="pt-10">
          <Stats />
        </div>
      </div>

      <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 pb-28 md:px-10">
        <h2 className="giant font-semibold text-black" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3rem)' }}>
          Ready to build your growth engine?
        </h2>
        <p className="max-w-xl text-lg text-black/60">
          Let&apos;s talk about where you are today and what it&apos;ll take to scale from here.
        </p>
        <Button to="/contact" variant="accent">
          Start your project →
        </Button>
      </section>
    </>
  );
}
