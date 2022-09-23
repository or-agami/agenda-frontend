import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { removeTask, updateTask } from '../store/board/board.action'

export const PopUpModal = ({ modalName,setModalName, task, group, board }) => {
  const dispatch = useDispatch()
  const closeModal = () => {
    setModalName(null)
  }
  console.log(modalName)

  useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', closeModal)
    }, 100)
    return () => {
      document.body.removeEventListener('click', closeModal)
    }
  })

  const onUpdateStatus = (status) => {
    const updatedTask = { ...task, status }
    const activity = { type: "Changed status" }
    // dispatch(updateTask({ task: updatedTask, groupId: group.id, boardId: board._id }, activity))
  }

  const onRemoveTask = () => {
    const removeObj = { taskId: task.id, groupId: group.id, boardId: board._id }
    // dispatch(openModal('isTaskMenuOpen',taskId))
    // dispatch(removeTask(removeObj))
  }

  const onUpdatePriority = (priority) => {
    const updatedTask = { ...task, priority }
    // dispatch(closeModals())
    const activity = { type: "Changed priority" }
    // dispatch(updateTask({ task: updatedTask, groupId: group.id, boardId: board._id }, activity))
  }

  switch (modalName) {
    case 'TASK_MENU':
      return <section className="task-menu modal"  onClick={(ev) => ev.stopPropagation()}>
        <button onClick={onRemoveTask} className='btn btn-svg btn-trash-task'><Trash /> Delete</button>
      </section>
    case 'TASK_STATUS_MENU':
      return <section className="task-status-menu modal"  onClick={(ev) => ev.stopPropagation()}>
        <button className='btn-status working-on-it' onClick={() => onUpdateStatus('Working on it')}>Working on it</button>
        <button className='btn-status stuck' onClick={() => onUpdateStatus('Stuck')}>Stuck</button>
        <button className='btn-status done' onClick={() => onUpdateStatus('Done')}>Done</button>
        <button className='btn-status waiting-for-qa' onClick={() => onUpdateStatus('Waiting for QA')}>Waiting for QA</button>
        <button className='btn-status need-help' onClick={() => onUpdateStatus('Need help')}>Need help</button>
        <button className='btn-status pending' onClick={() => onUpdateStatus('Pending')}>Pending</button>
        <button className='btn-status empty-status' onClick={() => onUpdateStatus('')}></button>
      </section>
    case 'TASK_PRIORITY_MENU':
      return <section className="task-priority-menu modal"  onClick={(ev) => ev.stopPropagation()}>
        <button className='btn-priority critical' onClick={() => onUpdatePriority('Critical')}>Critical ⚠</button>
        <button className='btn-priority medium' onClick={() => onUpdatePriority('Medium')}>Medium</button>
        <button className='btn-priority high' onClick={() => onUpdatePriority('High')}>High</button>
        <button className='btn-priority low' onClick={() => onUpdatePriority('Low')}>Low</button>
        <button className='btn-priority empty-status' onClick={() => onUpdatePriority('')}></button>
      </section>
    default: return console.error('cannot open modal!')
  }

  // return (
  //   <section className="task-menu modal" onClick={(ev) => ev.stopPropagation()}>
  //     <button onClick={() => console.log('hello from modal')} className='btn btn-svg btn-trash-task'><Trash /> Hello</button>
  //   </section>
  // )
}
