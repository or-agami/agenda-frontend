import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'
import { TaskList } from './task-list'

export const GroupContent = ({ group, setIsHeaderOpen, isHeaderOpen }) => {
    const { title } = group

    const onSetIsHeaderOpen = ({ target }) => {
        target.classList.toggle('open')
        setIsHeaderOpen(prevState => prevState = !isHeaderOpen)
    }



    return <section className="group-content">
        <div className='group-content-title'>
            <button className="btn btn-svg  btn-arrow-down" onClick={(ev) => { onSetIsHeaderOpen(ev) }}>
                <ArrowRightSvg />
            </button>
            <h4>{title}</h4>
        </div>
        <ul className="group-content-header">
            <li className="group-content-header-color">
            </li>
            <li className='group-content-header-checkbox'>
                <input type="checkbox" />
            </li>
            <li className="group-content-header-item">
                <h4>Item</h4>
            </li>
            <li className="group-content-header-developer">
                <h4>Person</h4>
            </li>
            <li className="group-content-header-status">
                <h4>Status</h4>
            </li>
            <li className="group-content-header-priority">
                <h4>Priority</h4>
            </li>
            <li className="group-content-header-last-updated">
                <h4>Last updated</h4>
            </li>
            <li className="group-content-header-files">
                <h4>Files</h4>
            </li>
            <li className="group-content-header-timeline">
                <h4>TimeLine</h4>
            </li>
        </ul>
        <div className='group-content-tasks'>
            <TaskList group={group} />
        </div>
    </section>
}