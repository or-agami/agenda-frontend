import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { loadTask, openModal, updateTask } from "../store/board/board.action"
import { ReactComponent as Like } from '../assets/icons/like.svg'
import { ReactComponent as Reply } from '../assets/icons/reply.svg'
import { ReactComponent as Clock } from '../assets/icons/clock.svg'
import { ReactComponent as Menu } from '../assets/icons/board-menu.svg'
import { TaskDetailPersonMenu } from "./task-detail-person-menu"
import { GrClose } from 'react-icons/gr'
import moment from "moment"
import { utilService } from "../services/util.service"
import { useRef } from "react"
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";

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
        dispatch(loadTask(taskId))
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
                    {task.memberIds && task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))}
                </div>
            </div>
            <div className='task-detail-header-bottom'>
                <button onClick={() => setWhichRenders('isUpdates')}><span>Updates</span></button>
                <button onClick={() => setWhichRenders('isFiles')}><span>Files</span></button>
                <button onClick={() => setWhichRenders('isActivity')}><span>Activity Log</span></button>
            </div>
        </div>
        {(whichRenders === 'isUpdates' && task) && <TaskDetailUpdates task={task} groupId={groupId} board={board} />}
        {whichRenders === 'isFiles' && <TaskDetailFiles />}
        {whichRenders === 'isActivity' && <TaskDetailActivity task={task} />}
    </section>
}


const TaskDetailUpdates = ({ task, groupId, board }) => {
    const [isChatOpen, setIsChatOpen] = useState(false)
    return <section className='task-detail-updates'>
        {!isChatOpen && <button className='chat-box-closed' onClick={() => setIsChatOpen(true)}><span>Write an update...</span></button>}
        {isChatOpen && <ChatBox setIsChatOpen={setIsChatOpen} task={task} groupId={groupId} board={board} />}
        {task.comments && task.comments.map(comment =>
            <Post key={comment.id} board={board} task={task} groupId={groupId} byMember={comment.byMember} txt={comment.txt} createdAt={comment.createdAt} />
        )}
    </section>
}

const TaskDetailFiles = () => {
    return <section className='task-detail-files'>
    </section>
}

const TaskDetailActivity = ({ task }) => {
    return <section className='task-detail-activity'>
        <h1>Activity Log</h1>
        {console.log(task)}
        {task.activities?.map(activity => {
            return <div key={activity.id} className="activity-container">
                <span className="activity-type">{activity.type}</span>
                <span className="activity-by"><img className='profile-img-icon' src={require(`../assets/img/${activity.byMember.imgUrl}.png`)} />
                    {activity.byMember.fullname}</span>
                <span className="activity-time">{activity.createdAt}</span>

            </div>
        })}
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

const Post = ({ board, task, groupId, byMember, txt, createdAt }) => {
    const likeRef = useRef()
    const dispatch = useDispatch()
    const getFormattedDateTime = (date) => {
        if (!date) return
        moment.updateLocale('en', {
            relativeTime: {
                s: 'now',
                ss: '%ds',
                mm: "%dm",
                hh: "%dh",
                dd: "%dd",
                ww: "%dw",
                MM: "%dm",
                yy: "%dy"
            }
        });
        return moment(date).fromNow(true)
    }
    const animateLike = (ev) => {
        likeRef.current.classList.add('wobble-ver-left')
        confetti({
            particleCount: 150,
            spread: 60,
            origin: {
                x: ev.pageX / window.innerWidth,
                y: ev.pageY / window.innerHeight,
            }

        });
        setTimeout(() => {
            likeRef.current.classList.remove('wobble-ver-left')

        }, 1300)
        let like = { fullname: byMember.fullname, imgUrl: byMember.imgUrl }
        let updatedTask
        if (!task.likes) {
            updatedTask = { ...task, likes: [like] }
            task.likes = [like]
        }
        else {
            updatedTask = { ...task, likes: [like, ...task.likes] }
            task.likes.unshift(like)
        }
        dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id }))
        console.log('task:', task)
    }

    return <section className='post'>
        <div className="post-header">
            <div className='img-container'>
                <img className='profile-img-icon' src={require(`../assets/img/${byMember.imgUrl}.png`)} alt="" />
                <p className="fullname">{byMember.fullname}</p>
            </div>
            <div className="time-menu-container">
                <p><Clock />{getFormattedDateTime(createdAt)}</p>
                <button className="btn btn-svg btn-menu"><Menu /></button>
            </div>
        </div>
        <p className="comment-txt">{txt}</p>
        <div className="reply-like-container">
            <div className="like-container">
                <button onClick={(ev) => animateLike(ev)} className="btn-svg btn-like"><Like ref={likeRef} />Like</button>
            </div>
            <div className="reply-container">
                <button className="btn btn-svg btn-reply"><Reply />Reply</button>
            </div>
        </div>
    </section>
}
const GetMemberImgFromId = (board, memberId) => {
    const imgUrl = board.members.find(member => member._id === memberId).imgUrl
    return <img key={memberId} className='profile-img-icon' src={require(`../assets/img/${imgUrl}.png`)} alt="" />
}

const ChatBox = ({ setIsChatOpen, task, groupId, board }) => {

    const dispatch = useDispatch()
    const textAreaRef = useRef()
    const [newText, setNewText] = useState('')
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    const PostComment = () => {
        let updatedTask
        const comment = { id: utilService.makeId(), txt: newText, createdAt: Date.now(), byMember: { _id: loggedinUser._id, fullname: loggedinUser.fullname, imgUrl: loggedinUser.imgUrl } }
        if (!task.comments) {
            updatedTask = { ...task, comments: [comment] }
            task.comments = [comment]
        }
        else {
            updatedTask = { ...task, comments: [comment, ...task.comments] }
            task.comments.unshift(comment)
        }
        setIsChatOpen(false)
        textAreaRef.current.value = ''
        dispatch(updateTask({ task: updatedTask, groupId, boardId: board._id }))
        console.log('task:', task)
    }

    return <section className="chat-box-open">
        <textarea autoFocus className="chat-box" ref={textAreaRef} onBlur={(ev) => !ev.target.value ? setIsChatOpen(false) : ''} onChange={(ev) => setNewText(ev.target.value)}></textarea>
        <button className="update-comment-btn" onClick={() => PostComment()}>Update</button>
    </section>
}
