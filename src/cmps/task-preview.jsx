import { ReactComponent as BoardMenu } from '../assets/icons/board-menu.svg'
import { ReactComponent as StartConversationSvg } from '../assets/icons/start-conversation.svg'
import { TaskMenu } from './task-menu'
import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { openModal, updateTask } from '../store/board/board.action'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TaskDetailPersonMenu } from './task-detail-person-menu'
import { DynamicTaskCmp } from './dynamic-task-cmp'


export const TaskPreview = ({ task, group, board }) => {

  const { itemId, isTaskDetailPersonMenuOpen, isTaskDetailOpen, isTaskMenuOpen, isScreenOpen } = useSelector(state => state.boardModule.modals)
  const loggedinUser = useSelector(state => state.userModule.loggedinUser)
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [editedTask, handleChange, setTask] = useForm(task)
  const dispatch = useDispatch()

  const onSetIsTaskMenuOpen = () => {
    dispatch(openModal('isTaskMenuOpen', task.id))
  }

  const updateTitle = (ev) => {
    if (ev) ev.preventDefault()
    if (task.title !== editedTask.title) {
      // Todo: Prevent guests from editing tasks
      editedTask.lastUpdated = { date: Date.now(), byUserId: loggedinUser?._id || 'Guest' }
      const activity = {type: "title", data: editedTask.title}
      task.lastUpdated = { date: Date.now(), byUserId: loggedinUser?._id || 'Guest' }
      dispatch(updateTask({ task: editedTask, groupId: group.id, boardId: board._id }, activity))
    }
    setIsEditTitle(prevState => prevState = !isEditTitle)
  }


  return <ul key={task.id} className="clean-list task-preview">
    <button className='btn btn-svg btn-task-menu' onClick={() => onSetIsTaskMenuOpen()}><BoardMenu /></button>
    {(isTaskMenuOpen && itemId === task.id && isScreenOpen) && <TaskMenu taskId={task.id} group={group} boardId={board._id} />}
    <li className={`task-preview-group-color ${group.style}`}>
    </li>
    <li className='flex justify-center task-preview-checkbox'>
      <input className='task-check-input' type="checkbox" />
    </li>
    <div className='item-container'>
      <li className='item-preview-sub-task-expansion'>

      </li>
      <div className='item-container-right'>
        <li className="task-preview-item">
          {!isEditTitle && <h4 onClick={() => setIsEditTitle(!isEditTitle)}>{task.title}</h4>}
          {isEditTitle && <form onSubmit={(ev) => updateTitle(ev)} onBlur={updateTitle}>
            <input type="text" autoFocus value={editedTask.title} name="title" onChange={handleChange} />
          </form>}
        </li>
        <li className="task-preview-start-conversation">
          <Link to={`/workspace/board/${board._id}/details?groupId=${group.id}&taskId=${task.id}`} className="btn btn-svg btn-start-conversation">
            <StartConversationSvg />
          </Link>
        </li>
      </div>
    </div>
    {board.cmpsOrder && board.cmpsOrder.map(category => <DynamicTaskCmp key={category} board={board} category={category} task={task} group={group} />)}
    {(isTaskDetailPersonMenuOpen && itemId === task.id) && <TaskDetailPersonMenu task={task} groupId={group.id} board={board} />}
    <li><div></div></li>
  </ul>
}
