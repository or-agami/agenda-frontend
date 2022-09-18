import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'
import { TaskList } from './task-list'
import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { useState } from 'react'
import { GroupMenu } from './group-menu'
import { useDispatch } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { updateGroup } from '../store/board/board.action'

export const GroupContent = ({ group, setIsHeaderOpen, isHeaderOpen, board }) => {
    const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [editedGroup, handleChange, setGroup] = useForm(group)
    const dispatch = useDispatch()
    const onSetIsGroupMenuOpen = () => {
        setIsGroupMenuOpen(prevState => prevState = !isGroupMenuOpen)
    }

    const onSetIsHeaderOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsHeaderOpen(prevState => prevState = !isHeaderOpen)
    }

    const updateGroupName = (ev) => {
        if (ev) ev.preventDefault()
        dispatch(updateGroup({group:editedGroup,boardId:board._id}))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }


    return <section className="group-content">
        <div className='group-content-title'>
            <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsGroupMenuOpen()}><BoardMenu /></button>
            {isGroupMenuOpen && <GroupMenu groupId={group.id} boardId={board._id} />}
            <button className="btn btn-svg  btn-arrow-down" onClick={(ev) => { onSetIsHeaderOpen(ev) }}>
                <ArrowRightSvg />
            </button>
            {!isEditTitle && <h4 onClick={() => setIsEditTitle(!isEditTitle)}>{group.title}</h4>}
            {isEditTitle && <form onSubmit={(ev) => updateGroupName(ev)} onBlur={updateGroupName}>
                <input type="text" autoFocus value={editedGroup.title} name="title" onChange={handleChange} />
            </form>}
        </div>
        <ul className="group-content-header">
            <li className="group-content-header-color">
            </li>
            <li className='group-content-header-checkbox'>
                <input type="checkbox" />
            </li>
            <li className="group-content-header-item">
                <h4>Item</h4>
            </li>
            <li className="group-content-header-developer same-width">
                <h4>Person</h4>
            </li>
            <li className="group-content-header-status same-width">
                <h4>Status</h4>
            </li>
            <li className="group-content-header-priority same-width">
                <h4>Priority</h4>
            </li>
            <li className="group-content-header-last-updated same-width">
                <h4>Last updated</h4>
            </li>
            {/* <li className="group-content-header-files">
                <h4>Files</h4>
            </li> */}
            {/* <li className="group-content-header-timeline">
                <h4>TimeLine</h4>
            </li> */}
        </ul>
        <div className='group-content-tasks'>
            <TaskList
                group={group}
                board={board}
            />
        </div>
    </section>
}