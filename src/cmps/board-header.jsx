import { ReactComponent as InviteSvg } from '../assets/icons/invite.svg'
import { ReactComponent as BoardMenuSvg } from '../assets/icons/board-menu.svg'
import { ReactComponent as PersonSvg } from '../assets/icons/person.svg'
import { ReactComponent as FilterSvg } from '../assets/icons/filter.svg'
import { ReactComponent as SortSvg } from '../assets/icons/sort.svg'
import { ReactComponent as HideSvg } from '../assets/icons/hide.svg'
import { ReactComponent as DownArrowSvg } from '../assets/icons/down-arrow.svg'
import { BiSearch } from 'react-icons/bi'
import { useForm } from '../hooks/useForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBoard } from '../store/board/board.action'

export const BoardHeader = ({ board }) => {
  const { title } = board

  const dispatch = useDispatch()
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameTitle, handleChange] = useForm({ title: board.title })

  const changeBoardTitle = () => {
    setIsRenaming(!isRenaming)
  }

  const onRenameBoard = (ev) => {
    ev.preventDefault()
    board = { ...board, ...renameTitle }
    setIsRenaming(!isRenaming)
    dispatch(updateBoard(board))
  }

  return (
    <section className="board-header">
      <div className="flex board-info">
        {isRenaming ? <form className='rename-form' onSubmit={onRenameBoard} onBlur={onRenameBoard}>
          <input autoFocus type="text" name='title' value={renameTitle.title} onChange={handleChange} />
        </form>
          : <h1 onClick={changeBoardTitle} className="title">{title}</h1>}
        <div className="flex btns-container">
          <button className="btn btn-svg invite">
            <InviteSvg />
            <span>Invite</span>
          </button>
          <button className="btn btn-svg invite">
            <BoardMenuSvg />
          </button>
        </div>
      </div>
      <div className="flex board-nav">
        <BoardControls />
      </div>
    </section>
  )
}

const BoardControls = () => {
  return (
    <div className="flex aline btns-container">
      <div className="btn btn-highlight btn-options">
        <button className="btn btn-new-task">
          <span>New Task</span>
        </button>
        <button className="btn btn-drop-down">
          <DownArrowSvg />
        </button>
      </div>
      <button className="btn btn-svg btn-ri btn-search">
        <BiSearch />
        <span>Search</span>
      </button>
      <button className="btn btn-svg btn-person">
        <PersonSvg />
        <span>Person</span>
      </button>
      <button className="btn btn-svg btn-filter">
        <FilterSvg />
        <span>Filter</span>
      </button>
      <button className="btn btn-svg btn-sort">
        <SortSvg />
        <span>Sort</span>
      </button>
      <button className="btn btn-svg btn-hide">
        <HideSvg />
        <span>Hide</span>
      </button>
      <button className="btn btn-svg btn-task-menu">
        <BoardMenuSvg />
      </button>
    </div>
  )
}