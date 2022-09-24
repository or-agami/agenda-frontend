export const ColumnStats = ({ group, board }) => {
    return <ul className="column-stats">
        <li className="empty-start"></li>
        {board.cmpsOrder?.map(cmp => {
            return <li key={cmp} className={`${cmp}-stat`}>
                {<GetCmpsFromSwitch cmp={cmp} group={group}/>}
            </li>
        })}
        <li></li>
    </ul>
}
{/* <li className="empty-member-stat"></li>
<li className="status-stat">
    <StatusStat group={group}/>
</li>
<li className="priority-stat">
    <PriorityStat group={group}/>
</li>
<li className="timeline-stat"></li>
<li className="files-stat"></li>
<li className="empty-last-updated-stat"></li> */}
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
                <div key={forInCounter} className={`status-progress ${status==='undefined'? 'none':makeClass(status)}`}
                    style={{ width: `${counts / group.tasks.length * 100}%` }}
                    title={`${status==='undefined'? 'none':status}: ${(counts / group.tasks.length * 100).toFixed()}%`}>
                </div>
            )
        }
        return statusProgressBar
    }
    return <div className="status-progress-bar">{getStatusProgressBar()}</div>
}

const PriorityStat = ({ group }) => {
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
                <div key={forInCounter} className={`priority-progress ${priority==='undefined'? 'none':makeClass(priority)}`}
                    style={{ width: `${counts / group.tasks.length * 100}%` }}
                    title={`${priority==='undefined'? 'none': priority}: ${(counts / group.tasks.length * 100).toFixed()}%`}>

                </div>
            )
        }
        return priorityProgressBar
    }
    return <div className="priority-progress-bar">{getPriorityProgressBar()}</div>
}

const GetCmpsFromSwitch=({cmp,group})=>{
    switch (cmp) {
        case 'status':
            return <StatusStat group={group}/>
        case 'priority':
        return <PriorityStat group={group}/>
        default:
            break;
    }
}