import { useDispatch } from "react-redux"
import {addTask} from '../store/board/board.action'

export const TaskAdd = ({groupId}) => {
    const dispatch = useDispatch()
    

    const onAddTask =(ev) => {
        ev.preventDefault()
        console.log(ev.target[0].value)
        const task = {groupId,title: ev.target[0].value}
        dispatch(addTask())
        ev.target[0].value = ''

    }

    return <ul className="task-add">
        <li className="task-add-group-color">
        </li>
        <li className='task-add-checkbox'>
            <input disabled type="checkbox" />
        </li>
        <li className="task-add-item">
            <form onSubmit={(ev)=>onAddTask(ev)}>
            <input type="text" placeholder="+ Add item"/>
            </form>
        </li>
    </ul>
}