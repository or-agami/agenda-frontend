import { TaskAdd } from './task-add'
import { TaskPreview } from './task-preview'

export const TaskList = ({ group, board}) => {
   

    return <section className="task-list">
        {group.tasks.map((task) => (
            <div key={task.id} className='task-preview-container'>
                <TaskPreview task={task} group={group} board={board}/>
               
               
               
            </div>
        ))}
        <TaskAdd
            group={group}
            boardId={board._id}
        />
    </section>
}