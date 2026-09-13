import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import worksApi from '../../api/works.api';
import AdminTable from '../../components/admin/AdminTable';
import Spinner from '../../components/ui/Spinner';

export default function AdminWorksPage() {
  const { data: works, loading, refetch } = useFetch(() => worksApi.listAdmin(), []);
  const navigate = useNavigate();

  const handleDelete = async (work) => {
    if (!window.confirm(`Delete "${work.title}"? This cannot be undone.`)) return;
    await worksApi.remove(work._id);
    refetch();
  };

  const handleToggle = async (work) => {
    await worksApi.toggleVisible(work._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Works</h1>
          <p className="mt-1 text-black/50">Case studies shown on the homepage preview, the Works page, and each detail page.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/works/new')}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
        >
          + Add Work
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <AdminTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'client', label: 'Client' },
            { key: 'category', label: 'Category' },
            { key: 'year', label: 'Year' },
          ]}
          rows={works}
          onToggleVisible={handleToggle}
          onEdit={(work) => navigate(`/admin/works/${work._id}`)}
          onDelete={handleDelete}
          emptyLabel="No case studies yet — add your first one."
        />
      )}
    </div>
  );
}
