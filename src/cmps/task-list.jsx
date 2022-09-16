import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { TaskAdd } from './task-add'
import {TaskPreview} from './task-preview'
export const TaskList = ({group}) => {
    return <section className="task-list">
        {group.tasks.map((task) => (
            <div className='task-preview-container'>
                <button className='btn btn-svg btn-task-menu'><BoardMenu/></button>
                <TaskPreview key={task.id} task={task} />
            </div>
            ))}
            <TaskAdd groupId={group.id}/>
    </section>
}