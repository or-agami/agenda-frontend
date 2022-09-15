import { BoardPreview } from "./board-preview"

export const BoardList = ({ boards }) => {
    console.log('boards:', boards)
    return (
        <section className="board-list">
            {boards.map((board, idx) =>
                <BoardPreview board={board} key={idx} />)}
        </section>
    )
}