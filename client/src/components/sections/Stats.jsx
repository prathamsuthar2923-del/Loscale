const stats = [
  {
    label: 'Campaigns Managed',
    value: '100+',
    description: 'Strategic campaigns designed to increase reach and engagement.',
  },
  {
    label: 'Audience Reached',
    value: '1M+',
    description: 'Helping brands connect with the right people across digital platforms.',
  },
  {
    label: 'Growth Strategies',
    value: '50+',
    description: 'Custom strategies built around real business goals.',
  },
  {
    label: 'Client Satisfaction',
    value: '4.9/5',
    description: 'Focused on strong partnerships and measurable results.',
  },
];

export default function Stats() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-black">{s.label}</p>
          <div className="divider w-16" />
          <p className="text-5xl font-semibold text-black md:text-6xl">{s.value}</p>
          <p className="max-w-[240px] text-sm text-[#6b6b6b]">{s.description}</p>
        </div>
      ))}
    </section>
  );
}
