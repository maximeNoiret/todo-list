import { useState } from "react";
import { TodoProvider, useTodo } from "./context/TodoContext";
import { ETAT_TERMINE, ETATS } from "./constants";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Filters from "./components/Filters";
import SortControls from "./components/SortControls";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import "./styles.css";

function AppInner() {
  const { tasks, folders, unfinishedCount, resetEmpty } = useTodo();
  const [filters, setFilters] = useState({ unfinishedOnly: true, status: [], folderIds: [] });
  const [sort, setSort] = useState("dueDesc");
  const [showModal, setShowModal] = useState(false);

  const filteredTasks = tasks
    .filter((task) => (filters.unfinishedOnly ? !ETAT_TERMINE.includes(task.status) : true))
    .filter((task) => (filters.status.length ? filters.status.includes(task.status) : true))
    .filter((task) =>
      filters.folderIds.length
        ? task.folderIds?.some((folderId) => filters.folderIds.includes(folderId))
        : true
    );

  const sortedTasks = [...filteredTasks].sort((taskA, taskB) => {
    if (sort === "dueDesc") return (taskB.dueDate || "").localeCompare(taskA.dueDate || "");
    if (sort === "createdDesc") return (taskB.createdAt || "").localeCompare(taskA.createdAt || "");
    if (sort === "nameAsc") return taskA.title.localeCompare(taskB.title);
    return 0;
  });

  const toggleFilterValue = (key, value) => {
    setFilters((previousFilters) => {
      const exists = previousFilters[key].includes(value);
      return {
        ...previousFilters,
        [key]: exists
          ? previousFilters[key].filter((item) => item !== value)
          : [...previousFilters[key], value],
      };
    });
  };

  return (
    <div className="app">
      <Header total={tasks.length} unfinished={unfinishedCount} onReset={resetEmpty} />
      <div className="controls">
        <Filters
          filters={filters}
          folders={folders}
          statuses={Object.values(ETATS)}
          onToggleStatus={(status) => toggleFilterValue("status", status)}
          onToggleFolder={(folderId) => toggleFilterValue("folderIds", folderId)}
          onToggleDefault={() =>
            setFilters((current) => ({ ...current, unfinishedOnly: !current.unfinishedOnly }))
          }
        />
        <SortControls sort={sort} onChange={setSort} />
      </div>
      <TaskList tasks={sortedTasks} folders={folders} />
      <Footer onAdd={() => setShowModal(true)} />
      {showModal && <TaskModal folders={folders} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <AppInner />
    </TodoProvider>
  );
}
