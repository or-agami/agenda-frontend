import { useEffect } from "react"

export const AddBoardModal = () => {

    useEffect(() => {
        document.body.classList.add('add-board-modal-open')

        return () => {
            document.body.classList.remove('add-board-modal-open')
        }
    }, [])

    return <section className="add-board-modal">
        <div>
            <h2>Create New Board</h2>
            <label>
                Board name:
                <input type='txt' />
            </label>
        </div>
    </section>
}