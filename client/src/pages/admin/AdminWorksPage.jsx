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

  const handleToggleHomepage = async (work) => {
    await worksApi.toggleHomepage(work._id);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Works</h1>
          <p className="mt-1 max-w-xl text-black/50">
            &quot;Active&quot; controls whether a case study shows on the website at all (the Works page). &quot;Homepage&quot;
            additionally features it in the homepage works preview.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/works/new')}
          className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:opacity-85"
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
          onToggleHomepage={handleToggleHomepage}
          onEdit={(work) => navigate(`/admin/works/${work._id}`)}
          onDelete={handleDelete}
          emptyLabel="No case studies yet — add your first one."
        />
      )}
    </div>
  );
}
