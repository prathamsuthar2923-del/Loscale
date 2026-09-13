import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import teamApi from '../../api/team.api';
import AdminTable from '../../components/admin/AdminTable';
import ImageUploader from '../../components/admin/ImageUploader';
import Modal from '../../components/ui/Modal';
import Toggle from '../../components/ui/Toggle';
import Spinner from '../../components/ui/Spinner';

const emptyForm = { name: '', position: '', photo: '', featured: false, order: 0 };

export default function AdminTeamPage() {
  const { data: team, loading, refetch } = useFetch(() => teamApi.listAdmin(), []);
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

  const openEdit = (member) => {
    setEditing(member);
    setForm({
      name: member.name || '',
      position: member.position || '',
      photo: member.photo || '',
      featured: !!member.featured,
      order: member.order ?? 0,
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
        await teamApi.update(editing._id, form);
      } else {
        await teamApi.create(form);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this team member.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member) => {
    if (!window.confirm(`Remove "${member.name}" from the team?`)) return;
    await teamApi.remove(member._id);
    refetch();
  };

  const handleToggle = async (member) => {
    await teamApi.toggleVisible(member._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Team</h1>
          <p className="mt-1 max-w-xl text-black/50">Name, title, photo, and whether each member shows on the homepage.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
        >
          + Add Team Member
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <AdminTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'position', label: 'Position' },
            { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
          ]}
          rows={team}
          onToggleVisible={handleToggle}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No team members yet — add your first one."
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Team Member' : 'Add Team Member'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Position</label>
            <input
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder="Founder & CEO"
            />
          </div>
          <ImageUploader label="Photo" value={form.photo} onChange={(url) => setForm({ ...form, photo: url })} />

          <div className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2.5">
            <span className="text-sm font-medium text-black">Always show name tag (featured)</span>
            <Toggle checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} label="Featured" />
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
            {saving ? 'Saving...' : 'Save Team Member'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
