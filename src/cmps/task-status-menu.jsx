import { useDispatch } from 'react-redux'
// import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
// import { removeTask } from '../store/board/board.action'

export const TaskStatusMenu = ({taskId,groupId,boardId}) => {
    const dispatch = useDispatch()
    // const onRemoveTask =() => {
    //     const removeObj = {taskId,groupId,boardId}
    //     dispatch(removeTask(removeObj))
        
    // }

return <section className="task-status-menu">
    <button className='btn-status working-on-it'>Working on it</button>
    <button className='btn-status stuck'>Stuck</button>
    <button className='btn-status done'>Done</button>
    <button className='btn-status waiting-for-qa'>Waiting for QA</button>
    <button className='btn-status need-help'>Need help</button>
    <button className='btn-status pending'>Pending</button>
    <button className='btn-status empty-status'></button>
</section>
}