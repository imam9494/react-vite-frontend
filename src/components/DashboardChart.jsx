import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function DashboardChart({
  adminCount,
  userCount,
  staffCount,
}) {
  const data = {
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
        borderRadius: 8,
      },
    ],
  };
const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">

      <div className="card-header bg-white border-0 py-3">
        <h5 className="fw-bold mb-0">
          📊 Statistik User
        </h5>
      </div>

      <div className="card-body">
        <div style={{ height: "300px" }}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </div>

    </div>
  );
}
   

  
