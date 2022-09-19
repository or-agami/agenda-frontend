import { TaskAdd } from './task-add'
import { TaskPreview } from './task-preview'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/board/board.action'

export const TaskList = ({ group, board,setIsScreenOpen,isScreenOpen}) => {
   

    return <section className="task-list">
        {group.tasks.map((task) => (
            <div key={task.id} className='task-preview-container'>
                <TaskPreview task={task} group={group} board={board} setIsScreenOpen={setIsScreenOpen} isScreenOpen={isScreenOpen}/>
            </div>
        ))}

        <TaskAdd
            group={group}
            boardId={board._id}
        />
    </section>
}