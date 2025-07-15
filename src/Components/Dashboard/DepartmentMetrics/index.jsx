import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./DepartmentMetrics.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DepartmentMetrics = ({ patients }) => {
  // Extract department data
  const departmentCounts =
    patients?.reduce((acc, patient) => {
      const dept = patient.section || "General";
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {}) || {};

  const departments = Object.keys(departmentCounts);
  const counts = Object.values(departmentCounts);

  const data = {
    labels: departments,
    datasets: [
      {
        label: "Patient Count",
        data: counts,
        backgroundColor: [
          "#3498db",
          "#e74c3c",
          "#27ae60",
          "#f39c12",
          "#9b59b6",
          "#1abc9c",
        ],
        borderColor: [
          "#2980b9",
          "#c0392b",
          "#229954",
          "#e67e22",
          "#8e44ad",
          "#16a085",
        ],
        borderWidth: 1,
        borderRadius: 4,
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
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Patients: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className={styles.__wrapper}>
      <div className={styles.__header}>
        <h3 className={styles.__title}>Department Overview</h3>
        <p className={styles.__subtitle}>Patient distribution by unit</p>
      </div>
      <div className={styles.__chartContainer}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DepartmentMetrics;
