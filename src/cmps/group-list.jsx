import { GroupPreview } from "./group-preview"
import { ReactComponent as PlusIcon } from '../assets/icons/plus-icon.svg'
import { useDispatch } from "react-redux"
import { addGroup } from "../store/board/board.action"

export const GroupList = ({ board }) => {
  const dispatch = useDispatch()

  const onAddGroup = () => {
    dispatch(addGroup(board._id))
  }

  return <section className="group-list">
    {board.groups.map((group, idx) =>
        <GroupPreview 
        key={idx} 
        group={group}
        board={board}
        />)} 

        <button className="btn btn-svg add-group-btn" onClick={onAddGroup}><PlusIcon/> Add new group</button>
  </section>  
}