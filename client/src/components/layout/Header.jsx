import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/loscale-logo.png';

const navItems = [
  { label: 'Works Section', to: '/works' },
  { label: 'Services Section', to: '/services' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-6 md:px-10">
        <Link to="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Loscale" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
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
          <Link
            to="/contact"
            className="hidden rounded-full border border-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-black transition-colors md:inline-flex"
          >
            Let&apos;s Scale
          </Link>
          <button
            type="button"
            className="text-sm font-extrabold uppercase tracking-widest text-white md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-black px-6 pb-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-wide text-white"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-fit rounded-full border border-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white"
            >
              Let&apos;s Scale
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
