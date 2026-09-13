import { useState, useEffect } from 'react';
import settingsApi from '../../api/settings.api';
import Toggle from '../../components/ui/Toggle';
import Spinner from '../../components/ui/Spinner';

const sectionLabels = {
  hero: 'Hero',
  whoWeAre: 'Who We Are',
  stats: 'Stats',
  works: 'Works Preview',
  goalsRow: 'Goals Row',
  services: 'Services (scroll highlight)',
  team: 'Team',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  successStories: 'Success Stories',
  latestInsights: 'Latest Insights (currently disabled site-wide)',
  ctaBand: 'CTA Band',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    settingsApi
      .getAdmin()
      .then(setSettings)
      .catch(() => setError('Could not load site settings.'))
      .finally(() => setLoading(false));
  }, []);

  const toggleSection = (key) => {
    setSettings((prev) => ({ ...prev, sections: { ...prev.sections, [key]: !prev.sections[key] } }));
  };

  const updateSocial = (key, value) => {
    setSettings((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const updated = await settingsApi.update(settings);
      setSettings(updated);
      setSaved(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner className="min-h-[40vh]" />;
  if (!settings) return <p className="text-red-600">{error || 'Settings unavailable.'}</p>;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-black">Site Settings</h1>
      <p className="mt-1 text-black/50">Site-wide toggles for every homepage section, social links, and the contact notification address.</p>

      <form onSubmit={handleSave} className="mt-8 space-y-10">
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-black/50">Homepage Sections</h2>
          <div className="space-y-2 rounded-xl border border-black/10 bg-white p-2">
            {Object.keys(sectionLabels).map((key) => (
              <div key={key} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-black/[0.02]">
                <span className="text-sm text-black">{sectionLabels[key]}</span>
                <Toggle
                  checked={!!settings.sections?.[key]}
                  onChange={() => toggleSection(key)}
                  label={sectionLabels[key]}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-black/50">Social Links</h2>
          <div className="space-y-3">
            {['youtube', 'linkedin', 'twitter', 'instagram'].map((key) => (
              <div key={key}>
                <label className="mb-1 block text-sm font-medium capitalize text-black">{key}</label>
                <input
                  value={settings.social?.[key] || ''}
                  onChange={(e) => updateSocial(key, e.target.value)}
                  placeholder={`https://${key}.com/loscale`}
                  className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-black/50">Contact</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Notification Email</label>
            <input
              type="email"
              value={settings.contactEmail || ''}
              onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
            <p className="mt-2 text-xs text-black/40">
              Where new Contact form submissions are sent. Email sending is currently disabled — see the README for
              how to turn it on once SMTP credentials are ready.
            </p>
          </div>
        </section>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-green-700">Settings saved.</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white hover:opacity-85 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
