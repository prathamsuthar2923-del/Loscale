import useFetch from '../../hooks/useFetch';
import successStoriesApi from '../../api/successStories.api';
import resolveImage from '../../utils/resolveImage';
import Spinner from '../ui/Spinner';

export default function SuccessStoriesSection() {
  const { data: stories, loading } = useFetch(() => successStoriesApi.listPublic(), []);

  if (!loading && (!stories || stories.length === 0)) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <div className="mb-14 max-w-md">
        <h2 className="mb-4 text-4xl font-semibold text-black md:text-5xl">Success stories</h2>
        <p className="text-lg text-black/60">Our work speaks for itself, but our clients say it even better.</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story) => (
            <div key={story._id} className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden bg-[#f2f2f2]">
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
                    className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-xl text-white backdrop-blur"
                  >
                    ▶
                  </button>
                )}
              </div>

              <div className="flex flex-col justify-between bg-black p-6 text-white">
                <p className="text-sm leading-relaxed text-[#e2e2e2]">&ldquo;{story.quote}&rdquo;</p>
                <div className="mt-8 space-y-4">
                  {story.stats?.length > 0 && (
                    <div className="flex gap-6">
                      {story.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-2xl font-medium">{stat.value}</p>
                          <p className="text-[10px] text-[#6b6b6b]">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
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
