// import { useDispatch } from "react-redux"
// import { closeModals, updateTask } from "../store/board/board.action"
// import { GrClose } from 'react-icons/gr'

// export const TaskDetailPersonMenu = ({task, groupId, board}) => {
//     const dispatch = useDispatch()
//     const addMemberToTask = (member) => {
//         let updatedTask
//         if (task.memberIds) {
//             if (task.memberIds.includes(member._id)) {
//                 dispatch(closeModals())
//                 return
//             }
//             updatedTask = { ...task, memberIds: [...task.memberIds, member._id]}
//         }
//         else {
//             updatedTask = { ...task, memberIds: [member._id]}
//         }
//         dispatch(closeModals())
//         dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id}))
//         return 
//     }

//     const getAvailableMembers = () => {
//         return board.members.filter(member => task.memberIds?.includes(member._id))
//     }

//     const getSuggestedMembers = () => {
//         return board.members.filter(menubar => !task.memberIds?.includes(menubar._id))
//     }

//     const closeTaskDetailPersonMenu = () => {
//         dispatch(closeModals())
//     }

//     return <section className='task-detail-person-menu'>
//         <button className="btn btn-svg btn-svg-x" onClick={() => closeTaskDetailPersonMenu()}><GrClose /></button>
//          {getAvailableMembers().map(member => {
//             return <div key={member._id} className="member-container-available">
//                 <div className="available-img-container">
//                     <img src={require(`../assets/img/${member.imgUrl}.png`)} alt="" />
//                 </div>
//                 <h4>{member.fullname}</h4>
//             </div>
//         })}

//     </section>
// }