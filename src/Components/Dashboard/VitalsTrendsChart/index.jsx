import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./VitalsTrendsChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VitalsTrendsChart = ({ patients }) => {
  // Calculate average vitals by risk level
  const riskLevels = ["LOW", "MEDIUM", "HIGH"];

  const getAverageVitalsByRisk = () => {
    return riskLevels.map((risk) => {
      const patientsInRisk = patients?.filter((p) => p.risk === risk) || [];
      if (patientsInRisk.length === 0) return { temp: 0, pulse: 0, pox: 0 };

      const totals = patientsInRisk.reduce(
        (acc, p) => ({
          temp: acc.temp + (p.vitals?.t || 98.6),
          pulse: acc.pulse + (p.vitals?.p || 70),
          pox: acc.pox + (p.vitals?.pox || 98),
        }),
        { temp: 0, pulse: 0, pox: 0 }
      );

      return {
        temp: (totals.temp / patientsInRisk.length).toFixed(1),
        pulse: Math.round(totals.pulse / patientsInRisk.length),
        pox: Math.round(totals.pox / patientsInRisk.length),
      };
    });
  };

  const vitalsByRisk = getAverageVitalsByRisk();

  const data = {
    labels: riskLevels,
    datasets: [
      {
        label: "Temperature (°F)",
        data: vitalsByRisk.map((v) => v.temp),
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        tension: 0.1,
        yAxisID: "y",
      },
      {
        label: "Pulse (bpm)",
        data: vitalsByRisk.map((v) => v.pulse),
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        tension: 0.1,
        yAxisID: "y1",
      },
      {
        label: "O2 Saturation (%)",
        data: vitalsByRisk.map((v) => v.pox),
        borderColor: "#27ae60",
        backgroundColor: "rgba(39, 174, 96, 0.1)",
        tension: 0.1,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let suffix = "";
            if (context.datasetIndex === 0) suffix = "°F";
            else if (context.datasetIndex === 1) suffix = " bpm";
            else if (context.datasetIndex === 2) suffix = "%";
            return `${context.dataset.label}: ${context.parsed.y}${suffix}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Risk Level",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Temperature (°F)",
        },
        min: 96,
        max: 104,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Pulse (bpm)",
        },
        min: 50,
        max: 120,
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: false,
        min: 90,
        max: 100,
      },
    },
  };

  return (
    <div className={styles.__wrapper}>
      <div className={styles.__header}>
        <h3 className={styles.__title}>Vital Signs Analysis</h3>
        <p className={styles.__subtitle}>Average vital signs by risk level</p>
      </div>
      <div className={styles.__chartContainer}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default VitalsTrendsChart;
