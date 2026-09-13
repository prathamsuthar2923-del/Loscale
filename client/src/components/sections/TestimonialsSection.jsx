import useFetch from '../../hooks/useFetch';
import testimonialsApi from '../../api/testimonials.api';
import resolveImage from '../../utils/resolveImage';
import Spinner from '../ui/Spinner';

// A simple client-quote strip — distinct from the richer, stat-driven
// "Success Stories" cards below it. Both are independently manageable from
// the admin panel with their own show/hide toggle per item.
export default function TestimonialsSection() {
  const { data: testimonials, loading } = useFetch(() => testimonialsApi.listPublic(), []);

  if (!loading && (!testimonials || testimonials.length === 0)) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-14 max-w-md">
        <h2 className="mb-4 text-4xl font-semibold text-black md:text-5xl">What Clients Say</h2>
        <p className="text-lg text-black/60">Real feedback from the brands we&apos;ve worked with.</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t._id} className="flex flex-col gap-6 rounded-2xl bg-[#f5f5f5] p-8">
              <p className="text-lg leading-relaxed text-black/80">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3">
                {t.photo ? (
                  <img
                    src={resolveImage(t.photo)}
                    alt={t.authorName}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/10 text-sm font-semibold">
                    {t.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-black">{t.authorName}</p>
                  {t.authorTitle && <p className="text-xs text-black/50">{t.authorTitle}</p>}
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      )}
    </section>
  );
}
