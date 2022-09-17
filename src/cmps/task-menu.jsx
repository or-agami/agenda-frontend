import { useDispatch } from 'react-redux'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { removeTask } from '../store/board/board.action'

export const TaskMenu = ({taskId,groupId,boardId}) => {
    const dispatch = useDispatch()
    const onRemoveTask =() => {
        const removeObj = {taskId,groupId,boardId}
        dispatch(removeTask(removeObj))
        
    }

return <section className="task-menu">
    <div className="group-color-icon-container">
        <div className="group-color-icon"></div>
        <button>Change group color</button>
    </div>
    <button onClick={onRemoveTask} className='btn btn-svg btn-trash-task'><Trash /> Delete</button>
</section>
}