import { Fragment, useEffect, useState } from "react"
import { BoardHeader } from "../cmps/board-header"
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { loadBoard, loadBoards, setLoader } from "../store/board/board.action"
import { Loader } from "../cmps/loader"
import { GroupList } from "../cmps/group-list"
import { TaskDetail } from "../cmps/task-detail"
import { Dashboard } from "./dashboard"


export const Board = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { board, boards, isLoading, sortBy, filterBy } = useSelector(state => state.boardModule)

  useEffect(() => {
    if (isLoading) return
    const boardId = params.boardId
    if ((board && board._id !== boardId)) {
      dispatch(setLoader())
      dispatch(loadBoard(boardId))
    }
  }, [params, board])

  useEffect(() => {
    if (board) {
      dispatch(loadBoard(board._id, sortBy, filterBy))
    }
  }, [sortBy, filterBy])

  return (
    <div className="board-app">
      <Routes>
        <Route path="/details" element={<TaskDetail />}></Route>
      </Routes>
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
  return (
    <div className="board-details">
      {board &&
        <GroupList board={board} />}
    </div>
  )
}
