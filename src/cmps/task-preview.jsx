import moment from 'moment/moment'
import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as StartConversationSvg } from '../assets/icons/start-conversation.svg'
import { TaskMenu } from './task-menu'
import { useState } from 'react'
export const TaskPreview = ({ task }) => {
    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false)
    const onSetIsTaskMenuOpen = () => {
        setIsTaskMenuOpen(prevState => prevState = !isTaskMenuOpen)
    }
    const getFormattedDateTime = (date) => {
        if (!date) return
        return moment(date).fromNow()
    }

    return <ul key={task.id} className="clean-list task-preview">
        <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsTaskMenuOpen()}><BoardMenu /></button>
        {isTaskMenuOpen && <TaskMenu/>}
        <li className="task-preview-group-color">
        </li>
        <li className='task-preview-checkbox'>
            <input type="checkbox" />
        </li>
        <div className='item-container'>
            <li className='item-preview-sub-task-expansion'>

            </li>
            <div className='item-container-right'>
                <li className="task-preview-item">
                    <h4>{task.title}</h4>
                </li>
                <li className="task-preview-start-conversation">
                    <button className="btn btn-svg btn-start-conversation">
                        <StartConversationSvg />
                    </button>
                </li>
            </div>
        </div>
        <li className="task-preview-developer same-width">
            <h4>{task.members && task.members[0].fullname}</h4>
        </li>
        <li className="task-preview-status same-width">
            <h4>{task.status}</h4>
        </li>
        <li className="task-preview-priority same-width">
            <h4>{task.priority}</h4>
        </li>
        <li className="task-preview-last-updated same-width">
            <h4>{getFormattedDateTime(task.createdAt)}</h4>
        </li>
        {/* <li className="task-preview-files">
                <h4>Cookie file</h4>
            </li> */}
        {/* <li className="task-preview-timeline">
                <h4>Nov 1</h4>
            </li> */}

    </ul>
}