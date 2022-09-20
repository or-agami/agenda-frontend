import { GroupPreview } from "./group-preview"
import { ReactComponent as PlusIcon } from '../assets/icons/plus-icon.svg'
import { useDispatch } from "react-redux"
import { addGroup, updateBoard } from "../store/board/board.action"
import { ModalScreen } from "./modal-screen"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const GroupList = ({ board }) => {

  const dispatch = useDispatch()
  const [groups, setGroups] = useState(board.groups)
  const [isGroupDragging, setIsGroupDragging] = useState(false)

  const onAddGroup = () => {
    dispatch(addGroup(board._id))
  }

  const handleOnDragEnd = (ev) => {
    const updatedGroups = [...groups]
    const [draggedItem] = updatedGroups.splice(ev.source.index, 1)
    updatedGroups.splice(ev.destination.index, 0, draggedItem)

    setGroups(updatedGroups)
    console.log(updatedGroups);
    board.groups = updatedGroups
    dispatch(updateBoard(board))
    setIsGroupDragging(false)
  }

  const onDragStart = () => {
    setIsGroupDragging(true)
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

  return <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={onDragStart}>
    <Droppable droppableId='group'>
      {(droppableProvided) => {

        return <section ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="group-list">
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
          <div style={{background:"green", maxHeight:'100px',}}>{droppableProvided.placeholder}</div>
          <button className="btn btn-svg add-group-btn" onClick={onAddGroup}><PlusIcon /> Add new group</button>
        </section >
      }
      }
    </Droppable >
  </DragDropContext >
}