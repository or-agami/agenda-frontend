import { ReactComponent as InviteSvg } from '../assets/icons/invite.svg'
import { ReactComponent as BoardMenuSvg } from '../assets/icons/board-menu.svg'
import { ReactComponent as PersonSvg } from '../assets/icons/person.svg'
import { ReactComponent as FilterSvg } from '../assets/icons/filter.svg'
import { ReactComponent as SortSvg } from '../assets/icons/sort.svg'
import { ReactComponent as HideSvg } from '../assets/icons/hide.svg'
import { ReactComponent as DownArrowSvg } from '../assets/icons/down-arrow.svg'
import { BiSearch } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useForm } from '../hooks/useForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBoard } from '../store/board/board.action'
import { useFilter } from '../hooks/useFilter'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const BoardHeader = ({ board }) => {
  const { title } = board

  const params = useParams()
  const dispatch = useDispatch()
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameTitle, handleChange] = useForm({ title: board.title })
  const [isDashboard, setIsDashboard] = useState(false)

  useEffect(() => {
    if (params['*'] === `board/dashboard/${board._id}`) {
      setIsDashboard(true)
    } else {
      setIsDashboard(false)
    }

  }, [params])

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
        <div className='header-main'>
          {isRenaming ? <form className='rename-form' onSubmit={onRenameBoard} onBlur={onRenameBoard}>
            <input autoFocus type="text" name='title' value={renameTitle.title} onChange={handleChange} />
          </form>
            : <h1 onClick={changeBoardTitle} className="title">{title}</h1>}
          <NavLink to={`/workspace/board/${board._id}`} className="board-header-nav-link">Main Table</NavLink>
          <NavLink to={`/workspace/board/dashboard/${board._id}`} className="board-header-nav-link">Dashboard</NavLink>
        </div>
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
      {!isDashboard && <div className="flex board-nav">
        <BoardControls />
      </div>}
    </section>
  )
}

const BoardControls = () => {

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const onToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

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
      {isSearchOpen ?
        <SearchFilter isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        // <input className="input input-search"
        //   onBlur={(ev) => onToggleSearch(ev.target.value)}
        //   autoFocus
        //   type="text"
        //   name="term"
        //   value={filterBy?.term || ''}
        //   onChange={(ev) => handleFilterChange({ term: ev.target.value })}
        // />
        :
        <button className="btn btn-svg btn-ri btn-search"
          onClick={onToggleSearch}>
          <BiSearch />
          <span>Search</span>
        </button>
      }
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

const SearchFilter = ({ isSearchOpen, setIsSearchOpen }) => {

  const [filterBy, handleFilterChange, setFilterBy] = useFilter(null)

  const onToggleSearch = (inputValue) => {
    if (filterBy?.term && inputValue) return
    setIsSearchOpen(!isSearchOpen)
  }

  const onClearSearch = () => {
    setFilterBy({ term: '' })
  }

  return (
    <div className={`flex align-center board-search-filter ${filterBy?.term ? 'active' : ''}`}
      onBlur={(ev) => onToggleSearch(ev.target.value)}
    >
      <span className="icon icon-bi">
        <BiSearch />
      </span>
      <div className="input-container">
        <input className="input input-search"
          autoFocus
          type="text"
          name="term"
          placeholder="Search"
          value={filterBy?.term || ''}
          onChange={(ev) => handleFilterChange({ term: ev.target.value })} />
      </div>
      {filterBy?.term &&
        <button className="btn btn-svg btn-clear-search"
          onClick={onClearSearch} >
          <AiFillCloseCircle />
        </button>}
    </div>
  )
}