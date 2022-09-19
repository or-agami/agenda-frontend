import { useDispatch, useSelector } from "react-redux"
import { closeModals } from "../store/board/board.action"

export const ModalScreen = () => {
    const dispatch = useDispatch()
    const isScreenOpen = useSelector(state => state.boardModule.modals.isScreenOpen)
    
    const handleOnModalClick = () => {
        dispatch(closeModals())
    }
    if(isScreenOpen) return <section className="modal-screen" onClick={handleOnModalClick}>
    </section>
    return <></>
}