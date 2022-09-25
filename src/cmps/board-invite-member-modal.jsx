import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addBoard } from "../store/board/board.action"

export const InviteMemberModal = ({ isInviteMemberOpen, setIsInviteMemberOpen }) => {

  const navigate = useNavigate()
  const board = useSelector(state => state.boardModule.board)
  const dispatch = useDispatch()

  useEffect(() => {
    document.body.classList.add('add-board-modal-open')
    return () => {
      document.body.classList.remove('add-board-modal-open')
    }
  }, [])

  const onAddMember = (ev) => {
    ev.preventDefault()
    const title = ev.target[0].value
    const board = {
      title
    }
    dispatch(addBoard(board))
    setIsInviteMemberOpen(!isInviteMemberOpen)
  }

  const onCloseAddModal = () => {
    setIsInviteMemberOpen(!isInviteMemberOpen)
  }

  return (
    <section className="add-board-modal">
      <div className="add-modal">
        <h2>Create New Board</h2>
        <form onSubmit={onAddMember}>
          <label htmlFor="name">
            Board name
          </label>
          <input autoFocus type="txt" id="name" />
          <div className="add-modal-btns">
            <button className="btn-create-board">Create</button>
            <button onClick={() => setIsInviteMemberOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  )
}