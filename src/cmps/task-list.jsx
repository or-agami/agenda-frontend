import { TaskAdd } from './task-add'
import { TaskPreview } from './task-preview'

export const TaskList = ({ group, boardId }) => {
   

    return <section className="task-list">
        {group.tasks.map((task) => (
            <div key={task.id} className='task-preview-container'>
                <TaskPreview task={task} />
               
               
               
            </div>
        ))}
        <TaskAdd
            groupId={group.id}
            boardId={boardId}
        />
    </section>
}