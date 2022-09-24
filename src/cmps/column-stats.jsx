export const ColumnStats = ({ group, board }) => {
    return <ul className="column-stats">
        <li className="empty-start"></li>
        <li className="empty-member-stat"></li>
        <li className="status-stat">
            <StatusStat group={group}/>
        </li>
        <li className="priority-stat">
            <PriorityStat group={group}/>
        </li>
        <li className="timeline-stat"></li>
        <li className="files-stat"></li>
        <li className="empty-last-updated-stat"></li>
        <li></li>
    </ul>
}

const makeClass = (status) => {
    if (!status) return
    return status.split(' ').join('')
}

const StatusStat = ({ group }) => {    
    const getStatusProgressBar = () => {
        const statusProgressBar = []
        let counter = {}
        group.tasks.forEach(({ status }) => {
            counter[status] = (counter[status] || 0) + 1

        })
        let forInCounter = 0
        for (const status in counter) {
            forInCounter++
            const counts = counter[status]
            statusProgressBar.push(
                <div key={forInCounter} className={`status-progress ${makeClass(status)}`}
                    style={{ width: `${counts / group.tasks.length * 100}%` }}
                    title={`${status}: ${(counts / group.tasks.length * 100).toFixed()}%`}>

                </div>
            )
        }
        return statusProgressBar
    }
return <div className="status-progress-bar">{getStatusProgressBar()}</div>
} 

const PriorityStat = ({group}) => {
    const getPriorityProgressBar = () => {
        const priorityProgressBar = []
        let counter = {}
        group.tasks.forEach(({ priority }) => {
            counter[priority] = (counter[priority] || 0) + 1

        })
        let forInCounter = 0
        for (const priority in counter) {
            forInCounter++
            const counts = counter[priority]
            priorityProgressBar.push(
                <div key={forInCounter} className={`priority-progress ${makeClass(priority)}`}
                    style={{ width: `${counts / group.tasks.length * 100}%` }}
                    title={`${priority}: ${(counts / group.tasks.length * 100).toFixed()}%`}>

                </div>
            )
        }
        return priorityProgressBar
    }
return <div className="priority-progress-bar">{getPriorityProgressBar()}</div>
}