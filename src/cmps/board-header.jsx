import { ReactComponent as InviteSvg } from '../assets/icons/invite.svg'
import { ReactComponent as BoardMenuSvg } from '../assets/icons/board-menu.svg'
import { ReactComponent as PersonSvg } from '../assets/icons/person.svg'
import { ReactComponent as FilterSvg } from '../assets/icons/filter.svg'
import { ReactComponent as SortSvg } from '../assets/icons/sort.svg'
import { ReactComponent as HideSvg } from '../assets/icons/hide.svg'
import { ReactComponent as DownArrowSvg } from '../assets/icons/down-arrow.svg'
import { BiSearch } from 'react-icons/bi'

export const BoardHeader = ({ board }) => {
  const { title } = board
  
  return (
    <section className="board-header">
      <div className="flex board-info">
        <h1 className="title">{title}</h1>
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
        <button className="btn new-task">
          <span>New Task</span>
        </button>
        <button className="btn btn-drop-down">
          <DownArrowSvg />
        </button>
      </div>
      <button className="btn btn-svg btn-ri search">
        <BiSearch />
        <span>Search</span>
      </button>
      <button className="btn btn-svg btn-ri person">
        <PersonSvg />
        <span>Person</span>
      </button>
      <button className="btn btn-svg btn-ri filter">
        <FilterSvg />
        <span>Filter</span>
      </button>
      <button className="btn btn-svg btn-ri sort">
        <SortSvg />
        <span>Sort</span>
      </button>
      <button className="btn btn-svg btn-ri hide">
        <HideSvg />
        <span>Hide</span>
      </button>
      <button className="btn btn-svg btn-ri task-menu">
        <BoardMenuSvg />
      </button>
    </div>
  )
}