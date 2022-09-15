import { Fragment, useEffect } from "react"
import { BoardHeader } from "../cmps/board-header"
import { BoardList } from "../cmps/board-list"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadBoard, loadBoards } from "../store/board/board.action"
import { Loader } from "../cmps/loader"

export const Board = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { board, boards, isLoading } = useSelector(state => state.boardModule)

  useEffect(() => {
    dispatch(loadBoards())
    if (boards && boards.length > 0) {
      dispatch(loadBoard(boards[0]._id))
    }
  }, [])

  console.log('board:', board)
  return (
    <div className="board-app">
      {isLoading ?
        <Loader /> :
        board &&
        <Fragment>
          <BoardHeader board={board} />
          <BoardDetails board={board} />
        </Fragment>
      }
    </div>
  )
}

const BoardDetails = ({ board }) => {
  console.log('board:', board)
  return (
    <div className="board-details">
      {board.groups.map((group, idx) =>
        <Group group={group} key={idx} />)}
    </div>
  )
}

const Group = ({ group }) => {
  console.log('group:', group)
  const { title } = group
  return (
    <div className="group">
      <h1 className="title">{title}</h1>
      <ul className="task-list">
        <li className="cmps">
          <span className="task">Task</span>
          <span className="developer">Developer</span>
          <span className="status">status</span>
          <span className="date">Date</span>
        </li>
        {group.tasks.map((task) => (
          <li className="task-row">
            <span className="task">{task.title}</span>
            <span className="developer">{task.memberIds ? task.memberIds[0] : ''}</span>
            <span className="status">{task.status}</span>
            <span className="date">{task.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}