import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/loscale-logo.png';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/works', label: 'Works' },
  { to: '/admin/pricing', label: 'Pricing' },
  { to: '/admin/team', label: 'Team' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/success-stories', label: 'Success Stories' },
  { to: '/admin/submissions', label: 'Contact Submissions' },
  { to: '/admin/settings', label: 'Site Settings' },
];

export default function AdminSidebar() {
  const { username, logout } = useAuth();

  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col justify-between overflow-y-auto border-r border-black/10 bg-white p-6">
      <div>
        <div className="mb-8">
          <img src={logo} alt="Loscale" className="h-7 w-auto" style={{ filter: 'invert(1)' }} />
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-black/40">Admin Panel</p>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-black text-white' : 'text-black/60 hover:bg-black/5 hover:text-black'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-black/10 pt-4">
        <p className="mb-3 truncate text-xs text-black/40">Signed in as {username}</p>
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-black/70 hover:bg-black/5"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
