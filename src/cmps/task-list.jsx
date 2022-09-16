import { TaskAdd } from './task-add'
import {TaskPreview} from './task-preview'
export const TaskList = ({group}) => {
    return <section className="task-list">
        {group.tasks.map((task) => (
                <TaskPreview key={task.id} task={task} />
            ))}
            <TaskAdd/>
    </section>
}