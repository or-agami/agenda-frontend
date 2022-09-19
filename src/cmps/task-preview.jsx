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
import { TaskPriorityMenu } from './task-priority-menu'
import { TaskPersonMenu } from './task-person-menu'
import { useRef } from 'react'

export const TaskPreview = ({ task, group, board }) => {
    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false)

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
        dispatch(updateTask({ task: editedTask, groupId: group.id, boardId: board._id }))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }

    // const onSetTaskStatusMenuOpen = () => {
    //     setIsTaskStatusMenuOpen(prevState => prevState = !isTaskStatusMenuOpen)
    // }

    // const onSetTaskPriorityMenuOpen = () => {
    //     setIsTaskPriorityMenuOpen(prevState => prevState = !isTaskPriorityMenuOpen)
    // }

    // const onSetTaskPersonMenuOpen = () => {
    //     // isTaskPersonMenuOpen? 
    //     // document.body.removeEventListener("click", onSetTaskPersonMenuOpen):
    //     // document.body.addEventListener("click", onSetTaskPersonMenuOpen)
    //     setIsTaskPersonMenuOpen(prevState => prevState = !isTaskPersonMenuOpen)
    // }



    return <ul key={task.id} className="clean-list task-preview">
        <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsTaskMenuOpen()}><BoardMenu /></button>
        {isTaskMenuOpen && <TaskMenu taskId={task.id} group={group} boardId={board._id} setIsTaskMenuOpen={setIsTaskMenuOpen} />}
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

    const isIncludeCat = ['priority', 'status'].includes(category)
    let className = `same-width task-preview-`
    let headerTxt
    let cb = () => { }

    const [isTaskStatusMenuOpen, setIsTaskStatusMenuOpen] = useState(false)
    const [isTaskPriorityMenuOpen, setIsTaskPriorityMenuOpen] = useState(false)
    const [isTaskPersonMenuOpen, setIsTaskPersonMenuOpen] = useState(false)

    const onSetTaskStatusMenuOpen = () => {
        setIsTaskStatusMenuOpen(prevState => prevState = !isTaskStatusMenuOpen)
    }

    const onSetTaskPriorityMenuOpen = () => {
        setIsTaskPriorityMenuOpen(prevState => prevState = !isTaskPriorityMenuOpen)
    }

    const onSetTaskPersonMenuOpen = () => {
        setIsTaskPersonMenuOpen(prevState => prevState = !isTaskPersonMenuOpen)
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

    if (isIncludeCat) className += makeClass(task[category])

    return <>
        {isTaskPersonMenuOpen && <TaskPersonMenu task={task} groupId={groupId} board={board} setIsTaskPersonMenuOpen={setIsTaskPersonMenuOpen} />}
        {isTaskStatusMenuOpen && <TaskStatusMenu task={task} groupId={groupId} boardId={board._id} setIsTaskStatusMenuOpen={setIsTaskStatusMenuOpen} />}
        {isTaskPriorityMenuOpen && <TaskPriorityMenu task={task} groupId={groupId} boardId={board._id} setIsTaskPriorityMenuOpen={setIsTaskPriorityMenuOpen} />}
        <li className={className} onClick={cb}>
            {category === 'member' && <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>+</button>}
            {category === 'member' && <div className='developer-container'>
                {!task.memberIds && <NoPersonSvg className="svg-no-person" />}
                {task.memberIds && task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))}
            </div>}
            {isIncludeCat && <>
                <span className='fold'></span>
                <h4>{headerTxt}</h4>
            </>}
        </li>
    </>
}


// "cmpsOrder": [
    //     "member",
//     "status",
//     "priority",
//     "attachments",
//     "timeline"
//   ]