export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      )}
      <h2 className="giant text-4xl font-semibold text-black md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-black/60">{description}</p>}
    </div>
  );
}
