import { GroupPreview } from "./group-preview"

export const GroupList = ({ board }) => {

  return <section className="group-list">
    {board.groups.map((group, idx) =>
        <GroupPreview 
        key={idx} 
        group={group}
        boardId={board._id}
        />)} 
  </section>  
}