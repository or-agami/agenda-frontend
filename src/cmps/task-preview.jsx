import moment from 'moment/moment'
import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as StartConversationSvg } from '../assets/icons/start-conversation.svg'
import { ReactComponent as NoPersonSvg } from '../assets/icons/no-person-icon.svg'
import { TaskMenu } from './task-menu'
import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { updateTask } from '../store/board/board.action'
import { useDispatch } from 'react-redux'
import { TaskStatusMenu } from './task-status-menu'

export const TaskPreview = ({ task, groupId, boardId }) => {
    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false)
    const [isTaskStatusMenuOpen, setIsTaskStatusMenuOpen] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [editedTask, handleChange, setTask] = useForm(task)
    const dispatch = useDispatch()

    const onSetIsTaskMenuOpen = () => {
        setIsTaskMenuOpen(prevState => prevState = !isTaskMenuOpen)
    }

    const getFormattedDateTime = (date) => {
        if (!date) return
        return moment(date).fromNow()
    }

    const updateTitle = (ev) => {
        if (ev) ev.preventDefault()
        dispatch(updateTask({ task: editedTask, groupId, boardId }))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }

    const onSetTaskStatusMenuOpen = () => {
        setIsTaskStatusMenuOpen(prevState => prevState = !isTaskStatusMenuOpen)
    }


    return <ul key={task.id} className="clean-list task-preview">
        <button className='btn btn-svg btn-task-menu' onClick={onSetIsTaskMenuOpen}><BoardMenu /></button>
        {isTaskMenuOpen && <TaskMenu taskId={task.id} groupId={groupId} boardId={boardId} />}
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
                    {!isEditTitle && <h4 onClick={() => setIsEditTitle(!isEditTitle)}>{task.title}</h4>}
                    {isEditTitle && <form onSubmit={(ev) => updateTitle(ev)} onBlur={updateTitle}>
                        <input type="text" autoFocus value={editedTask.title} name="title" onChange={handleChange} />
                    </form>}
                </li>
                <li className="task-preview-start-conversation">
                    <button className="btn btn-svg btn-start-conversation">
                        <StartConversationSvg />
                    </button>
                </li>
            </div>
        </div>
        <li className="task-preview-developer same-width">
            <button className="btn btn-add-developer">+</button>
            {!task.members && <NoPersonSvg className="svg-no-person" />}
            {task.members && <h4> {task.members[0].fullname}</h4>}
        </li>
        <li className="task-preview-status same-width" onClick={onSetTaskStatusMenuOpen()}>
            <h4>{task.status}</h4>
        </li>
        {/* {isTaskStatusMenuOpen && <TaskStatusMenu taskId={task.id} groupId={groupId} boardId={boardId} />} */}
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