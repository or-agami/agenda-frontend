import { GroupHeader } from "./group-header"
import { GroupContent } from "./group-content"
import { useState } from "react"
import { useEffect } from "react"
import { Draggable } from 'react-beautiful-dnd'


export const GroupPreview = ({ group, board, idx }) => {

    const [isHeaderOpen, setIsHeaderOpen] = useState(true)

    return <section className="group-preview">
        {!isHeaderOpen && <Draggable key={idx} draggableId={group.id + idx} index={idx}>
            {(provided) => {
                return <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <GroupHeader group={group}
                        setIsHeaderOpen={setIsHeaderOpen}
                        isHeaderOpen={isHeaderOpen}
                        boardId={board._id} />
                </div>
            }}
        </Draggable>
        }

        {isHeaderOpen && <GroupContent
            group={group}
            setIsHeaderOpen={setIsHeaderOpen}
            isHeaderOpen={isHeaderOpen}
            board={board}
            idx={idx} />}
    </section>
}