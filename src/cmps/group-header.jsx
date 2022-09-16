import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'

export const GroupHeader = ({group, setIsHeaderOpen,isHeaderOpen}) => {
    const {title} = group

    const onSetIsHeaderOpen = ({target}) => {
        target.classList.toggle('open')
        setIsHeaderOpen(prevState => prevState = !isHeaderOpen)
    }

    return <ul className="group-header">
    <li className="group-header-color">

    </li>
    <li className="group-header-name">
        <button className="btn btn-svg btn-arrow-down" onClick={(ev)=>{onSetIsHeaderOpen(ev)}}>
        <ArrowRightSvg/>
        </button>
        <h4>{title}</h4>
    </li>
    {/* <div className="wrapper"> */}
    <li className="group-header-developer">

    </li>
    <li className="group-header-status">
        <h4>Status</h4>
    </li>
    <li className="group-header-priority">
        <h4>Priority</h4>
    </li>
    <li className="group-header-last-updated">
        {/* <h4>Last updated</h4> */}
    </li>
    <li className="group-header-files">
        <h4>Files</h4>
    </li>
    <li className="group-header-timeline">
        <h4>TimeLine</h4>
    </li>
    {/* </div> */}
</ul>
}