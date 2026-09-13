import goals1 from '../../assets/goals-1.png';
import goals2 from '../../assets/goals-2.png';
import goals3 from '../../assets/goals-3.png';

export default function GoalsRow() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h2 className="giant font-semibold text-black" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.6rem)' }}>
        Your goals, our priority
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-[#6b6b6b] md:text-xl">
        From concept to launch, we&apos;re committed to your success with rapid response times and
        personalized attention to detail.
      </p>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="aspect-[3/4] overflow-hidden border border-[#d6dded]">
          <img src={goals1} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="aspect-[3/4] overflow-hidden border border-[#d6dded] bg-black">
          <img src={goals2} className="h-full w-full object-cover opacity-90" alt="" />
        </div>
        <div className="col-span-2 aspect-[3/4] overflow-hidden border border-[#d6dded] md:col-span-1">
          <img src={goals3} className="h-full w-full object-cover" alt="" />
        </div>
      </div>
    </section>
  );
}
