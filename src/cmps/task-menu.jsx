import { useDispatch } from 'react-redux'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { openModal, removeTask } from '../store/board/board.action'

export const TaskMenu = ({ taskId, group, boardId}) => {
    const dispatch = useDispatch()
    const onRemoveTask = () => {
        const removeObj = { taskId, groupId:group.id, boardId }
        dispatch(openModal('isTaskMenuOpen',taskId))
        dispatch(removeTask(removeObj))
    }

    return <section className="task-menu modal">
        <button onClick={onRemoveTask} className='btn btn-svg btn-trash-task'><Trash /> Delete</button>
    </section>
}

