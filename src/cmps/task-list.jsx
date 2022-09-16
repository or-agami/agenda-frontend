import {TaskPreview} from './task-preview'
export const TaskList = ({group}) => {
    return <ul className="task-list">
        {group.tasks.map((task) => (
                <TaskPreview key={task.id} task={task} />
            ))}
    </ul>
}