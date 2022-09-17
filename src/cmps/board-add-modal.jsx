import { useEffect } from "react"

export const AddBoardModal = () => {

    useEffect(() => {
        document.body.classList.add('add-board-modal-open')

        return () => {
            document.body.classList.remove('add-board-modal-open')
        }
    }, [])

    return <section className="add-board-modal">
        <div className="add-modal">
            <h2>Create New Board</h2>
            <label htmlFor="name">
                Board name:
            </label>
            <input type="txt" id="name" />
        </div>
    </section>
}