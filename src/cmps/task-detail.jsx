import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { loadTask, openModal } from "../store/board/board.action"
import { ReactComponent as Like } from '../assets/icons/like.svg'
import { ReactComponent as Reply } from '../assets/icons/reply.svg'
import { TaskDetailPersonMenu } from "./task-detail-person-menu"
import { GrClose } from 'react-icons/gr'
import moment from "moment"

export const TaskDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const task = useSelector(state => state.boardModule.task)
    const board = useSelector(state => state.boardModule.board)
    const itemId = useSelector(state => state.boardModule.modals.itemId)
    const isTaskDetailPersonMenuOpen = useSelector(state => state.boardModule.modals.isTaskDetailPersonMenuOpen)
    const [whichRenders, setWhichRenders] = useState('isUpdates')
    const params = useParams()
    const [searchParams] = useSearchParams()
    const groupId = searchParams.get('groupId')
    const taskId = searchParams.get('taskId')
    const boardId = params.boardId

    useEffect(() => {
        dispatch(loadTask({ taskId, groupId, boardId }))
    }, [])

    const closeTaskDetail = () => {
        navigate(`/workspace/board/${boardId}`)
    }


    const onSetTaskPersonMenuOpen = () => {
        dispatch(openModal('isTaskDetailPersonMenuOpen', taskId))
    }

    if (!task) return
    return <section className='task-detail'>
        <button className="btn btn-svg btn-svg-x" onClick={() => closeTaskDetail()}><GrClose /></button>
        <div className='task-detail-header'>
            <div className='task-detail-header-top'>
                <h3>{task.title}</h3>
                <div className='task-detail-member-container'>
                    <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>+</button>
                    {task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))}
                </div>
            </div>
            <div className='task-detail-header-bottom'>
                <button onClick={() => setWhichRenders('isUpdates')}>Updates</button>
                <button onClick={() => setWhichRenders('isFiles')}>Files</button>
                <button onClick={() => setWhichRenders('isActivity')}>Activity Log</button>
            </div>
            {(whichRenders === 'isUpdates' && task) && <TaskDetailUpdates task={task} board={board}/>}
            {whichRenders === 'isFiles' && <TaskDetailFiles />}
            {whichRenders === 'isActivity' && <TaskDetailActivity />}
        </div>

    </section>
}


const TaskDetailUpdates = ({task,board}) => {
    if(!task.comments) return
    return <section className='task-detail-updates'>
        {task.comments.map(comment=>
        <Post key={comment.id} board={board} byMember={comment.byMember} txt={comment.txt} createdAt={comment.createdAt}/>
        )}
    </section>
}

const TaskDetailFiles = () => {
    return <section className='task-detail-files'>

    </section>
}

const TaskDetailActivity = () => {
    return <section className='task-detail-activity'>

    </section>
}

// {
//     "id": "c104",
//     "title": "Help me",
//     "status": "in-progress",
//     "priority": "low",
//     "description": "description",
//     "comments": [
//       {
//         "id": "ZdPnm",
//         "txt": "also @yaronb please CR this",
//         "createdAt": 1590999817436,
//         "byMember": {
//           "_id": "u101",
//           "fullname": "Tal Tarablus",
//           "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//         }

const Post = ({ board, byMember, txt, createdAt }) => {
    const getFormattedDateTime = (date) => {
        if (!date) return
        return moment(date).fromNow()
    }
    return <section className='post'>
        <div>
            <div className='img-container'>
                {GetMemberImgFromId(board, byMember._id)}
            </div>
            <p>{getFormattedDateTime(createdAt)}</p>
        </div>
        <p>{txt}</p>
        <button><Like/>Like</button>
        <button><Reply/>Reply</button>
    </section>
}
const GetMemberImgFromId = (board, memberId) => {
    const imgUrl = board.members.find(member => member._id === memberId).imgUrl
    return <img key={memberId} className='profile-img-icon' src={require(`../assets/img/${imgUrl}.png`)} alt="" />
}

