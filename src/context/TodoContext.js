import { createContext, useContext, useEffect, useState } from "react";
import backup from "../data/backup.json";
import { ETAT_TERMINE } from "../constants";

const TodoContext = createContext();

function mapBackup(raw) {
  // relations: build folderIds per task (uses filter + map)
  const folderMap = {};
  raw.relations.forEach((rel) => {
    folderMap[rel.tache] = folderMap[rel.tache] || [];
    folderMap[rel.tache].push(rel.dossier);
  });

  const tasks = raw.taches.map((t) => ({
    id: String(t.id),
    title: t.title,
    description: t.description || "",
    createdAt: t.date_creation,
    dueDate: t.date_echeance,
    status: t.etat,
    folderIds: folderMap[t.id]?.map(String) || [],
    equipiers: t.equipiers || [],
  }));

  const folders = raw.dossiers.map((d) => ({
    id: String(d.id),
    title: d.title,
    description: d.description || "",
    color: d.color || "#ccc",
    icon: d.icon || "",
  }));

  return { tasks, folders };
}

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const { tasks, folders } = mapBackup(backup);
    setTasks(tasks);
    setFolders(folders);
  }, []);

  const addTask = (task) => setTasks((prev) => [...prev, task]);

  const updateTask = (id, partial) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));

  const unfinishedCount = tasks.filter((t) => !ETAT_TERMINE.includes(t.status)).length;

  const resetEmpty = () => {
    if (window.confirm("Etes-vous sûr(e) de repartir de zéro ?")) {
      setTasks([]);
      setFolders([]);
    }
  };

  return (
    <TodoContext.Provider value={{ tasks, folders, addTask, updateTask, unfinishedCount, resetEmpty }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);