export default function Filters({ filters, folders, statuses, onToggleStatus, onToggleFolder, onToggleDefault }) {
  return (
    <div className="filters">
      <label>
        <input type="checkbox" checked={filters.unfinishedOnly} onChange={onToggleDefault} />
        En cours (filtre par défaut)
      </label>

      <div className="chip-row">
        {statuses.map((s) => (
          <button
            key={s}
            className={filters.status.includes(s) ? "chip active" : "chip"}
            onClick={() => onToggleStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="chip-row">
        {folders.map((f) => (
          <button
            key={f.id}
            className={filters.folderIds.includes(f.id) ? "chip active" : "chip"}
            onClick={() => onToggleFolder(f.id)}
          >
            {f.title}
          </button>
        ))}
      </div>
    </div>
  );
}