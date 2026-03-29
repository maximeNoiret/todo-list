import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { ETATS } from "../constants";

export default function TaskModal({ folders, onClose }) {
  const { addTask, tasks } = useTodo();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: ETATS.NOUVEAU,
    folderIds: [],
  });

  const submit = (e) => {
    e.preventDefault();
    if (form.title.length < 5 || !form.dueDate) return;
    const now = new Date().toISOString().slice(0, 10);
    addTask({
      ...form,
      id: String(Math.max(...tasks.map((task) => Number(task.id))) + 1),  // max(id) + 1 (I think, idk what I'm doing)
      createdAt: now,
    });
    onClose();
  };

  const toggleFolder = (id) => {
    setForm((prev) => {
      const exists = prev.folderIds.includes(id);
      return {
        ...prev,
        folderIds: exists ? prev.folderIds.filter((x) => x !== id) : [...prev.folderIds, id],
      };
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Nouvelle Tache</h3>
        <form onSubmit={submit}>
          <label>Titre (min 5)</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            minLength={5}
            required
          />
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <label>Date échéance</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
          <label>Statut</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {Object.values(ETATS).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <label>Dossiers</label>
          <div className="chip-row">
            {folders.map((folders) => (
              <button
                type="button"
                key={folders.id}
                className={form.folderIds.includes(folder.id) ? "chip active" : "chip"}
                onClick={() => toggleFolder(folder.id)}
              >
                {folder.title}
              </button>
            ))}
          </div>
          <div className="modal-actions">
            <button type="submit">Créer</button>
            <button type="button" onClick={onClose}>
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
