import { useState } from 'react'
import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { TaskAdd } from './task-add'
import { TaskMenu } from './task-menu'
import { TaskPreview } from './task-preview'

export const TaskList = ({ group, boardId }) => {
    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false)

    return <section className="task-list">
        {group.tasks.map((task) => (
            <div key={task.id} className='task-preview-container'>
                <button className='btn btn-svg btn-task-menu' onClick={() => setIsTaskMenuOpen(!isTaskMenuOpen)}><BoardMenu /></button>
                <TaskPreview task={task} />
            </div>
        ))}
        {isTaskMenuOpen && <TaskMenu />}
        <TaskAdd
            groupId={group.id}
            boardId={boardId}
        />
    </section>
}