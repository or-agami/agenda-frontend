import { TaskPreview } from "./task-preview"
import { ReactComponent as ArrowRightSvg } from '../assets/icons/agenda-arrow-icon-right.svg'
import { useState } from "react"

export const GroupPreview = ({ group }) => {
  const [isOpen, setIsOpen] = useState(true)

  const onOpen = ({ target }) => {
    target.classList.toggle('open')
    setIsOpen(prevState => prevState = !isOpen)
  }
  console.log('group:', group)
  const { title } = group
  return <ul className="group-preview">
    <li className="group-header-color">

    </li>
    <li className="group-header-name">
      <ArrowRightSvg/>
      <h4>{title}</h4>
    </li>
    <li className="group-header-task">
      
    </li>
    <li className="group-header-developer">

    </li>
    <li className="group-header-status">

    </li>
    <li className="group-header-date">

    </li>
  </ul>
    // <div className="group">
    //   <h1 className="title">{title}</h1>
    //   <ul className="task-list">
    //     <li className="clean-list cmps">
    //       <span className="task">Task</span>
    //     </li>
    //     <li className="column-header column-header-developer">
    //       <span className="developer">Developer</span>
    //     </li>
    //     <li className="column-header column-header-status">
    //       <span className="status">status</span>
    //     </li>
    //     <li className="column-header column-header-date">
    //       <span className="date">Date</span>
    //     </li>
    //   </ul>
    //   <div>
    //     {group.tasks.map((task) => (
    //       <TaskPreview key={task.id} task={task} />
    //     ))}
    //   </div>
    // </div>
  
}