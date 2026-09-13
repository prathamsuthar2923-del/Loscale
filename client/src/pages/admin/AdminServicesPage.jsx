import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import servicesApi from '../../api/services.api';
import AdminTable from '../../components/admin/AdminTable';
import ImageUploader from '../../components/admin/ImageUploader';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';

const emptyForm = { title: '', homepageTitle: '', tag: '', description: '', image: '', order: 0 };

export default function AdminServicesPage() {
  const { data: services, loading, refetch } = useFetch(() => servicesApi.listAdmin(), []);
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

  const openEdit = (service) => {
    setEditing(service);
    setForm({
      title: service.title || '',
      homepageTitle: service.homepageTitle || '',
      tag: service.tag || '',
      description: service.description || '',
      image: service.image || '',
      order: service.order ?? 0,
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
        await servicesApi.update(editing._id, form);
      } else {
        await servicesApi.create(form);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`)) return;
    await servicesApi.remove(service._id);
    refetch();
  };

  const handleToggle = async (service) => {
    await servicesApi.toggleVisible(service._id);
    refetch();
  };

  const handleToggleHomepage = async (service) => {
    await servicesApi.toggleHomepage(service._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Services</h1>
          <p className="mt-1 max-w-xl text-black/50">
            &quot;Active&quot; controls whether a service shows on the website at all (the Services page). &quot;Homepage&quot;
            additionally features it in the homepage scroll section.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
        >
          + Add Service
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <AdminTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'homepageTitle', label: 'Homepage Title', render: (row) => row.homepageTitle || <span className="text-black/30">(same)</span> },
            { key: 'tag', label: 'Tag' },
            { key: 'order', label: 'Order' },
          ]}
          rows={services}
          onToggleVisible={handleToggle}
          onToggleHomepage={handleToggleHomepage}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No services yet — add your first one."
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder="Performance Marketing"
            />
            <p className="mt-1 text-xs text-black/40">Full title — shown on the Services page.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Homepage Title <span className="font-normal text-black/40">(optional)</span>
            </label>
            <input
              value={form.homepageTitle}
              onChange={(e) => setForm({ ...form, homepageTitle: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder="Performance Marketing"
            />
            <p className="mt-1 text-xs text-black/40">
              Short version for the homepage scroll section. Leave blank to reuse the Title above.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Tag / Subtitle</label>
            <input
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder="Paid Ads"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>
          <ImageUploader
            label="Service Image"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
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
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
