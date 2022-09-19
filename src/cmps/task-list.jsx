import { TaskAdd } from './task-add'
import { TaskPreview } from './task-preview'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/board/board.action'


export const TaskList = ({ group, board }) => {


    const dispatch = useDispatch()
    const [tasks, setTasks] = useState(group.tasks)

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = tasks[dragIndex]
            const hoverItem = tasks[hoverIndex]
            // Swap places of dragItem and hoverItem in the pets array
            setTasks(tasks => {
                const updatedTasks = [...tasks]
                updatedTasks[dragIndex] = hoverItem
                updatedTasks[hoverIndex] = dragItem
                return updatedTasks
            })
        },
        [tasks],
    )

    const debounceTimer = useRef()

    useEffect(() => {
        clearTimeout(debounceTimer.current)
        if (tasks !== group.tasks) {
            debounceTimer.current = setTimeout(() => {
                group.tasks = tasks 
                console.log("in timeout");
                dispatch(updateGroup({group, boardId: board._id}))
            }, 1000)
        }
    }, [tasks])

    return <section className="task-list">
        {tasks.map((task, idx) => (
            <div key={task.id} className='task-preview-container'>
                <TaskPreview task={task} groupId={group.id} board={board} idx={idx} moveListItem={moveListItem} />
            </div>
        ))}

        <TaskAdd
            groupId={group.id}
            boardId={board._id}
        />
    </section>
}