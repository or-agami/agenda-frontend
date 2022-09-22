import { useDispatch } from 'react-redux'
import { closeModals, updateTask } from '../store/board/board.action'

export const TaskPriorityMenu = ({task,groupId,boardId}) => {
    const dispatch = useDispatch()
    const onUpdatePriority = (priority) => {
        const updatedTask = {...task,priority}
        dispatch(closeModals())
        const activity = {type: "Changed priority"}
        dispatch(updateTask({task:updatedTask,groupId,boardId}, activity))
    }


return <section className="task-priority-menu modal">
    <button className='btn-priority critical' onClick={()=>onUpdatePriority('Critical')}>Critical ⚠</button>
    <button className='btn-priority medium' onClick={()=>onUpdatePriority('Medium')}>Medium</button>
    <button className='btn-priority high' onClick={()=>onUpdatePriority('High')}>High</button>
    <button className='btn-priority low' onClick={()=>onUpdatePriority('Low')}>Low</button>
    <button className='btn-priority empty-status' onClick={()=>onUpdatePriority('')}></button>
</section>
}