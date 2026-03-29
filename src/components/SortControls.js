export default function SortControls({ sort, onChange }) {
  return (
    <div className="sort">
      <label>Trier :</label>
      <select value={sort} onChange={(e) => onChange(e.target.value)}>
        <option value="dueDesc">Date échéance (desc)</option>
        <option value="createdDesc">Date création (desc)</option>
        <option value="nameAsc">Nom (A-Z)</option>
      </select>
    </div>
  );
}