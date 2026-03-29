import TaskItem from "./TaskItem";

export default function TaskList({ tasks, folders }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} folders={folders} />
      ))}
      {tasks.length === 0 && <p>Aucune tache trouvée.</p>}
    </div>
  );
}
