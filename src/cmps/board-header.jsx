import { ReactComponent as InviteSvg } from '../assets/icons/invite.svg'
import { ReactComponent as BoardMenuSvg } from '../assets/icons/board-menu.svg'
import { ReactComponent as HomeSvg } from '../assets/icons/home.svg'

export const BoardHeader = () => {
  return (
    <section className="board-header">
      <div className="board-info">
        <h1 className="title">New Board</h1>
        <button className="btn btn-svg invite">
          <InviteSvg />
          Invite
        </button>
        <button className="btn btn-svg invite">
          <BoardMenuSvg />
        </button>
      </div>
      <div className="board-nav">
        <HomeSvg />
        Main Table
      </div>
    </section>
  )
}