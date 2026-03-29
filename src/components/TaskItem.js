import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { ETATS, ETAT_TERMINE } from "../constants";

export default function TaskItem({ task, folders }) {
  const { updateTask } = useTodo();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  // if folderIds is null, it makes an empty list instead lol this is dumb
  const folderObjects = (task.folderIds || []).map((folderId) => folders.find((folder) => folder.id === folderId)).filter(Boolean);

  const save = () => {
    if (form.title.length < 5 || !form.dueDate) return;
    updateTask(task.id, { ...task, ...form });
    setEditing(false);
  };

  const toggleStatus = () => {
    const isDone = ETAT_TERMINE.includes(task.status);
    const nextStatus = isDone ? ETATS.EN_COURS : ETATS.REUSSI;
    updateTask(task.id, { status: nextStatus });
  };

  const addFolder = (folderId) => {
    if (!folderId) return;
    if (!task.folderIds.includes(folderId)) {
      updateTask(task.id, { folderIds: [...task.folderIds, folderId] });
    }
  };

  return (
    <div className="task">
      <div className="task-main">
        <button className="triangle" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "▼" : "▶"}
        </button>

        {!editing ? (
          <>
            <div>
              <strong>{task.title}</strong>
              <div className="meta">Echéance : {task.dueDate}</div>
            </div>
            <div className="folders">
              {folderObjects.slice(0, 2).map((folder) => (
                <span key={folder.id} className="tag" style={{ background: folder.color }}>
                  {folder.title}
                </span>
              ))}
              {folderObjects.length > 2 && !expanded && (
                <span className="tag">+{folderObjects.length - 2}</span>
              )}
            </div>
          </>
        ) : (
          <div className="edit-form">
            <input
              value={form.title}
              minLength={5}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
            />
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </div>
        )}

        <div className="actions">
          <button onClick={toggleStatus}>
            {ETAT_TERMINE.includes(task.status) ? "Réouvrir" : "Terminer"}
          </button>
          {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
          {editing && <button onClick={save}>OK</button>}
        </div>
      </div>

      {expanded && (
        <div className="task-extra">
          <p>{task.description || "(pas de description)"}</p>
          <div className="folders">
            {folderObjects.map((folder) => (
              <span key={folder.id} className="tag" style={{ background: folder.color }}>
                {folder.title}
              </span>
            ))}
          </div>
          <div className="add-folder">
            <select onChange={(event) => addFolder(event.target.value)}>
              <option value="">+ dossier</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
