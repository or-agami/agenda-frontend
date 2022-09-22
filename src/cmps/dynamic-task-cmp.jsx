import moment from "moment/moment"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { openModal } from "../store/board/board.action"
import { TaskPersonMenu } from "./task-person-menu"
import { TaskPriorityMenu } from "./task-priority-menu"
import { TaskStatusMenu } from "./task-status-menu"
import { ReactComponent as NoPersonSvg } from '../assets/icons/no-person-icon.svg'
import { DatePicker } from "./date-picker"


export const DynamicTaskCmp = ({ board, task, category, group }) => {
    const dispatch = useDispatch()
    const { itemId, isTaskStatusMenuOpen, isTaskPriorityMenuOpen, isTaskPersonMenuOpen, isScreenOpen } = useSelector(state => state.boardModule.modals)
    const isCategoryInc = ['priority', 'status', 'lastUpdated', 'timeline', 'attachments'].includes(category)
    let className = `flex justify-center same-width task-preview-`
    let headerTxt, cmp
    let cb = () => { }

    const getFormattedDateTime = (date) => {
        if (!date) return
        moment.updateLocale('en', { relativeTime: { s: 'few seconds' } })
        return moment(date).fromNow()
    }

    const onSetTaskStatusMenuOpen = () => {
        dispatch(openModal('isTaskStatusMenuOpen', task.id))
    }

    const onSetTaskPriorityMenuOpen = () => {
        dispatch(openModal('isTaskPriorityMenuOpen', task.id))
    }

    const onSetTaskPersonMenuOpen = () => {
        dispatch(openModal('isTaskPersonMenuOpen', task.id))
    }

    const GetMemberImgFromId = (board, memberId) => {
        const imgUrl = (memberId !== 'Guest') ?
            board.members.find(member => member._id === memberId).imgUrl : 'profile-img-guest'
        return <img key={memberId} className='profile-img-icon' src={require(`../assets/img/${imgUrl}.png`)} alt="" />
    }

    const makeClass = (status) => {
        if (!status) return
        return status.split(' ').join('')
    }

    switch (category) {

        case 'member':
            className += `developer `
            break;

        case 'status':
            cmp = <span className='fold'></span>
            headerTxt = task[category]
            className += `status `
            cb = onSetTaskStatusMenuOpen

            break;
        case 'priority':
            cmp = <span className='fold'></span>
            headerTxt = task[category]
            className += `priority `
            if (task[category] === 'Critical') {
                headerTxt += " ⚠"
            }
            cb = onSetTaskPriorityMenuOpen

            break;
        case 'attachments':
            // cmp = <AddFile task={task} />
            // className += 'attachments'



            break;
        case 'timeline':
            cmp = <Timeline task={task} group={group} board={board} />
            className += 'timeline '
            // cmp = <RangePicker />


            break;
        case 'lastUpdated':
            className += `last-updated `
            headerTxt = getFormattedDateTime(task[category]?.date)


            break;

        default:
            break;
    }

    if (isCategoryInc && category !== 'lastUpdated' && category !== 'attachments' && category !== 'timeline') className += makeClass(task[category])

    return <>
        {(isTaskPersonMenuOpen && itemId === task.id && isScreenOpen) &&
            <TaskPersonMenu task={task} groupId={group.id} board={board} />
        }
        {(isTaskStatusMenuOpen && itemId === task.id && isScreenOpen) &&
            <TaskStatusMenu task={task} groupId={group.id} boardId={board._id} />
        }
        {(isTaskPriorityMenuOpen && itemId === task.id && isScreenOpen) &&
            <TaskPriorityMenu task={task} groupId={group.id} boardId={board._id} />
        }
        <li className={className} onClick={cb}>
            {category === 'member' &&
                <Fragment>
                    <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>+
                    </button>
                    <div className='developer-container'>
                        {task.memberIds ?
                            task.memberIds.map(memberId => GetMemberImgFromId(board, memberId))
                            :
                            <NoPersonSvg className="svg-no-person" />}
                    </div>
                </Fragment>}

            {category === 'lastUpdated' &&
                <div className='flex align-center last-updated'>
                    {task.lastUpdated && task.lastUpdated.byUserId &&
                        GetMemberImgFromId(board, task.lastUpdated.byUserId)}
                </div>}
            {isCategoryInc && <>
                <h4>{headerTxt}</h4>
                {cmp}
            </>}
        </li>
    </>
}

const Timeline = ({task,group,board}) => {

    const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
    const [taskTimeline, setTaskTimeline] = useState([
        {
            startDate: new Date(task.timeline?.startDate || Date.now()),
            endDate: new Date(task.timeline?.endDate || Date.now()),
            key: 'selection'
        }
    ])

    const getFormattedDateTime = (date) => {
        if (!date) return
        // moment.updateLocale('en', { relativeTime: { s: 'few seconds' } })
        return moment(date).format("MMM D")
    }


    const getTimeProgress = ({startDate, endDate}) => {
        if (!startDate || !endDate) return ''
        const timeRatio = (Date.now() - startDate) / (endDate - startDate)
        const timeProgress = (timeRatio * 100).toFixed()
        return (timeProgress < 0) ? 0 : (timeProgress < 100) ? timeProgress : 100
    }

    const handleDateChange = (dateRange) => {
        setTaskTimeline([dateRange])
        task.timeline = {startDate: Date.parse(dateRange.startDate), endDate: Date.parse(dateRange.endDate)}
    }

    return (
        <Fragment>
            {datePickerIsOpen && 
            <DatePicker 
            setDatePickerIsOpen={setDatePickerIsOpen} 
            taskTimeline={taskTimeline}
            handleDateChange={handleDateChange}
            task={task} group={group} boardId={board._id} 
            />
            }
            <div className="flex justify-center timeline-wrapper" onClick={() => setDatePickerIsOpen(!datePickerIsOpen)}>
                {task.timeline &&
                <Fragment>
                {task.timeline?.endDate && <div className="background-time-progress-bar"></div>}
                {task.timeline?.startDate && <>
                    <div className={"time-progress-bar " + group.style} style={{ width: `${getTimeProgress(task.timeline)}%` }}></div>
                    <span>{getFormattedDateTime(task.timeline.startDate)}</span>
                </>}
                {task.timeline?.startDate && task.timeline?.endDate &&
                    <span> - </span>}
                {task.timeline?.endDate &&
                    <span>{getFormattedDateTime(task.timeline.endDate)}</span>}
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}

// const AddFile = ({ task }) => {
    
//     const fileRef = useRef()

//     const [isFile , setIsFile] = useState(false)

//     const importImg = (ev, property) => {
//         const reader = new FileReader()
//         reader.readAsDataURL(ev.target.files[0])
//         setIsFile(true)
//         reader.addEventListener("load", () => {
//             console.log(reader.result);
//             console.log(fileRef);
//             fileRef.current.src = reader.result
//         })
//     }

//     return <div>
//         {isFile ? <img className='file-img' ref={fileRef} />
//             : <button className='btn add-file-btn'>
//                 <input className="import-img-input" type='file' onChange={(ev) => importImg(ev, 'img')} accept="image/*" />
//                 <BiImageAdd />
//             </button>}
//     </div>
// }