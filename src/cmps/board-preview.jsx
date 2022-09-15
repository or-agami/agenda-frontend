
export const BoardPreview = ({ board }) => {
    console.log('board:', board)
    return (
        <section className="board-preview">
            <h1>BoardId: {board._id}</h1>
        </section>
    )
}