import { ReactComponent as InviteSvg } from '../assets/icons/invite.svg'
import { ReactComponent as BoardMenuSvg } from '../assets/icons/board-menu.svg'
import { ReactComponent as HomeSvg } from '../assets/icons/home.svg'
import {BiSearch} from 'react-icons/bi'

export const BoardHeader = () => {
  return (
    <section className="board-header">
      <div className="flex board-info">
        <h1 className="title">New Board</h1>
        <div className="btns-container">
          <button className="btn btn-svg invite">
            <InviteSvg />
            Invite
          </button>
          <button className="btn btn-svg invite">
            <BoardMenuSvg />
          </button>
        </div>
      </div>
      <div className="flex board-nav">
        <div className="btns-container">
          <button className="btn btn-ri search">
            <BiSearch />
            Search
          </button>
        </div>
      </div>
    </section>
  )
}