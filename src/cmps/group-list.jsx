import { GroupPreview } from "./group-preview"

export const GroupList = ({ board }) => {
  // const [isOpen, setIsOpen] = useState(true)

  // const onOpen = ({ target }) => {
  //   target.classList.toggle('open')
  //   setIsOpen(prevState => prevState = !isOpen)
  // }

  return <section className="group-list">
    {board.groups.map((group, idx) =>
        <GroupPreview 
        key={idx} 
        group={group}
        />)} 
  </section>
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