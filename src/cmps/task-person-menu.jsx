import { useDispatch } from "react-redux"
import { updateTask } from "../store/board/board.action"

export const TaskPersonMenu = ({ task, groupId, board, setIsTaskPersonMenuOpen }) => {

    const dispatch = useDispatch()

    const addMemberToTask = (member) => {
        let updatedTask
        if (task.memberIds) {
            if (task.memberIds.includes(member._id)) {
                setIsTaskPersonMenuOpen(false)
                return
            }
            updatedTask = { ...task, memberIds: [...task.memberIds, member._id] }
        }
        else {
            updatedTask = { ...task, memberIds: [member._id] }
        }
        dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id }))
        setIsTaskPersonMenuOpen(false)
        return
    }

    const removeMemberFromTask = (member) => {
        let updatedTask
        if (task.memberIds) {
            if (task.memberIds.includes(member._id)) {
                updatedTask = { ...task, memberIds: task.memberIds.filter(memberId => memberId !== member._id) }
                dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id }))
                setIsTaskPersonMenuOpen(false)
            }
        }
        return
    }

    return <section className="task-person-menu">
        {board.members.map(member => {
            return <div key={member._id} className="member-container" onClick={() => addMemberToTask(member)}>
                <img src={require(`../assets/img/${member.imgUrl}.png`)} alt="" />
                <h4>{member.fullname}</h4>
                <button className="btn-remove-person-from-task" onClick={() => removeMemberFromTask(member)}>x</button>
            </div>
        })}
    </section>
}