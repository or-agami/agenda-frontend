import { Link } from "react-router-dom"

export const BoardPreview = ({ board }) => {
    console.log('board:', board)
    return (
        <Link to={`/workspace/board/${board._id}`}>
            <section className="board-preview">
                <div className="board-preview-icon">{board.title.charAt(0).toUpperCase()}</div>
                <div className="board-preview-details">
                    <h3>{board.title}</h3>
                    <p className="board-group-count">{board.groups.length} Groups</p>
                </div>
            </section>
        </Link>
    )

}