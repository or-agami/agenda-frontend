import { useDispatch } from 'react-redux'
import { closeModals, updateTask } from '../store/board/board.action'

export const TaskStatusMenu = ({ task, groupId, boardId, setIsTaskStatusMenuOpen ,setIsScreenOpen}) => {
    const dispatch = useDispatch()
    const onUpdateStatus = (status) => {
        const updatedTask = { ...task, status }
        dispatch(closeModals())
        // setIsScreenOpen(prevState => prevState=false)
        // setIsTaskStatusMenuOpen(prevState => prevState=false)
        dispatch(updateTask({ task: updatedTask, groupId, boardId }))
    }

    return <section className="task-status-menu modal">
        <button className='btn-status working-on-it' onClick={() => onUpdateStatus('Working on it')}>Working on it</button>
        <button className='btn-status stuck' onClick={() => onUpdateStatus('Stuck')}>Stuck</button>
        <button className='btn-status done' onClick={() => onUpdateStatus('Done')}>Done</button>
        <button className='btn-status waiting-for-qa' onClick={() => onUpdateStatus('Waiting for QA')}>Waiting for QA</button>
        <button className='btn-status need-help' onClick={() => onUpdateStatus('Need help')}>Need help</button>
        <button className='btn-status pending' onClick={() => onUpdateStatus('Pending')}>Pending</button>
        <button className='btn-status empty-status' onClick={() => onUpdateStatus('')}></button>
    </section>
}