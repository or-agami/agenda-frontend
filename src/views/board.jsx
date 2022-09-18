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
  const { board, boards, isLoading, sortBy, filterBy } = useSelector(state => state.boardModule)

  useEffect(() => {
    if (isLoading) return
    const boardId = params.boardId
    if ((!board || board._id !== boardId)){
      dispatch(loadBoard(boardId))
    } 
  }, [params])

  useEffect(() => {
    if (board) {
      dispatch(loadBoard(board._id, sortBy, filterBy))
    }
  }, [sortBy, filterBy])
  
 
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
  return (
    <div className="board-details">
      <GroupList board={board} />
    </div>
  )
}
