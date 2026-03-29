export default function Footer({ onAdd }) {
  return (
    <footer className="footer">
      <button className="add-btn" onClick={onAdd}>＋</button>
    </footer>
  );
}