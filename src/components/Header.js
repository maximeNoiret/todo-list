export default function Header({ total, unfinished, onReset }) {
  return (
    <header className="header">
      <div>
        <h1>ToDo-List</h1>
        <small>Périmètre projet</small>
      </div>
      <div className="header-stats">
        <span>Total : {total}</span>
        <span>Non finis : {unfinished}</span>
      </div>
      <button onClick={onReset}>Reset (vide)</button>
    </header>
  );
}