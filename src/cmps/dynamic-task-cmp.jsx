import moment from "moment/moment"
import { Fragment, useState } from "react"
import { ReactComponent as NoPersonSvg } from '../assets/icons/no-person-icon.svg'
import { FaPlusCircle } from "react-icons/fa"
import { PopUpModal } from "./pop-up-modal"
import { TaskTimeline } from "./task-timeline"
import fi from "date-fns/esm/locale/fi/index.js"


export const DynamicTaskCmp = ({ board, task, category, group }) => {
    const [modalName,setModalName] = useState(null)
    const isCategoryInc = ['priority', 'status', 'lastUpdated', 'attachments'].includes(category)
    let className = `flex justify-center task-preview-`
    let headerTxt, cmp
    let cb = () => { }

    const getFormattedDateTime = (date) => {
        if (!date) return
        moment.updateLocale('en', {
            relativeTime : {
                s  : 'just now',
                ss : '%d seconds ago',
                m:  'a minute ago',
                mm: '%d minutes ago',
                h:  'an hour ago',
                hh: '%d hours ago',
                d:  'a day ago',
                dd: '%d days ago',
                w:  'a week ago',
                ww: '%d weeks ago',
                M:  'a month ago',
                MM: '%d months ago',
                y:  'a year ago',
                yy: '%d years ago'
            }
        })
        return moment(date).fromNow(true)
    }

    const onSetTaskStatusMenuOpen = () => {
        setTimeout(() => {
            setModalName('TASK_STATUS_MENU')
        }, 100);
    }

    const onSetTaskPriorityMenuOpen = () => {
        setTimeout(() => {
            setModalName('TASK_PRIORITY_MENU')
        }, 100);
    }

    const onSetTaskPersonMenuOpen = () => {
        setTimeout(() => {
            setModalName('TASK_PERSON_MENU')
        }, 100);
    }

    const GetMemberImgFromId = (board, memberId) => {
        const imgUrl = (memberId !== 'Guest') ?
            board.members.find(member => member._id === memberId).imgUrl : 'profile-img-guest'
        return <img key={memberId} className='profile-img-icon' src={require(`../assets/img/${imgUrl}.png`)} alt="" />
    }

    const makeClass = (status) => {
        if (!status) return 
        // if(status === 'undefined') return ''
        return status.split(' ').join('')
    }

    switch (category) {

        case 'member':
            className += `developer same-width `
            break;

        case 'status':
            cmp = <span className='fold'></span>
            headerTxt = (task[category] === undefined)? '' : task[category]
            className += `status same-width `
            cb = onSetTaskStatusMenuOpen

            break;
        case 'priority':
            cmp = <span className='fold'></span>
            headerTxt = (task[category] === undefined)? '' : task[category]
            className += `priority same-width `
            if (task[category] === 'Critical') {
                headerTxt += " ⚠"
            }
            cb = onSetTaskPriorityMenuOpen

            break;
        case 'attachments':
            // cmp = <AddFile task={task} />
            className += 'attachments same-width '



            break;
        case 'timeline':
            className += 'timeline '


            break;
        case 'lastUpdated':
            className += `last-updated same-width `
            headerTxt = getFormattedDateTime(task[category]?.date)


            break;

        default:
            break;
    }

    if (isCategoryInc && category !== 'lastUpdated' && category !== 'attachments') className += makeClass(task[category])
    return <>
        {modalName &&
            <PopUpModal setModalName={setModalName} modalName={modalName} task={task} group={group} board={board} />
        }
        <li className={className} onClick={cb}>
            {category === 'member' &&
                <Fragment>
                    <button className="btn btn-add-developer" onClick={() => onSetTaskPersonMenuOpen()}>
                        <FaPlusCircle/>
                    </button>
                    <div className='developer-container'>
                        {(task.memberIds && task.memberIds.length > 0) ?
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
            {category === 'timeline' &&
                    <TaskTimeline task={task} group={group} board={board} />}
            {isCategoryInc && <>
                <h4>{headerTxt}</h4>
                {cmp}
            </>}
        </li>
    </>
}