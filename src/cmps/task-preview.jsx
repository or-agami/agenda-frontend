import moment from 'moment/moment'
import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as StartConversationSvg } from '../assets/icons/start-conversation.svg'
import { ReactComponent as NoPersonSvg } from '../assets/icons/no-person-icon.svg'
import { TaskMenu } from './task-menu'
import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { openModal, updateTask } from '../store/board/board.action'
import { useDispatch, useSelector } from 'react-redux'
import { TaskStatusMenu } from './task-status-menu'
import { TaskPriorityMenu } from './task-priority-menu'
import { TaskPersonMenu } from './task-person-menu'


export const TaskPreview = ({ task, group, board }) => {
    const { taskId, isTaskMenuOpen, isTaskStatusMenuOpen, isTaskPriorityMenuOpen, isTaskPersonMenuOpen,isScreenOpen } = useSelector(state => state.boardModule.modals)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [editedTask, handleChange, setTask] = useForm(task)
    const dispatch = useDispatch()

    const onSetIsTaskMenuOpen = () => {
        dispatch(openModal('isTaskMenuOpen', task.id))
    }

    const getFormattedDateTime = (date) => {
        if (!date) return
        return moment(date).fromNow()
    }

    const updateTitle = (ev) => {
        if (ev) ev.preventDefault()
        dispatch(updateTask({ task: editedTask, groupId: group.id, boardId: board._id }))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }

    const onSetTaskStatusMenuOpen = () => {
        dispatch(openModal('isTaskStatusMenuOpen', task.id))
    }

    const onSetTaskPriorityMenuOpen = () => {
        dispatch(openModal('isTaskPriorityMenuOpen', task.id))
    }

    const onSetTaskPersonMenuOpen = () => {
        dispatch(openModal('isTaskPersonMenuOpen', task.id))
    }

    const GetMemberImgFromId = (board, memberId) => {
        const imgUrl = board.members.find(member => member._id === memberId).imgUrl
        return <img key={memberId} className='profile-img-icon' src={require(`../assets/img/${imgUrl}.png`)} alt="" />
    }


    return <ul key={task.id} className="clean-list task-preview">
        <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsTaskMenuOpen()}><BoardMenu /></button>
        {(isTaskMenuOpen && taskId===task.id && isScreenOpen) && <TaskMenu taskId={task.id} group={group} boardId={board._id} />}
        <li className={`task-preview-group-color ${group.style}`}>
        </li>
        <li className='task-preview-checkbox'>
            <input className='task-check-input' type="checkbox" />
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
            <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>+</button>
            <div className='developer-container'>
                {!task.memberIds && <NoPersonSvg className="svg-no-person" />}
                {task.memberIds && task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))}
            </div>
        </li>
        
        {(isTaskPersonMenuOpen && taskId===task.id && isScreenOpen) && <TaskPersonMenu task={task} groupId={group.id} board={board} />}
        <li className={`task-preview-status same-width ${makeClass(task.status)}`} onClick={() => onSetTaskStatusMenuOpen()}>
            <span className='fold'></span>
            <h4>{task.status}</h4>
        </li>
        {(isTaskStatusMenuOpen && taskId===task.id && isScreenOpen) && <TaskStatusMenu task={task} groupId={group.id} boardId={board._id} />}
        <li className={`task-preview-priority same-width ${makeClass(task.priority)}`} onClick={() => onSetTaskPriorityMenuOpen()}>
            <span className='fold'></span>
            <h4>{task.priority}</h4>
        </li>
        {(isTaskPriorityMenuOpen && taskId===task.id && isScreenOpen) && <TaskPriorityMenu task={task} groupId={group.id} boardId={board._id} />}
        <li className="task-preview-last-updated same-width">
            <h4>{getFormattedDateTime(task.createdAt)}</h4>
        </li>
        <li>

        </li>
        {/* <li className="task-preview-files">
                <h4>Cookie file</h4>
            </li>
        <li className="task-preview-timeline">
                <h4>Nov 1</h4>
            </li> */}
    </ul>
}

const makeClass = (status) => {
    if (!status) return
    return status.split(' ').join('')
}

