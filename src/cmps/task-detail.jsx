import { useParams, useSearchParams } from "react-router-dom"
import {GrClose} from 'react-icons/gr'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { loadTask } from "../store/board/board.action"

export const TaskDetail = () => {
    const dispatch = useDispatch()
    const task = useSelector(state=>state.boardModule.task)
    const params = useParams()
    const [searchParams] = useSearchParams()
    const groupId = searchParams.get('groupId')
    const taskId = searchParams.get('taskId')
    const boardId = params.boardId
    
    useEffect(()=> {
        dispatch(loadTask({taskId,groupId,boardId}))
    },[])

    if(!task) return
    return <section className='task-detail'>
        <button className="btn btn-svg btn-svg-x"><GrClose/></button>
        <div className='task-detail-header'>
            <div>
                <h3>{task.title}</h3>
            </div>
            
        </div>
    </section>
}