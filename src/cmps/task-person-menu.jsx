import { useDispatch } from "react-redux"
import { updateTask } from "../store/board/board.action"

export const TaskPersonMenu = ({ task, groupId, board, setIsTaskPersonMenuOpen }) => {
    const dispatch = useDispatch()
    
    const addMemberToTask = (member) => {
        setIsTaskPersonMenuOpen(false)
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
        setIsTaskPersonMenuOpen(false)
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

    const getAvailableMembers = () => {
        return board.members.filter(member => task.memberIds.includes(member._id))
    }
    const getSuggestedMembers = () => {
        return board.members.filter(menubar => !task.memberIds.includes(menubar._id))
    }

    // const handleBlur = (ev) => {
    //     console.log(ev.currentTarget.contains(ev.relatedTarget))
    //     // this.setState({ isFocus: false })
    //     if (!ev.currentTarget.contains(ev.relatedTarget)) {
    //         setIsTaskPersonMenuOpen(false)
    //     }
    // }

    return <section className="task-person-menu">
        {/* onBlur={(ev)=>handleBlur(ev)} */}
        {/* <input type="hidden" autoFocus/> */}
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