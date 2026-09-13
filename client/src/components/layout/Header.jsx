import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/loscale-logo.png';

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Works', to: '/works' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const BROCHURE_URL = 'https://go.fliplink.me/view/AF2E069A-04D6-48ED-B849-307D8CDAE52C';

const letsScaleClasses =
  'rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close the mobile menu automatically on any route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Adaptive part: logo, centered nav, Brochure, hamburger toggle.
          mix-blend-difference has to live on this outer fixed element itself —
          applying it to nested children (instead of the fixed ancestor) breaks
          the browser's backdrop detection and the "blended" content stops
          reading the real page behind it. */}
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="relative flex items-center justify-between px-6 py-6 md:px-10">
          <Link to="/" className="flex items-center" onClick={handleLogoClick}>
            <img src={logo} alt="Loscale" className="h-7 w-auto" />
          </Link>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium uppercase tracking-wide text-white hover:opacity-70 ${
                    isActive ? 'opacity-100' : 'opacity-80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-black transition-colors md:inline-flex"
            >
              Brochure
            </a>
            {/* Invisible placeholder — reserves exactly the space the real
                (separately-fixed) Let's Scale button occupies, so Brochure
                keeps its correct gap without hardcoding a pixel width. */}
            <span aria-hidden="true" className={`invisible hidden md:inline-flex ${letsScaleClasses}`}>
              Let&apos;s Scale
            </span>
            <button
              type="button"
              className="relative z-[60] text-sm font-extrabold uppercase tracking-widest text-white md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Solid brand CTA — deliberately a separate, non-blended fixed element
          (a sibling of <header>, not a descendant) so it always renders as a
          real black pill, never nullified by the header's difference blend. */}
      <Link
        to="/contact"
        className={`fixed right-6 top-6 z-50 hidden md:right-10 md:inline-flex ${letsScaleClasses}`}
      >
        Let&apos;s Scale
      </Link>

      {/* Full-screen mobile menu — a solid, unblended panel so it's always
          genuinely black rather than picking up a tint from whatever page
          content sits behind the header. */}
      {menuOpen && (
        <div className="animate-menu-in fixed inset-x-0 top-[76px] bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-black px-6 pb-8 pt-4 md:hidden">
          <nav className="flex flex-col divide-y divide-white/10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `py-5 text-3xl font-semibold uppercase tracking-tight text-white transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-8">
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full border border-white px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              Brochure
            </a>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-85"
            >
              Let&apos;s Scale
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
