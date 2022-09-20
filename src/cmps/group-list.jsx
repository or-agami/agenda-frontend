import { GroupPreview } from "./group-preview"
import { ReactComponent as PlusIcon } from '../assets/icons/plus-icon.svg'
import { useDispatch } from "react-redux"
import { addGroup, updateBoard } from "../store/board/board.action"
import { ModalScreen } from "./modal-screen"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useRef } from "react"

export const GroupList = ({ board }) => {


  const dispatch = useDispatch()
  const [groups, setGroups] = useState(board.groups)
  const [isGroupDragging, setIsGroupDragging] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const containerRef = useRef()

  const onAddGroup = () => {
    dispatch(addGroup(board._id))
  }

  const handleOnDragEnd = (ev) => {
    const updatedGroups = [...groups]
    const [draggedItem] = updatedGroups.splice(ev.source.index, 1)
    updatedGroups.splice(ev.destination.index, 0, draggedItem)

    setGroups(updatedGroups)
    board.groups = updatedGroups
    dispatch(updateBoard(board))
    setIsGroupDragging(false)
  }

  useEffect(() => {
    if (groups !== board.groups) {
      board.groups = groups
      dispatch(updateBoard(board))
    }
  }, [groups])

  useEffect(() => {
    if (groups !== board.groups) {
      setGroups(board.groups)
    }
  }, [board.groups])

  return <div ref={containerRef}>
    <DragDropContext onDragEnd={handleOnDragEnd}>
       
      <Droppable droppableId='group'>
        {(droppableProvided) => {

          return <section ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="group-list">
            <ModalScreen />
            {groups.map((group, idx) =>
              <Draggable key={idx} draggableId={group.id + idx} index={idx} >
                {(provided) => {
                  return <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <GroupPreview
                      key={idx}
                      idx={idx}
                      group={group}
                      board={board}
                      isGroupDragging={isGroupDragging}
                    />
                  </div>
                }}
              </Draggable >
            )}
            {droppableProvided.placeholder}
            <button className="btn btn-svg add-group-btn" onClick={onAddGroup}><PlusIcon /> Add new group</button>
          </section >
        }
        }
      </Droppable >
    </DragDropContext >
  </div>
}