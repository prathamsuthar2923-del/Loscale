import useFetch from '../../hooks/useFetch';
import teamApi from '../../api/team.api';
import resolveImage from '../../utils/resolveImage';
import Spinner from '../ui/Spinner';

export default function TeamSection() {
  const { data: team, loading } = useFetch(() => teamApi.listPublic(), []);

  if (!loading && (!team || team.length === 0)) return null;

  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <h2
        className="giant mb-14 text-center font-semibold uppercase text-black"
        style={{ fontSize: 'clamp(2.4rem, 8vw, 5.5rem)' }}
      >
        Team
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {team.map((member) => (
            <div key={member._id} className="relative aspect-[305/362] overflow-hidden bg-[#f2f2f2]">
              {member.photo ? (
                <img
                  src={resolveImage(member.photo)}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-black/15">
                  {member.name.charAt(0)}
                </div>
              )}

              {member.featured && (
                <div className="absolute bottom-4 left-4 bg-black px-4 py-3 text-white">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-[#a2a2a2]">{member.position}</p>
                </div>
              )}

              {!member.featured && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity hover:opacity-100">
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-white/70">{member.position}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
