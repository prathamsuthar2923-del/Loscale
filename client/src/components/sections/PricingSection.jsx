const plans = [
  {
    name: 'Basic',
    price: '$120',
    note: 'For small businesses or startups building their first digital presence.',
    features: [
      'Competitor analysis',
      'Design of homepage + up to 4 inner pages',
      'Creation of custom page prototypes',
      'Basic analytics setup (e.g., Google Analytics)',
      'Setup of a basic contact form',
      'Bug fixing and testing support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$1,999',
    note: 'For growing businesses needing more features and flexibility.',
    features: [
      'Competitor analysis',
      'Design of homepage + up to 4 inner pages',
      'Creation of custom page prototypes',
      'Basic analytics setup (e.g., Google Analytics)',
      'Setup of a basic contact form',
      'Bug fixing and testing support',
    ],
    highlighted: true,
  },
  {
    name: 'Max',
    price: '$3,999',
    note: 'For established brands looking for a fully tailored experience.',
    features: [
      'Competitor analysis',
      'Design of homepage + up to 4 inner pages',
      'Creation of custom page prototypes',
      'Basic analytics setup (e.g., Google Analytics)',
      'Setup of a basic contact form',
      'Bug fixing and testing support',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
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
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col ${
                plan.highlighted ? 'card-shadow bg-white md:-mt-4 md:mb-4' : 'border border-black/5 bg-[#f5f5f5]'
              }`}
            >
              <div className="space-y-4 px-6 py-8">
                <p className="font-semibold tracking-wide text-ink">{plan.name}</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-semibold text-ink">{plan.price}</span>
                  <span className="pb-1 text-xs leading-tight text-[#333]">
                    /month
                    <br />
                    billed monthly
                  </span>
                </div>
                <p className="text-sm text-[#333]">{plan.note}</p>
              </div>
              <div className="flex flex-1 flex-col items-center px-6 pb-10">
                <button
                  className={`mb-8 w-full rounded-full py-4 font-bold ${
                    plan.highlighted ? 'bg-accent text-white' : 'bg-white text-black'
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
      </div>
    </section>
  );
}
