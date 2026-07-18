import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardChart({
  adminCount,
  userCount,
  staffCount,
}) {
  const pieData = {
    labels: ["Admin", "User", "Staff"],
    datasets: [
      {
        data: [adminCount, userCount, staffCount],
        backgroundColor: [
          "#dc3545",
          "#198754",
          "#ffc107",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Admin", "User", "Staff"],
    datasets: [
      {
        label: "Jumlah User",
        data: [adminCount, userCount, staffCount],
        backgroundColor: [
          "#dc3545",
          "#198754",
          "#ffc107",
        ],
      },
    ],
  };

  return (
    <div className="row mb-4">

      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header fw-bold">
            User Distribution
          </div>

          <div className="card-body">
            <Pie data={pieData} />
          </div>

        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header fw-bold">
            User Statistics
          </div>

          <div className="card-body">
            <Bar data={barData} />
          </div>

        </div>
      </div>

    </div>
  );
}