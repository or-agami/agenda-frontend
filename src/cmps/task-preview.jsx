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

    const { itemId, isTaskMenuOpen, isScreenOpen } = useSelector(state => state.boardModule.modals)
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
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
        if (task.title !== editedTask.title) {
            // Todo: Prevent guests from editing tasks
            editedTask.lastUpdated = { date: Date.now(), byUserId: loggedinUser._id || 'Guest' }
            dispatch(updateTask({ task: editedTask, groupId: group.id, boardId: board._id }))
        }
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }




    return <ul key={task.id} className="clean-list task-preview">
        <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsTaskMenuOpen()}><BoardMenu /></button>
        {(isTaskMenuOpen && itemId === task.id && isScreenOpen) && <TaskMenu taskId={task.id} group={group} boardId={board._id} />}
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
        {board.cmpsOrder && board.cmpsOrder.map(category => <DynamicCmp key={category} board={board} category={category} task={task} groupId={group.id} />)}
    </ul>
}





const DynamicCmp = ({ board, task, category, groupId }) => {

    const dispatch = useDispatch()
    const { itemId, isTaskStatusMenuOpen, isTaskPriorityMenuOpen, isTaskPersonMenuOpen, isScreenOpen } = useSelector(state => state.boardModule.modals)
    const isIncludeCategory = ['priority', 'status'].includes(category)
    let className = `same-width task-preview-`
    let headerTxt
    let cb = () => { }

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

    const makeClass = (status) => {
        if (!status) return
        return status.split(' ').join('')
    }

    switch (category) {

        case 'member':
            className += `developer `
            break;

        case 'status':
            headerTxt = task[category]
            className += `status `
            cb = onSetTaskStatusMenuOpen

            break;
        case 'priority':
            headerTxt = task[category]
            className += `priority `
            cb = onSetTaskPriorityMenuOpen

            break;
        case 'attachments':


            break;
        case 'timeline':


            break;
        case 'lastUpdated':


            break;

        default:
            break;
    }

    if (isIncludeCategory && category !== 'lastUpdated') className += makeClass(task[category])

    return <>
        {(isTaskPersonMenuOpen && itemId === task.id && isScreenOpen) &&
            <TaskPersonMenu task={task} groupId={groupId} board={board} />
        }
        {(isTaskStatusMenuOpen && itemId === task.id && isScreenOpen) &&
            <TaskStatusMenu task={task} groupId={groupId} boardId={board._id} />
        }
        {(isTaskPriorityMenuOpen && itemId === task.id && isScreenOpen) &&
            <TaskPriorityMenu task={task} groupId={groupId} boardId={board._id} />
        }
        <li className={className} onClick={cb}>
            {category === 'member' && 
            <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>+
            </button>}
            {category === 'member' && 
            <div className='developer-container'>
                {task.memberIds ?
                 task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))
                 :
                 <NoPersonSvg className="svg-no-person" />}
            </div>}
            {isIncludeCategory && <>
                <span className='fold'></span>
                <h4>{headerTxt}</h4>
            </>}
        </li>
    </>
}
