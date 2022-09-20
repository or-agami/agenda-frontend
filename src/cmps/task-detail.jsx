import { ReactComponent as X } from '../assets/icons/x-symbol.svg'
import { useParams, useSearchParams } from "react-router-dom"

export const TaskDetail = () => {
    const params = useParams()
    const [searchParams] = useSearchParams()
    const groupId = searchParams.get('groupId')
    const taskIdId = searchParams.get('taskId')
    const boardId = params.boardId
    
    return <section className='task-detail'>
        <button className="btn btn-svg btn-svg-x"><X /></button>
        <div className='task-detail-header'>
            <h2></h2>

        </div>
    </section>
}