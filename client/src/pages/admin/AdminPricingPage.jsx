import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import pricingPlansApi from '../../api/pricingPlans.api';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import Toggle from '../../components/ui/Toggle';

const emptyForm = {
  name: '',
  price: '',
  billingNote: 'billed monthly',
  note: '',
  features: '',
  highlighted: false,
  order: 0,
};

export default function AdminPricingPage() {
  const { data: plans, loading, refetch } = useFetch(() => pricingPlansApi.listAdmin(), []);
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

  const openEdit = (plan) => {
    setEditing(plan);
    setForm({
      name: plan.name || '',
      price: plan.price || '',
      billingNote: plan.billingNote || '',
      note: plan.note || '',
      features: (plan.features || []).join('\n'),
      highlighted: !!plan.highlighted,
      order: plan.order ?? 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        features: form.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
      };
      if (editing) {
        await pricingPlansApi.update(editing._id, payload);
      } else {
        await pricingPlansApi.create(payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this pricing plan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (plan) => {
    if (!window.confirm(`Delete "${plan.name}"? This cannot be undone.`)) return;
    await pricingPlansApi.remove(plan._id);
    refetch();
  };

  const handleToggle = async (plan) => {
    await pricingPlansApi.toggleVisible(plan._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Pricing</h1>
          <p className="mt-1 max-w-xl text-black/50">Plans shown in the homepage &amp; site pricing section.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
        >
          + Add Plan
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <AdminTable
          columns={[
            { key: 'name', label: 'Plan' },
            { key: 'price', label: 'Price' },
            { key: 'highlighted', label: 'Highlighted', render: (row) => (row.highlighted ? 'Yes' : '—') },
            { key: 'order', label: 'Order' },
          ]}
          rows={plans}
          onToggleVisible={handleToggle}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No pricing plans yet — add your first one."
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Plan' : 'Add Plan'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Plan Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
                placeholder="Pro"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Price</label>
              <input
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
                placeholder="$1,999"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Billing Note</label>
            <input
              value={form.billingNote}
              onChange={(e) => setForm({ ...form, billingNote: e.target.value })}
              className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder="billed monthly"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Description</label>
            <textarea
              rows={2}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder="For growing businesses needing more features and flexibility."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">
              Features <span className="font-normal text-black/40">(one per line)</span>
            </label>
            <textarea
              rows={6}
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              placeholder={'Competitor analysis\nBasic analytics setup'}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-accent"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2">
              <span className="text-sm font-medium text-black">Highlighted</span>
              <Toggle
                checked={form.highlighted}
                onChange={(v) => setForm({ ...form, highlighted: v })}
                label="Toggle highlighted plan"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white hover:opacity-85 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Plan'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
