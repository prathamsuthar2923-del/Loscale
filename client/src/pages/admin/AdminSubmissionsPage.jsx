import useFetch from '../../hooks/useFetch';
import contactApi from '../../api/contact.api';
import Spinner from '../../components/ui/Spinner';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminSubmissionsPage() {
  const { data: submissions, loading, refetch } = useFetch(() => contactApi.listAdmin(), []);

  const handleToggleRead = async (submission) => {
    await contactApi.toggleRead(submission._id);
    refetch();
  };

  const handleDelete = async (submission) => {
    if (!window.confirm(`Delete the message from "${submission.fullName}"?`)) return;
    await contactApi.remove(submission._id);
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Contact Submissions</h1>
      <p className="mt-1 text-black/50">Everything submitted through the site&apos;s Contact form.</p>

      <div className="mt-6">
        {loading ? (
          <Spinner />
        ) : !submissions || submissions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-black/15 p-8 text-center text-black/40">
            No submissions yet.
          </p>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <div
                key={s._id}
                className={`rounded-xl border p-5 ${s.read ? 'border-black/10 bg-white' : 'border-accent/30 bg-accent/5'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-black">
                      {s.fullName} <span className="font-normal text-black/40">— {s.email}</span>
                    </p>
                    {s.subject && <p className="mt-1 text-sm font-medium text-black/70">{s.subject}</p>}
                  </div>
                  <div className="text-right text-xs text-black/40">
                    <p>{formatDate(s.createdAt)}</p>
                    <p className="mt-1">{s.emailSent ? 'Email notification sent' : 'Email notification not sent'}</p>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm text-black/70">{s.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleToggleRead(s)}
                    className="text-xs font-semibold text-black/60 hover:text-black"
                  >
                    Mark as {s.read ? 'unread' : 'read'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s)}
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
