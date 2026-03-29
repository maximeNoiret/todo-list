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
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) =>
      selectedFolderId ? task.folderIds?.includes(selectedFolderId) : true
    )
    .filter((task) =>
      selectedStatus === "ALL" ? true : task.status === selectedStatus
    );

  const toggleFilterValue = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return { ...prev, [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value] };
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
          onToggleStatus={(s) => toggleFilterValue("status", s)}
          onToggleFolder={(id) => toggleFilterValue("folderIds", id)}
          onToggleDefault={() => setFilters((f) => ({ ...f, unfinishedOnly: !f.unfinishedOnly }))}
        />
        <SortControls sort={sort} onChange={setSort} />
      </div>
      <TaskList tasks={filteredTasks} folders={folders} />
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
