import useFetch from '../../hooks/useFetch';
import pricingPlansApi from '../../api/pricingPlans.api';
import Spinner from '../ui/Spinner';

export default function PricingSection() {
  const { data: plans, loading } = useFetch(() => pricingPlansApi.listPublic(), []);

  if (!loading && (!plans || plans.length === 0)) return null;

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto mb-14 max-w-4xl px-6 text-center">
        <h2 className="giant mb-6 font-semibold text-black" style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}>
          Flexible pricing
        </h2>
        <p className="text-lg text-black/60">
          Choose the plan that best fits your needs.
          <br />
          From a solid foundation to a fully optimized solution
        </p>
      </div>

      <div className="bg-[#f5f5f5] py-16">
        {loading ? (
          <Spinner />
        ) : (
          <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`flex flex-col ${
                  plan.highlighted ? 'card-shadow bg-white md:-mt-4 md:mb-4' : 'border border-black/5 bg-[#f5f5f5]'
                }`}
              >
                <div className="space-y-4 px-6 py-8">
                  <p className="font-semibold tracking-wide text-ink">{plan.name}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-semibold text-ink">{plan.price}</span>
                    {plan.billingNote && (
                      <span className="pb-1 text-xs leading-tight text-[#333]">
                        /month
                        <br />
                        {plan.billingNote}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#333]">{plan.note}</p>
                </div>
                <div className="flex flex-1 flex-col items-center px-6 pb-10">
                  <button
                    className={`mb-8 w-full rounded-full py-4 font-bold ${
                      plan.highlighted ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    Choose this Plan
                  </button>
                  <ul className="w-full space-y-3 text-sm text-[#333]">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-accent">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
