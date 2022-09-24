import { useSelector } from "react-redux"
import { BoardHeader } from "../cmps/board-header"
import { Loader } from "../cmps/loader"
import { Doughnut, Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, LineElement, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement } from "chart.js"
import { useEffect, useState } from "react"
import { httpService } from "../services/http.service"
import { taskService } from "../services/task.service"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LineElement, LinearScale, BarElement, Title, PointElement)

export const Dashboard = () => {

    const board = useSelector(state => state.boardModule.board)
    const priorityOpts = ['critical', 'low', 'medium', 'high', '']
    const statusOpts = ['done', 'working on it', 'stuck', 'need help', 'waiting for qa', 'pending', '']
    const [statusCounter, setStatusCounter] = useState()
    const [priorityCounter, setPriorityCounter] = useState()

    useEffect(() => {
        getTablesData()
    }, [board])

    const getTablesData = async () => {
        if (!board) return
        let priorityCounts = []
        let statusCounts = []
        const newTasks = await taskService.query({ boardId: board._id })
        statusOpts.forEach((status, idx) => {
            statusCounts[idx] = 0
            newTasks.forEach(task => {
                if (task.status) {
                    if (task.status.toLowerCase() === status) statusCounts[idx] += 1
                } else if (!task.status) {
                    statusCounts[statusOpts.length - 1] += 1
                }
            })
        })
       
        setStatusCounter(statusCounts)

        priorityOpts.forEach((priority, idx) => {
            priorityCounts[idx] = 0
            newTasks.forEach(task => {
                if (task.priority) {
                    if (task.priority.toLowerCase() === priority) priorityCounts[idx] += 1
                } else if (!task.priority) {
                    priorityCounts[priorityOpts.length - 1] += 1
                }
            })
        })
       
        setPriorityCounter(priorityCounts)
    }

    
    const doungnutData = {
        labels: board?.groups.map(group => group.title),
        datasets: [
            {
                label: '# of Votes',
                data: board?.groups.map(group => group.tasks.length),
                backgroundColor: [
                    "#00bfa0",
                    "#b3d4ff",
                    "#dc0ab4",
                    "#ffa300",
                    "#9b19f5",
                    "#e6d800",
                    "#0dd4ff",
                    "#e60049"
                ],
                borderColor: [
                    "#00bfa0",
                    "#b3d4ff",
                    "#dc0ab4",
                    "#ffa300",
                    "#9b19f5",
                    "#e6d800",
                    "#0dd4ff",
                    "#e60049"
                ],
                borderWidth: 1,
            },
        ],
    }

    const statusLabels = () => {
        const statuses = [...statusOpts]
        statuses.splice(statuses.length - 1, 1, 'no status')
        return statuses
    }

    const priorityLabels = () => {
        const priorities = [...priorityOpts]
        priorities.splice(priorities.length - 1, 1, 'no priority')
        return priorities
    }
  
    const statusData = {
        labels: statusLabels(),
        datasets: [
            {
                label: 'Status Count',
                data: statusCounter,
                backgroundColor: [
                    "#00c875",
                    "#fdab3d",
                    "#e2445c",
                    "#ffcb00",
                    "#784bd1",
                    "#ad967a",
                    "#c4c4c4",
                ],
                borderWidth: 1,
            },

        ],
    }

    const priorityData = {
        labels: priorityLabels(),
        datasets: [
            {
                label: 'Priority Count',
                data: priorityCounter,
                backgroundColor: [
                    "#333333",
                    "#579bfc",
                    "#5559df",
                    "#401694",
                    "#c4c4c4",
                ],
                borderWidth: 1,
            },

        ],
    }

    if (!board) return <Loader />
    return <section className="dashboard">
        <BoardHeader board={board} />

        <div className="dashboard-main-container">
            <div className="table-chart">
                <h3 className="chart-title">Task Per Group</h3>
                <Doughnut className="chart" data={doungnutData} />
            </div>

            <div className="table-chart">
                <h3 className="chart-title">Tasks Status</h3>
                <Bar className="chart" data={statusData} />
            </div>

            <div className="table-chart">
                <h3 className="chart-title">Tasks Priority</h3>
                <Line className="chart" data={priorityData} />
            </div>
        </div>



    </section>
}