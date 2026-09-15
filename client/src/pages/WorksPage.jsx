import { Link } from 'react-router-dom';
import Seo from '../components/seo';
import useFetch from '../hooks/useFetch';
import worksApi from '../api/works.api';
import resolveImage from '../utils/resolveImage';
import Spinner from '../components/ui/Spinner';
import SectionHeading from '../components/ui/SectionHeading';

export default function WorksPage() {
  const { data: works, loading } = useFetch(() => worksApi.listPublic(), []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <Seo title="Our Work" description="Case studies from brands LO SCALE has helped grow." path="/works" />
      <SectionHeading
        eyebrow="Our work"
        title="Selected Work"
        description="Case studies from brands we've helped grow."
      />

      {loading && <Spinner />}

      {!loading && (!works || works.length === 0) && (
        <p className="mt-10 text-black/50">Work will appear here once added from the admin panel.</p>
      )}

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {(works || []).map((work) => (
          <Link key={work._id} to={`/works/${work.slug}`} className="group block">
            <div className="aspect-[871/620] overflow-hidden bg-[#f2f2f2]">
              {work.coverImage ? (
                <img
                  src={resolveImage(work.coverImage)}
                  alt={work.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-black/30">
                  No cover image yet
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-black">{work.client || work.title}</p>
                {work.category && <p className="text-sm text-black/50">{work.category}</p>}
              </div>
              {work.year && <span className="text-sm text-black/40">{work.year}</span>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
