import Toggle from '../ui/Toggle';

/**
 * Generic list table for the admin CRUD resources (services, team members,
 * testimonials, success stories, works). `columns` is an array of
 * { key, label, render? } — render(row) overrides the default row[key] text.
 */
export default function AdminTable({ columns, rows, onToggleVisible, onToggleHomepage, onEdit, onDelete, emptyLabel }) {
  if (!rows || rows.length === 0) {
    return <p className="rounded-xl border border-dashed border-black/15 p-8 text-center text-black/40">{emptyLabel || 'Nothing here yet.'}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-xs uppercase tracking-wide text-black/40">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
            {onToggleVisible && <th className="px-4 py-3 font-medium">Active</th>}
            {onToggleHomepage && <th className="px-4 py-3 font-medium">Homepage</th>}
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-b border-black/5 last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="max-w-[220px] truncate px-4 py-3 text-black/80">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {onToggleVisible && (
                <td className="px-4 py-3">
                  <Toggle checked={row.visible} onChange={() => onToggleVisible(row)} label="Toggle active status" />
                </td>
              )}
              {onToggleHomepage && (
                <td className="px-4 py-3">
                  <Toggle
                    checked={row.showOnHomepage}
                    onChange={() => onToggleHomepage(row)}
                    label="Toggle show on homepage"
                  />
                </td>
              )}
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="text-xs font-semibold text-black/60 hover:text-black"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
