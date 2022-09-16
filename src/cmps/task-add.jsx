
export const TaskAdd = ({groupId}) => {
    const onAddTask =({taget}) => {
        
    }

    return <ul className="task-add">
        <li className="task-add-group-color">
        </li>
        <li className='task-add-checkbox'>
            <input disabled type="checkbox" />
        </li>
        <li className="task-add-item">
            <input type="text" placeholder="+ Add item" onSubmit={(ev)=>onAddTask(ev)}/>
        </li>
    </ul>
}