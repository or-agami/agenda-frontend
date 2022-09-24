import { useSelector } from "react-redux"
import { BoardHeader } from "../cmps/board-header"
import { ReactComponent as StartConversation } from "../assets/icons/start-conversation.svg"
import { ReactComponent as MenuIcon } from "../assets/icons/kanban-status.svg"
import { TaskTimeline } from "../cmps/task-timeline"
import { PopUpModal } from "../cmps/pop-up-modal"
import { useState } from "react"
import { ReactComponent as StartConversationEmptySvg } from '../assets/icons/start-conversation-empty.svg'
import { Link, Route, Routes } from "react-router-dom"
import { TaskDetail } from "../cmps/task-detail"


export const Kanban = () => {



    const board = useSelector(state => state.boardModule.board)

    if (!board) return
    return <section className="kanban">
        <BoardHeader board={board} />
        <div className="kanban-container">
            {board.groups.map(group => {
                return <KanbanGroupPreview key={group.id} group={group} board={board} />
            })}
        </div>
        <Routes>
            <Route path="/details" element={<TaskDetail />}></Route>
        </Routes>
    </section>
}


const KanbanGroupPreview = ({ group, board }) => {

    return <section className={`kanban-group-preview ${group.style}`}>
        <h3>{group.title} / {group.tasks.length}</h3>
        <div className={`kanban-task-list`}>
            {group.tasks.map(task => {
                return <KanbanTaskPreview key={task.id} task={task} group={group} board={board} />
            })}
        </div>
        <div className="kanban-group-add-item"> <span>+</span> Add Item</div>
    </section>

}

const KanbanTaskPreview = ({ task, group, board }) => {

    const [modalName, setModalName] = useState(null)

    const makeClass = (status) => {
        if (!status) return 'card empty'
        let className = status.split(' ').join('')
        className += ' card'
        return className
    }

    const onModalOpen = (str) => {
        const name = `TASK_${str}_MENU`
        setTimeout(() => {
            setModalName(name)
        }, 100);
    }

    return <section className={`kanban-task-preview`}>
        {modalName && <PopUpModal modalName={modalName}
            setModalName={setModalName}
            task={task}
            group={group}
            board={board} />}
        <div className="kanban-task-item">
            <h6>{task.title}</h6>
            <Link to={`/workspace/board/${board._id}/kanban/details?groupId=${group.id}&taskId=${task.id}`} className="btn btn-svg btn-start-conversation">
                {!task.comments && <StartConversation className="svg svg-chat" />}
                {task.comments && <div className='with-comments-container'><StartConversationEmptySvg /><span>{task.comments.length}</span></div>}
            </Link>
        </div>
        <div className="kanban-task-item status"><span className="item-category"><MenuIcon className="svg svg-menu" />
            Status</span> <span onClick={() => onModalOpen('STATUS')} className={makeClass(task.status)}>{task.status}</span>
        </div>
        <div className="kanban-task-item priority"><span className="item-category"><MenuIcon className="svg svg-menu" />
            Priority</span> <span onClick={() => onModalOpen('PRIORITY')} className={makeClass(task.priority)}>{task.priority}</span>
        </div>
        <div className="kanban-task-item "><span className="item-category"><MenuIcon className="svg svg-menu" />
            Timeline</span> <span className="kanban-timeline task-preview-timeline"><TaskTimeline task={task} group={group} board={board} /></span>
        </div>

    </section>
}