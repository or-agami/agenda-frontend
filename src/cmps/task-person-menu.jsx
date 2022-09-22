import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { closeModals, updateTask } from "../store/board/board.action"

export const TaskPersonMenu = ({ task, groupId, board, setIsTaskPersonMenuOpen, setIsScreenOpen }) => {
    const dispatch = useDispatch()
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    const addMemberToTask = (member) => {
        let updatedTask
        if (task.memberIds) {
            if (task.memberIds.includes(member._id)) {
                dispatch(closeModals())
                return
            }
            updatedTask = { ...task, memberIds: [...task.memberIds, member._id] }
        }
        else {
            updatedTask = { ...task, memberIds: [member._id] }
        }
        dispatch(closeModals())
        const activity = {type:"add member", data: member}
        updatedTask.lastUpdated = { date: Date.now(), byUserId: loggedinUser?._id || 'Guest' }
        dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id }, activity))
        return
    }

    const removeMemberFromTask = (member) => {
        let updatedTask
        if (task.memberIds) {
            if (task.memberIds.includes(member._id)) {
                updatedTask = { ...task, memberIds: task.memberIds.filter(memberId => memberId !== member._id) }
                dispatch(closeModals())
                const activity = {type: "remove member", data: member}
                updatedTask.lastUpdated = { date: Date.now(), byUserId: loggedinUser?._id || 'Guest' }
                dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id }, activity))
            }
        }

    }

    const getAvailableMembers = () => {
        return board.members.filter(member => task.memberIds?.includes(member._id))
    }
    const getSuggestedMembers = () => {
        return board.members.filter(menubar => !task.memberIds?.includes(menubar._id))
    }

    return <section className="task-person-menu modal">
        {getAvailableMembers().map(member => {
            return <div key={member._id} className="member-container-available">
                <div className="available-img-container">
                    <img src={require(`../assets/img/${member.imgUrl}.png`)} alt="" />
                </div>
                <h4>{member.fullname}</h4>
                <button className="btn-remove-person-from-task" onClick={() => removeMemberFromTask(member)}>x</button>
            </div>
        })}
        <h4 className="suggested people-title">Suggested People</h4>
        {getSuggestedMembers().map(member => {
            return <div key={member._id} className="member-container-suggested" onClick={() => addMemberToTask(member)}>
                <div className="suggested-img-container">
                    <img src={require(`../assets/img/${member.imgUrl}.png`)} alt="" />
                </div>
                <h4>{member.fullname}</h4>
            </div>
        })}
    </section>
}