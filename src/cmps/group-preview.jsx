import { GroupHeader } from "./group-header"
import { GroupContent } from "./group-content"
import { useState } from "react"

export const GroupPreview = ({ group, board }) => {
    const [isHeaderOpen, setIsHeaderOpen] = useState(true)

    return <section className="group-preview">
        {isHeaderOpen && <GroupHeader
            group={group}
            setIsHeaderOpen={setIsHeaderOpen}
            isHeaderOpen={isHeaderOpen}
            boardId={board._id}
        />}
        {!isHeaderOpen && <GroupContent
            group={group}
            setIsHeaderOpen={setIsHeaderOpen}
            isHeaderOpen={isHeaderOpen}
            board={board}
        />}
    </section>
}