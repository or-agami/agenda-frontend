import { useSelector } from "react-redux"
import { BoardHeader } from "../cmps/board-header"
import { Loader } from "../cmps/loader"
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {

    const board = useSelector(state => state.boardModule.board)

    const data = {
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


    if (!board) return <Loader />
    return <section className="dashboard">
        <BoardHeader board={board} />

        <div className="dashboard-main-container">
            <div className="doughnut-chart">
                <h3 className="chart-title">Task Per Group</h3>
                <Doughnut className="chart" data={data} />
                </div>
        </div>

    </section>
}