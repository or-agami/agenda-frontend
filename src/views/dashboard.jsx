import { useSelector } from "react-redux"
import { BoardHeader } from "../cmps/board-header"
import { Loader } from "../cmps/loader"
import { Doughnut, Bar } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from "chart.js"
import { useEffect } from "react"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title,)

export const Dashboard = () => {

    const board = useSelector(state => state.boardModule.board)

    const statusOpts = ['done', 'working on it', 'stuck', 'need help', 'waiting for qa', 'pending', 'no status']
    const barStatusData = []

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

    useEffect(() => {
        getTaskStatusCount()
    }, [])

    const getTaskStatusCount = (status) => {
        const data = statusOpts.map(status => board?.groups.map(group => group.tasks.map(task => {
            if (task.status === status)
            return task.status})))
        console.log(data);
    }

    const barData = {
        labels: statusOpts,
        datasets: [
            {
                data: [5, 8, 7, 3, 5, 10, 1],
                backgroundColor: [
                    "#0dd4ff",
                    "#b3d4ff",
                    "#e60049",
                    "#9b19f5",
                    "#dc0ab4",
                    "#ffa300",
                    "#e6d800",
                    "#00bfa0",
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


    if (!board) return <Loader />
    return <section className="dashboard">
        <BoardHeader board={board} />

        <div className="dashboard-main-container">
            <div className="doughnut-chart">
                <h3 className="chart-title">Task Per Group</h3>
                <Doughnut className="chart" data={doungnutData} />
            </div>

            <div className="bar-chart">
                <h3 className="chart-title">Tasks Status</h3>
                <Bar className="chart" data={barData} />
            </div>
        </div>

    </section>
}