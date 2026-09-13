import useFetch from '../../hooks/useFetch';
import successStoriesApi from '../../api/successStories.api';
import resolveImage from '../../utils/resolveImage';
import Spinner from '../ui/Spinner';

export default function SuccessStoriesSection() {
  const { data: stories, loading } = useFetch(() => successStoriesApi.listPublic(), []);

  if (!loading && (!stories || stories.length === 0)) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
      <div className="mb-10 max-w-md md:mb-14">
        <h2 className="giant text-3xl font-semibold text-black sm:text-4xl md:text-5xl">Success stories</h2>
        <p className="mt-4 text-base text-black/60 md:text-lg">
          Our work speaks for itself, but our clients say it even better.
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 md:gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="grid overflow-hidden rounded-2xl bg-black sm:grid-cols-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f2f2] sm:aspect-auto sm:h-full">
                {story.image ? (
                  <img src={resolveImage(story.image)} className="h-full w-full object-cover" alt="" />
                ) : (
                  <div className="flex h-full min-h-[200px] w-full items-center justify-center text-sm text-black/30">
                    No image yet
                  </div>
                )}
                {story.hasVideo && (
                  <button
                    aria-label="Play video"
                    className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-lg text-white backdrop-blur transition-transform hover:scale-105 md:h-16 md:w-16 md:text-xl"
                  >
                    ▶
                  </button>
                )}
              </div>

              <div className="flex flex-col justify-between gap-6 p-6 text-white sm:gap-8 md:p-7">
                <p className="text-sm leading-relaxed text-[#e2e2e2]">&ldquo;{story.quote}&rdquo;</p>
                <div className="space-y-4">
                  {story.stats?.length > 0 && (
                    <div className="flex flex-wrap gap-6">
                      {story.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-2xl font-medium">{stat.value}</p>
                          <p className="text-[10px] uppercase tracking-wide text-[#6b6b6b]">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm font-medium">{story.authorName}</p>
                    <p className="text-xs text-[#7f7f7f]">{story.authorTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
