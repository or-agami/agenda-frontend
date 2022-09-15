import { TaskPreview } from "./task-preview"

export const GroupPreview = ({ group }) => {
  console.log('group:', group)
  const { title } = group
  return (
    <div className="group">
      <h1 className="title">{title}</h1>
      <ul className="task-list">
        <li className="cmps">
          <span className="task">Task</span>
          <span className="developer">Developer</span>
          <span className="status">status</span>
          <span className="date">Date</span>
        </li>
        {group.tasks.map((task) => (
          <TaskPreview key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}