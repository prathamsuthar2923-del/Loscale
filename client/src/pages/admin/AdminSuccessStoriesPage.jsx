import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import successStoriesApi from '../../api/successStories.api';
import AdminTable from '../../components/admin/AdminTable';
import ImageUploader from '../../components/admin/ImageUploader';
import Modal from '../../components/ui/Modal';
import Toggle from '../../components/ui/Toggle';
import Spinner from '../../components/ui/Spinner';

const emptyForm = {
  quote: '',
  authorName: '',
  authorTitle: '',
  image: '',
  hasVideo: false,
  stats: [],
  order: 0,
};

export default function AdminSuccessStoriesPage() {
  const { data: stories, loading, refetch } = useFetch(() => successStoriesApi.listAdmin(), []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (story) => {
    setEditing(story);
    setForm({
      quote: story.quote || '',
      authorName: story.authorName || '',
      authorTitle: story.authorTitle || '',
      image: story.image || '',
      hasVideo: !!story.hasVideo,
      stats: story.stats?.length ? story.stats : [],
      order: story.order ?? 0,
    });
    setError('');
    setModalOpen(true);
  };

  const updateStat = (index, field, value) => {
    const stats = [...form.stats];
    stats[index] = { ...stats[index], [field]: value };
    setForm({ ...form, stats });
  };

  const addStat = () => setForm({ ...form, stats: [...form.stats, { value: '', label: '' }] });
  const removeStat = (index) => setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, stats: form.stats.filter((s) => s.value || s.label) };
      if (editing) {
        await successStoriesApi.update(editing._id, payload);
      } else {
        await successStoriesApi.create(payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this success story.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (story) => {
    if (!window.confirm(`Delete success story from "${story.authorName}"?`)) return;
    await successStoriesApi.remove(story._id);
    refetch();
  };

  const handleToggle = async (story) => {
    await successStoriesApi.toggleVisible(story._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Success Stories</h1>
          <p className="mt-1 max-w-xl text-black/50">Rich case-study cards with stats, shown on the homepage.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
        >
          + Add Success Story
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <AdminTable
          columns={[
            { key: 'authorName', label: 'Author' },
            { key: 'authorTitle', label: 'Title' },
            { key: 'stats', label: 'Stats', render: (r) => r.stats?.length || 0 },
          ]}
          rows={stories}
          onToggleVisible={handleToggle}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No success stories yet — add your first one."
        />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Success Story' : 'Add Success Story'}
        wide
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Quote</label>
            <textarea
              required
              rows={3}
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Author Name</label>
              <input
                required
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Author Title</label>
              <input
                value={form.authorTitle}
                onChange={(e) => setForm({ ...form, authorTitle: e.target.value })}
                className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              />
            </div>
          </div>

          <ImageUploader label="Image" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />

          <div className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2.5">
            <span className="text-sm font-medium text-black">Show play/video overlay</span>
            <Toggle checked={form.hasVideo} onChange={(v) => setForm({ ...form, hasVideo: v })} label="Has video" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-black">Stats</label>
              <button type="button" onClick={addStat} className="text-xs font-semibold text-accent">
                + Add stat
              </button>
            </div>
            <div className="space-y-2">
              {form.stats.map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={stat.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    placeholder="Value (e.g. 3x)"
                    className="w-1/3 rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
                  />
                  <input
                    value={stat.label}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    placeholder="Label (e.g. ROAS)"
                    className="flex-1 rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={() => removeStat(i)}
                    className="px-2 text-sm text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              {form.stats.length === 0 && <p className="text-xs text-black/40">No stats added yet.</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white hover:opacity-85 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Success Story'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
