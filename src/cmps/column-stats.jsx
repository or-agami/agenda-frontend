export const ColumnStats = ({ group, board }) => {
    return <ul className="column-stats">
        <li className="empty-start"></li>
        <li className="empty-member-stat"></li>
        <li className="status-stat">
            <StatusStat group={group} board={board} />
        </li>
        <li className="priority-stat"></li>
        <li className="timeline-stat"></li>
        <li className="files-stat"></li>
        <li className="empty-last-updated-stat"></li>
        <li></li>
    </ul>
}

const StatusStat = ({ group, board }) => {

    const makeClass = (status) => {
        if (!status) return
        return status.split(' ').join('')
    }

    
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