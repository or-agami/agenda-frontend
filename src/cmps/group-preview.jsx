import { GroupHeader } from "./group-header"
import { GroupContent } from "./group-content"
import { useState } from "react"
import { useEffect } from "react"
import { Draggable } from 'react-beautiful-dnd'


export const GroupPreview = ({ group, board, isGroupDragging}) => {

    const [isHeaderOpen, setIsHeaderOpen] = useState(true)

    useEffect(() => {
        if (isGroupDragging) setIsHeaderOpen(false)

    }, [isGroupDragging])

    return <section className="group-preview">
        {!isHeaderOpen && <GroupHeader
            group={group}
            setIsHeaderOpen={setIsHeaderOpen}
            isHeaderOpen={isHeaderOpen}
            boardId={board._id}/>}

        {isHeaderOpen && <GroupContent
            group={group}
            setIsHeaderOpen={setIsHeaderOpen}
            isHeaderOpen={isHeaderOpen}
            board={board}/>}
    </section>
}