import { useDispatch } from 'react-redux'
import { updateTask } from '../store/board/board.action'
// import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
// import { removeTask } from '../store/board/board.action'

export const TaskStatusMenu = ({task,groupId,boardId}) => {
    const dispatch = useDispatch()
    // const onRemoveTask =() => {
    //     const removeObj = {taskId,groupId,boardId}
    //     dispatch(removeTask(removeObj))
        
    // }
    const onUpdateStatus = (status) => {
        const updatedTask = {...task,status}
        dispatch(updateTask({task:updatedTask,groupId,boardId}))
    }

return <section className="task-status-menu">
    <button className='btn-status working-on-it' onClick={()=>onUpdateStatus('Working on it')}>Working on it</button>
    <button className='btn-status stuck' onClick={()=>onUpdateStatus('Stuck')}>Stuck</button>
    <button className='btn-status done' onClick={()=>onUpdateStatus('Done')}>Done</button>
    <button className='btn-status waiting-for-qa' onClick={()=>onUpdateStatus('Waiting for QA')}>Waiting for QA</button>
    <button className='btn-status need-help' onClick={()=>onUpdateStatus('Need help')}>Need help</button>
    <button className='btn-status pending' onClick={()=>onUpdateStatus('Pending')}>Pending</button>
    <button className='btn-status empty-status' onClick={()=>onUpdateStatus('')}></button>
</section>
}