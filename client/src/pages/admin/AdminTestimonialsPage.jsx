import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import testimonialsApi from '../../api/testimonials.api';
import AdminTable from '../../components/admin/AdminTable';
import ImageUploader from '../../components/admin/ImageUploader';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';

const emptyForm = { quote: '', authorName: '', authorTitle: '', photo: '', order: 0 };

export default function AdminTestimonialsPage() {
  const { data: testimonials, loading, refetch } = useFetch(() => testimonialsApi.listAdmin(), []);
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

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      quote: t.quote || '',
      authorName: t.authorName || '',
      authorTitle: t.authorTitle || '',
      photo: t.photo || '',
      order: t.order ?? 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await testimonialsApi.update(editing._id, form);
      } else {
        await testimonialsApi.create(form);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete testimonial from "${t.authorName}"?`)) return;
    await testimonialsApi.remove(t._id);
    refetch();
  };

  const handleToggle = async (t) => {
    await testimonialsApi.toggleVisible(t._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Testimonials</h1>
          <p className="mt-1 max-w-xl text-black/50">Client quotes shown on the homepage.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
        >
          + Add Testimonial
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <AdminTable
          columns={[
            { key: 'authorName', label: 'Author' },
            { key: 'authorTitle', label: 'Title' },
            { key: 'quote', label: 'Quote' },
          ]}
          rows={testimonials}
          onToggleVisible={handleToggle}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No testimonials yet — add your first one."
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
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
              placeholder="CEO, Company"
            />
          </div>
          <ImageUploader label="Photo" value={form.photo} onChange={(url) => setForm({ ...form, photo: url })} />
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
            {saving ? 'Saving...' : 'Save Testimonial'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
