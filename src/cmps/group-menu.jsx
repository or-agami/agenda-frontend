import { useDispatch } from 'react-redux'
import { ReactComponent as Trash } from '../assets/icons/trash-icon.svg'
import { removeGroup } from '../store/board/board.action'

export const GroupMenu = ({groupId,boardId}) => {
    const dispatch = useDispatch()
    const onRemoveGroup =() => {
        const removeObj = {groupId,boardId}
        console.log(removeObj)
        dispatch(removeGroup(removeObj))
        
    }

return <section className="group-menu">
    <div className="group-color-icon-container">
        <div className="group-color-icon"></div>
        <button>Change group color</button>
    </div>
    <button onClick={onRemoveGroup} className='btn btn-svg btn-trash-task'><Trash /> Delete</button>
</section>
}