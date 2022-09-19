import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'
import { useForm } from '../hooks/useForm'
import { updateGroup } from '../store/board/board.action'



export const GroupHeader = ({ group, setIsHeaderOpen, isHeaderOpen, boardId, idx }) => {
    const dispatch = useDispatch()
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [editedGroup, handleChange, setGroup] = useForm(group)

    const onSetIsHeaderOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsHeaderOpen(prevState => prevState = !isHeaderOpen)
    }

    const updateGroupName = (ev) => {
        if (ev) ev.preventDefault()
        dispatch(updateGroup({ group: editedGroup, boardId }))
        setIsEditTitle(prevState => prevState = !isEditTitle)
    }

    return <ul className="group-header">
                    <li className={`group-header-color ${group.style}`}>

                    </li>
                    <li className="group-header-name">
                        <button className="btn btn-svg btn-arrow-down" onClick={(ev) => { onSetIsHeaderOpen(ev) }}>
                            <ArrowRightSvg className={`${group.style} no-background`} />
                        </button>
                        {!isEditTitle && <h4 onClick={() => setIsEditTitle(!isEditTitle)} className={`${group.style} no-background group-header-title-h4`}>{group.title}</h4>}
                        {isEditTitle && <form onSubmit={(ev) => updateGroupName(ev)} onBlur={updateGroupName}>
                            <input type="text" autoFocus value={editedGroup.title} name="title" onChange={handleChange} className={`${group.style} no-background`} />
                        </form>}
                    </li>
                    {/* <div className="wrapper"> */}
                    <li className="group-header-developer">

                    </li>
                    <li className="group-header-status">
                        <h4>Status</h4>
                    </li>
                    <li className="group-header-priority">
                        <h4>Priority</h4>
                    </li>
                    <li className="group-header-last-updated">
                        {/* <h4>Last updated</h4> */}
                    </li>
                    <li className="group-header-files">
                        <h4>Files</h4>
                    </li>
                    <li className="group-header-timeline">
                        <h4>TimeLine</h4>
                    </li>
                    {/* </div> */}
                </ul>
}