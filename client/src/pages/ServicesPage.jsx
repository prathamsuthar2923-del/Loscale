import useFetch from '../hooks/useFetch';
import servicesApi from '../api/services.api';
import resolveImage from '../utils/resolveImage';
import placeholder from '../assets/service-placeholder.png';
import Spinner from '../components/ui/Spinner';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

export default function ServicesPage() {
  const { data: services, loading } = useFetch(() => servicesApi.listPublic(), []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <SectionHeading
        eyebrow="What we do"
        title="Our Core Services"
        description="Full-funnel digital growth — strategy, creative, and execution under one roof."
      />

      {loading && <Spinner />}

      {!loading && (!services || services.length === 0) && (
        <p className="mt-10 text-black/50">Services will appear here once added from the admin panel.</p>
      )}

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {(services || []).map((service) => (
          <div key={service._id} className="flex flex-col gap-6 border-t border-black/10 pt-8 md:flex-row">
            <div className="h-44 w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#f2f2f2] md:w-44">
              <img
                src={resolveImage(service.image) || placeholder}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              {service.tag && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  {service.tag}
                </p>
              )}
              <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
              <p className="mt-3 text-black/60">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <Button to="/contact" variant="accent">
          Start your project →
        </Button>
      </div>
    </section>
  );
}
