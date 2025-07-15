import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./RiskDistributionChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const RiskDistributionChart = ({ patients }) => {
  const highRiskCount = patients?.filter((p) => p.risk === "HIGH").length || 0;
  const mediumRiskCount =
    patients?.filter((p) => p.risk === "MEDIUM").length || 0;
  const lowRiskCount = patients?.filter((p) => p.risk === "LOW").length || 0;

  const data = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [highRiskCount, mediumRiskCount, lowRiskCount],
        backgroundColor: ["#e74c3c", "#f39c12", "#27ae60"],
        borderColor: ["#c0392b", "#e67e22", "#229954"],
        borderWidth: 2,
        hoverBackgroundColor: ["#ec7063", "#f8c471", "#58d68d"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={styles.__wrapper}>
      <div className={styles.__header}>
        <h3 className={styles.__title}>Risk Level Distribution</h3>
        <p className={styles.__subtitle}>Patient risk categorization</p>
      </div>
      <div className={styles.__chartContainer}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default RiskDistributionChart;
