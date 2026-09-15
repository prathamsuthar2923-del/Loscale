import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import servicesApi from '../../api/services.api';
import resolveImage from '../../utils/resolveImage';
import placeholder from '../../assets/service-placeholder.png';
import Spinner from '../ui/Spinner';

/**
 * Homepage "services" teaser: as the visitor scrolls through this pinned
 * section, the current service lights up and its image crossfades into the
 * next one — the same scroll-driven highlight interaction from the original
 * design, but now generalized to however many services are marked visible
 * in the admin panel (instead of a hardcoded 4).
 */
export default function ServicesScrollHighlight() {
  const { data: services, loading } = useFetch(() => servicesApi.listHomepage(), []);
  const driverRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = services?.length || 0;

  useEffect(() => {
    if (!count) return undefined;

    function update() {
      const driver = driverRef.current;
      if (!driver) return;
      const rect = driver.getBoundingClientRect();
      const scrollable = driver.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      let progress = (0 - rect.top) / scrollable;
      progress = Math.max(0, Math.min(0.9999, progress));
      const idx = Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
      setActiveIndex(idx);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [count]);

  if (loading) {
    return (
      <section className="bg-black py-24">
        <Spinner className="[&>div]:border-white/20 [&>div]:border-t-white" />
      </section>
    );
  }

  if (!count) return null;

  return (
    <section id="services" className="relative bg-black py-10 text-white md:py-0">
      <div ref={driverRef} style={{ height: `${count * 100}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden pb-16 pt-24 md:pb-0 md:pt-0">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-10 md:gap-14 lg:grid-cols-2 lg:gap-24">
            <ul className="space-y-1 leading-[0.95]">
              {services.map((service, i) => (
                <li key={service._id}>
                  <p
                    className="font-semibold transition-all duration-500 ease-out"
                    style={{
                      fontSize: 'clamp(1.8rem, 5vw, 4.4rem)',
                      opacity: i === activeIndex ? 1 : 0.25,
                      transform: i === activeIndex ? 'translateX(6px)' : 'translateX(0)',
                    }}
                  >
                    {service.homepageTitle || service.title}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mx-auto w-full max-w-[380px] lg:mx-0">
              {/* Sized down on mobile so the mockup doesn't dominate the
                  screen and push the description awkwardly far down — the
                  outer column above stays full width so the text below
                  doesn't get squeezed into extra line-wraps. Unchanged
                  (full-size) from md up. */}
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-2xl bg-white/5 sm:max-w-[280px] md:max-w-full">
                {services.map((service, i) => (
                  <img
                    key={service._id}
                    src={resolveImage(service.image) || placeholder}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
                    style={{ opacity: i === activeIndex ? 1 : 0 }}
                  />
                ))}
              </div>

              <div className="relative mt-10 h-28 sm:mt-8 sm:h-14">
                {services.map((service, i) => (
                  <p
                    key={service._id}
                    className="absolute inset-0 text-lg leading-relaxed text-white transition-opacity duration-500 ease-out md:text-xl"
                    style={{ opacity: i === activeIndex ? 1 : 0 }}
                  >
                    {service.tag && <span className="text-[#9b9b9b]">{service.tag} — </span>}
                    {service.description}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-6 flex gap-2 md:bottom-10 md:left-10">
            {services.map((service, i) => (
              <span
                key={service._id}
                className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                  i === activeIndex ? 'bg-white' : 'bg-white/25'
                }`}
              />
            ))}
          </div>

          <Link
            to="/services"
            className="absolute right-6 top-24 hidden text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-white lg:right-10 lg:block"
          >
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
