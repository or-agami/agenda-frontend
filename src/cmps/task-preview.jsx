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
import { useDrag, useDrop } from 'react-dnd'

export const TaskPreview = ({ task, groupId, board, idx,  moveListItem }) => {
    const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false)
    const [isTaskStatusMenuOpen, setIsTaskStatusMenuOpen] = useState(false)
    const [isTaskPriorityMenuOpen, setIsTaskPriorityMenuOpen] = useState(false)
    const [isTaskPersonMenuOpen, setIsTaskPersonMenuOpen] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [editedTask, handleChange, setTask] = useForm(task)
    const dispatch = useDispatch()

    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'task',
        item: { idx },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
        accept: 'task',
        hover: (item, monitor) => {
            const dragIndex = item.idx
            const hoverIndex = idx
            //  console.log('dragIndex', dragIndex);
            // console.log('hoverIndex', hoverIndex);
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            item.idx = hoverIndex
        },
    })

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1

    const onSetIsTaskMenuOpen = () => {
        setIsTaskMenuOpen(prevState => prevState = !isTaskMenuOpen)
    }

    const getFormattedDateTime = (date) => {
        if (!date) return
        return moment(date).fromNow()
    }

    const updateTitle = (ev) => {
        if (ev) ev.preventDefault()
        dispatch(updateTask({ task: editedTask, groupId, boardId: board._id }))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }

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


    return <ul key={task.id} className="clean-list task-preview"
        ref={dragDropRef} style={{opacity}}>
        <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsTaskMenuOpen()}><BoardMenu /></button>
        {isTaskMenuOpen && <TaskMenu taskId={task.id} groupId={groupId} boardId={board._id} setIsTaskMenuOpen={setIsTaskMenuOpen} />}
        <li className="task-preview-group-color">
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
            {!task.memberIds && <NoPersonSvg className="svg-no-person" />}
            <div className='developer-container'>
                {task.memberIds && task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))}
            </div>
        </li>
        {isTaskPersonMenuOpen && <TaskPersonMenu task={task} groupId={groupId} board={board} setIsTaskPersonMenuOpen={setIsTaskPersonMenuOpen} />}
        <li className={`task-preview-status same-width ${makeClass(task.status)}`} onClick={() => onSetTaskStatusMenuOpen()}>
            <span className='fold'></span>
            <h4>{task.status}</h4>
        </li>
        {isTaskStatusMenuOpen && <TaskStatusMenu task={task} groupId={groupId} boardId={board._id} setIsTaskStatusMenuOpen={setIsTaskStatusMenuOpen} />}
        <li className={`task-preview-priority same-width ${makeClass(task.priority)}`} onClick={() => onSetTaskPriorityMenuOpen()}>
            <span className='fold'></span>
            <h4>{task.priority}</h4>
        </li>
        {isTaskPriorityMenuOpen && <TaskPriorityMenu task={task} groupId={groupId} boardId={board._id} setIsTaskPriorityMenuOpen={setIsTaskPriorityMenuOpen} />}
        <li className="task-preview-last-updated same-width">
            <h4>{getFormattedDateTime(task.createdAt)}</h4>
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

