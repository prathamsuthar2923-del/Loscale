import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import servicesApi from '../../api/services.api';
import worksApi from '../../api/works.api';
import teamApi from '../../api/team.api';
import testimonialsApi from '../../api/testimonials.api';
import successStoriesApi from '../../api/successStories.api';
import contactApi from '../../api/contact.api';

const cards = [
  { key: 'services', label: 'Services', to: '/admin/services', api: () => servicesApi.listAdmin() },
  { key: 'works', label: 'Works', to: '/admin/works', api: () => worksApi.listAdmin() },
  { key: 'team', label: 'Team Members', to: '/admin/team', api: () => teamApi.listAdmin() },
  { key: 'testimonials', label: 'Testimonials', to: '/admin/testimonials', api: () => testimonialsApi.listAdmin() },
  {
    key: 'successStories',
    label: 'Success Stories',
    to: '/admin/success-stories',
    api: () => successStoriesApi.listAdmin(),
  },
  {
    key: 'submissions',
    label: 'Contact Submissions',
    to: '/admin/submissions',
    api: () => contactApi.listAdmin(),
  },
];

export default function AdminDashboardPage() {
  const { data } = useFetch(
    () => Promise.all(cards.map((c) => c.api().catch(() => []))),
    [],
  );

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-black">Dashboard</h1>
      <p className="mb-8 max-w-xl text-black/50">
        Manage everything shown on the live site from here, including the section visibility toggles under{' '}
        <Link to="/admin/settings" className="font-medium text-accent">
          Site Settings
        </Link>
        .
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <Link
            key={card.key}
            to={card.to}
            className="rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-black/30"
          >
            <p className="text-3xl font-semibold text-black">{data ? data[i]?.length ?? 0 : '—'}</p>
            <p className="mt-2 text-sm font-medium text-black/60">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
