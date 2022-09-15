import { Fragment, useEffect } from "react"
import { BoardHeader } from "../cmps/board-header"
import { BoardList } from "../cmps/board-list"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadBoards } from "../store/board/board.action"
import { Loader } from "../cmps/loader"

export const Board = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { board, boards, isLoading } = useSelector(state => state.boardModule)

  useEffect(() => {
    dispatch(loadBoards())
  }, [])

  console.log('isLoading:', isLoading)
  return (
    <Fragment>

      <BoardHeader />
      {/* {isLoading || true ? */}
      {isLoading ?
        <Loader /> :
        <BoardList boards={boards} />
      }
    </Fragment>
  )
}