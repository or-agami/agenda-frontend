import { ReactComponent as InviteSvg } from '../assets/icons/invite.svg'

export const BoardHeader = () => {
  return (
    <section className="board-header">
      <div className="board-info">
        <h1 className="title">New Board</h1>
        <button className="btn btn-svg invite">
          <InviteSvg />
        </button>
      </div>
    </section>
  )
}