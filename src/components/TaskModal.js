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

  const submit = (event) => {
    event.preventDefault();
    if (form.title.length < 5 || !form.dueDate) return;
    const now = new Date().toISOString().slice(0, 10);
    const maxId = tasks.length ? Math.max(...tasks.map((task) => Number(task.id))) : 0;
    addTask({
      ...form,
      id: String(maxId + 1),
      createdAt: now,
    });
    onClose();
  };

  const toggleFolder = (folderId) => {
    setForm((previous) => {
      const exists = previous.folderIds.includes(folderId);
      return {
        ...previous,
        folderIds: exists
          ? previous.folderIds.filter((id) => id !== folderId)
          : [...previous.folderIds, folderId],
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
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            minLength={5}
            required
          />
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
          <label>Date échéance</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
            required
          />
          <label>Statut</label>
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            {Object.values(ETATS).map((statusValue) => (
              <option key={statusValue}>{statusValue}</option>
            ))}
          </select>
          <label>Dossiers</label>
          <div className="chip-row">
            {folders.map((folder) => (
              <button
                type="button"
                key={folder.id}
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
