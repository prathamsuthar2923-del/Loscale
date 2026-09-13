import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import worksApi from '../../api/works.api';
import resolveImage from '../../utils/resolveImage';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';

export default function WorksPreview() {
  const { data: works, loading } = useFetch(() => worksApi.listPublic(), []);
  const preview = (works || []).slice(0, 4);

  return (
    <section id="works" className="relative mx-auto max-w-6xl px-6 py-20 md:px-10">
      <h2
        className="watermark -mb-6 select-none font-semibold md:-mb-10"
        style={{ fontSize: 'clamp(3rem, 13vw, 11rem)', lineHeight: 0.85 }}
      >
        WORKS
      </h2>

      {loading && <Spinner />}

      {!loading && preview.length === 0 && (
        <p className="relative z-10 mt-8 text-black/50">
          No work added yet — add some case studies from the admin panel.
        </p>
      )}

      <div className="relative z-10 mt-8 space-y-16 md:space-y-24">
        {preview.map((work, i) => (
          <figure key={work._id} className={`max-w-3xl ${i % 2 === 1 ? 'ml-auto' : ''}`}>
            <Link to={`/works/${work.slug}`} className="block aspect-[871/503] overflow-hidden bg-[#f2f2f2]">
              {work.coverImage ? (
                <img
                  src={resolveImage(work.coverImage)}
                  alt={work.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-black/30">
                  No cover image yet
                </div>
              )}
            </Link>
            <figcaption className="mt-6 flex items-center gap-10 text-sm font-medium">
              <span className="bg-white px-2 py-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="bg-white px-2 py-1">{work.client || work.title}</span>
              {work.category && <span className="bg-white px-2 py-1">{work.category.toUpperCase()}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      {preview.length > 0 && (
        <div className="mt-16">
          <Button to="/works" variant="dark">
            View all work →
          </Button>
        </div>
      )}
    </section>
  );
}
