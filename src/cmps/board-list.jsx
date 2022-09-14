import { BoardPreview } from "./board-preview"

export const BoardList = ({ boards }) => {
    return (
        <section className="board-list">
            {boards.map((board) =>
                <BoardPreview board={board} key={board._id} />)}
        </section>
    )
}