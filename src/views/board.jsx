import { Fragment, useEffect, useState } from "react"
import { BoardHeader } from "../cmps/board-header"
import { BoardList } from "../cmps/board-list"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadBoard, loadBoards } from "../store/board/board.action"
import { Loader } from "../cmps/loader"
import { GroupList } from "../cmps/group-list"
import { SideNavBar } from "../cmps/side-nav-bar"

export const Board = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { board, boards, isLoading } = useSelector(state => state.boardModule)
  // const [isOpen, setStatus] = useState(false)

  useEffect(() => {
    const boardId = params.boardId
    dispatch(loadBoard(boardId))
  }, [params])

  // useEffect(() => {
  //   if (isOpen) document.documentElement.style.setProperty('--board-grid-column', '317px 1fr')
  //   else document.documentElement.style.setProperty('--board-grid-column', '96px 1fr')
  //   return (() => document.documentElement.style.removeProperty('--board-grid-column'))
  // }, [isOpen])

  return (
    <div className="board-app">
      {isLoading ?
        <Loader /> :
        board &&
        <Fragment>
          {/* <SideNavBar isOpen={isOpen} setStatus={setStatus} /> */}
          <BoardHeader board={board} />
          <BoardDetails board={board} />
        </Fragment>
      }
    </div>
  )
}

const BoardDetails = ({ board }) => {
  return (
    <div className="board-details">
      <GroupList board={board} />
    </div>
  )
}
