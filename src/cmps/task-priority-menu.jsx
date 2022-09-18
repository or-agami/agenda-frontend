import { useDispatch } from 'react-redux'
import { updateTask } from '../store/board/board.action'
// import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
// import { removeTask } from '../store/board/board.action'

export const TaskPriorityMenu = ({task,groupId,boardId,setIsTaskPriorityMenuOpen}) => {
    const dispatch = useDispatch()
    // const onRemoveTask =() => {
    //     const removeObj = {taskId,groupId,boardId}
    //     dispatch(removeTask(removeObj))
        
    // }
    const onUpdatePriority = (priority) => {
        const updatedTask = {...task,priority}
        dispatch(updateTask({task:updatedTask,groupId,boardId}))
        setIsTaskPriorityMenuOpen(false)
    }

return <section className="task-priority-menu">
    <button className='btn-priority critical' onClick={()=>onUpdatePriority('Critical ⚠')}>Critical⚠</button>
    <button className='btn-priority medium' onClick={()=>onUpdatePriority('Medium')}>Medium</button>
    <button className='btn-priority high' onClick={()=>onUpdatePriority('High')}>High</button>
    <button className='btn-priority low' onClick={()=>onUpdatePriority('Low')}>Low</button>
    <button className='btn-priority empty-status' onClick={()=>onUpdatePriority('')}></button>
</section>
}