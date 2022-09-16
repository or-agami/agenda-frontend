export const TaskPreview = ({ task }) => {
    console.log(task)
    return (
        <li key={task.id} className="clean-list task-row">
            <span className="task">{task.title}</span>
            <span className="developer">{task.memberIds ? task.memberIds[0] : ''}</span>
            <span className="status">{task.status}</span>
            <span className="date">{task.createdAt}</span>
        </li>
    )
}