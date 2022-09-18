import { useDispatch } from 'react-redux'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { removeTask } from '../store/board/board.action'

export const TaskMenu = ({ taskId, group, boardId, setIsTaskMenuOpen }) => {
    const dispatch = useDispatch()
    const onRemoveTask = () => {
        const removeObj = { taskId, groupId:group.id, boardId }
        dispatch(removeTask(removeObj))
        setIsTaskMenuOpen(false)
    }

    return <section className="task-menu">
        <button onClick={onRemoveTask} className='btn btn-svg btn-trash-task'><Trash /> Delete</button>
    </section>
}

