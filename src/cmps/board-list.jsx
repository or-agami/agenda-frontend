import { BoardPreview } from "./board-preview"

export const BoardList = ({ boards }) => {
    console.log('boards:', boards)
    return (
        <section className="board-list">
            {boards.map((board) =>
                <BoardPreview board={board} key={board._id} />)}
        </section>
    )
}