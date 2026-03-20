function Task({ title, description="", expiry_date }) {
  const creation_date = "01/01/2001";  // TODO: REPLACE WITH NOW IDK HOW
  const state = 'New';
  return (
    <div className="task">
      <p className="task_title">{title}</p>
      <p className="task_description">{description}</p>
      <p className="task_state">{state}</p>
    </div>
  );
}


export default Task;
