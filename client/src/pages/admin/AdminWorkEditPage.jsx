import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import worksApi from '../../api/works.api';
import ImageUploader from '../../components/admin/ImageUploader';
import Spinner from '../../components/ui/Spinner';

const emptyForm = {
  title: '',
  slug: '',
  client: '',
  category: '',
  year: '',
  coverImage: '',
  gallery: [],
  summary: '',
  description: '',
  order: 0,
};

export default function AdminWorkEditPage() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    worksApi
      .getOne(id)
      .then((work) =>
        setForm({
          title: work.title || '',
          slug: work.slug || '',
          client: work.client || '',
          category: work.category || '',
          year: work.year || '',
          coverImage: work.coverImage || '',
          gallery: work.gallery || [],
          summary: work.summary || '',
          description: work.description || '',
          order: work.order ?? 0,
        }),
      )
      .catch(() => setError('Could not load this work item.'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const updateGalleryItem = (index, url) => {
    const gallery = [...form.gallery];
    gallery[index] = url;
    setForm({ ...form, gallery });
  };

  const addGalleryItem = () => setForm({ ...form, gallery: [...form.gallery, ''] });
  const removeGalleryItem = (index) =>
    setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, gallery: form.gallery.filter(Boolean) };
      if (!payload.slug) delete payload.slug; // let the server derive it from title if left blank
      if (isNew) {
        await worksApi.create(payload);
      } else {
        await worksApi.update(id, payload);
      }
      navigate('/admin/works');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this work item.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner className="min-h-[40vh]" />;

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/admin/works" className="text-sm font-medium text-black/50 hover:text-black">
        ← Back to Works
      </Link>
      <h1 className="mb-6 mt-3 text-2xl font-semibold text-black">{isNew ? 'Add Work' : 'Edit Work'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-black">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-black">
            Slug <span className="font-normal text-black/40">(used in the URL — leave blank to auto-generate)</span>
          </label>
          <input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="e.g. nova-retail-campaign"
            className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Client</label>
            <input
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Year</label>
            <input
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>
        </div>

        <ImageUploader
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => setForm({ ...form, coverImage: url })}
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-black">Gallery Images</label>
            <button type="button" onClick={addGalleryItem} className="text-xs font-semibold text-accent">
              + Add image
            </button>
          </div>
          <div className="space-y-3">
            {form.gallery.map((url, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <ImageUploader value={url} onChange={(newUrl) => updateGalleryItem(i, newUrl)} />
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryItem(i)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            {form.gallery.length === 0 && <p className="text-xs text-black/40">No gallery images added yet.</p>}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-black">Summary</label>
          <textarea
            rows={2}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-black">Full Description</label>
          <textarea
            rows={6}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
          />
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
          {saving ? 'Saving...' : 'Save Work'}
        </button>
      </form>
    </div>
  );
}
