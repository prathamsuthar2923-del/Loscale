import { useParams, Link } from 'react-router-dom';
import Seo from '../components/seo';
import useFetch from '../hooks/useFetch';
import worksApi from '../api/works.api';
import resolveImage from '../utils/resolveImage';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import NotFoundPage from './NotFoundPage';

export default function WorkDetailPage() {
  const { slug } = useParams();
  const { data: work, loading, error } = useFetch(() => worksApi.getBySlug(slug), [slug]);

  if (loading) return <Spinner className="min-h-[60vh]" />;
  if (error || !work) return <NotFoundPage />;

  return (
    <article className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <Seo
        title={work.title}
        description={work.summary || work.description?.slice(0, 155)}
        path={`/works/${work.slug}`}
        image={work.coverImage ? resolveImage(work.coverImage) : undefined}
        type="article"
      />
      <Link to="/works" className="text-sm font-medium text-black/50 hover:text-black">
        ← All work
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="giant font-semibold text-black" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
          {work.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-black/50">
          {work.client && <span>{work.client}</span>}
          {work.category && <span>{work.category}</span>}
          {work.year && <span>{work.year}</span>}
        </div>
      </div>

      {work.coverImage && (
        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[#f2f2f2]">
          <img src={resolveImage(work.coverImage)} alt={work.title} className="h-full w-full object-cover" />
        </div>
      )}

      {work.summary && <p className="mt-10 text-xl text-black/70">{work.summary}</p>}
      {work.description && (
        <div className="mt-6 whitespace-pre-line text-lg leading-relaxed text-black/70">
          {work.description}
        </div>
      )}

      {work.gallery?.length > 0 && (
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {work.gallery.map((image, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl bg-[#f2f2f2]">
              <img src={resolveImage(image)} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-16">
        <Button to="/contact" variant="accent">
          Start a project like this →
        </Button>
      </div>
    </article>
  );
}
