import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import contactApi from '../../api/contact.api';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminSubmissionsPage() {
  const { data: submissions, loading, refetch } = useFetch(() => contactApi.listAdmin(), []);
  const [viewing, setViewing] = useState(null);

  const handleToggleRead = async (submission) => {
    await contactApi.toggleRead(submission._id);
    refetch();
  };

  const handleDelete = async (submission) => {
    if (!window.confirm(`Delete the message from "${submission.fullName}"?`)) return;
    await contactApi.remove(submission._id);
    refetch();
  };

  const openView = async (submission) => {
    setViewing(submission);
    if (!submission.read) {
      await contactApi.toggleRead(submission._id);
      refetch();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black">Contact Submissions</h1>
      <p className="mt-1 max-w-xl text-black/50">Everything submitted through the site&apos;s Contact form.</p>

      <div className="mt-6">
        {loading ? (
          <Spinner />
        ) : !submissions || submissions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-black/15 p-8 text-center text-black/40">
            No submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-xs uppercase tracking-wide text-black/40">
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s._id} className={`border-b border-black/5 last:border-0 ${s.read ? '' : 'bg-accent/5'}`}>
                    <td className="max-w-[220px] px-4 py-3">
                      <p className="truncate font-medium text-black">{s.fullName}</p>
                      <p className="truncate text-xs text-black/40">{s.email}</p>
                    </td>
                    <td className="max-w-[260px] truncate px-4 py-3 text-black/80">{s.subject || '—'}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-black/60">{formatDate(s.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          s.read ? 'bg-black/5 text-black/50' : 'bg-accent/15 text-accent'
                        }`}
                      >
                        {s.read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => openView(s)}
                          className="text-xs font-semibold text-black/60 hover:text-black"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleRead(s)}
                          className="text-xs font-semibold text-black/60 hover:text-black"
                        >
                          Mark {s.read ? 'unread' : 'read'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s)}
                          className="text-xs font-semibold text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Submission">
        {viewing && (
          <div className="space-y-4">
            <div>
              <p className="font-medium text-black">
                {viewing.fullName} <span className="font-normal text-black/40">— {viewing.email}</span>
              </p>
              <p className="mt-1 text-xs text-black/40">{formatDate(viewing.createdAt)}</p>
            </div>
            {viewing.subject && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/40">Subject</p>
                <p className="mt-1 text-sm text-black">{viewing.subject}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40">Message</p>
              <p className="mt-1 whitespace-pre-line text-sm text-black/80">{viewing.description}</p>
            </div>
            <p className="text-xs text-black/40">
              {viewing.emailSent ? 'Email notification sent' : 'Email notification not sent'}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
