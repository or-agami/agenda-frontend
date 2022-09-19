import { TaskAdd } from './task-add'
import { TaskPreview } from './task-preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/board/board.action'


export const TaskList = ({ group, board }) => {

    const dispatch = useDispatch()
    const [tasks, setTasks] = useState(group.tasks)

    const handleOnDragEnd = (ev) => {
        console.log(ev);
        console.log(ev.destination);
        const updatedTasks = [...tasks]
        const [draggedItem] = updatedTasks.splice(ev.source.index, 1)
        updatedTasks.splice(ev.destination.index, 0, draggedItem)

        setTasks(updatedTasks)
    }

    useEffect(() => {
        if (tasks !== group.tasks) {
            group.tasks = tasks
            dispatch(updateGroup({group, boardId: board._id}))
        }
    }, [tasks])

    return <>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='tasks'>
                {(droppableProvided) => {
                    return <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="task-list">

                        {tasks.map((task, idx) => (
                            <Draggable key={task.id} draggableId={task.id} index={idx} >
                                {(provided) => {
                                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='task-preview-container'>
                                        <TaskPreview task={task} group={group} board={board} />
                                    </div>
                                }}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                        <TaskAdd group={group} boardId={board._id} />
                    </div>
                }}
            </Droppable>
        </DragDropContext>
    </>
}