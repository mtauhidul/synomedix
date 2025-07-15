import { usePatientsData } from "../../../context/PatientsContext";
import styles from "./QuickStats.module.scss";

const QuickStats = () => {
  const { patients } = usePatientsData();

  const totalFlags =
    patients?.reduce((total, patient) => {
      return total + (patient.flags?.length || 0);
    }, 0) || 0;

  const completedInterventions =
    patients?.reduce((total, patient) => {
      return (
        total +
        (patient.flags?.reduce((flagTotal, flag) => {
          return (
            flagTotal +
            (flag.interventions?.filter((i) => i.isCompleted).length || 0)
          );
        }, 0) || 0)
      );
    }, 0) || 0;

  const pendingInterventions =
    patients?.reduce((total, patient) => {
      return (
        total +
        (patient.flags?.reduce((flagTotal, flag) => {
          return (
            flagTotal +
            (flag.interventions?.filter((i) => !i.isCompleted).length || 0)
          );
        }, 0) || 0)
      );
    }, 0) || 0;

  const completionRate =
    totalFlags > 0
      ? Math.round(
          (completedInterventions /
            (completedInterventions + pendingInterventions)) *
            100
        )
      : 0;

  const stats = [
    {
      label: "Active Flags",
      value: totalFlags,
      color: "#e74c3c",
      icon: "🚩",
    },
    {
      label: "Completed",
      value: completedInterventions,
      color: "#27ae60",
      icon: "✅",
    },
    {
      label: "Pending",
      value: pendingInterventions,
      color: "#f39c12",
      icon: "⏳",
    },
    {
      label: "Success Rate",
      value: `${completionRate}%`,
      color: "#3498db",
      icon: "📈",
    },
  ];

  return (
    <div className={styles.__wrapper}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.__stat}>
          <div className={styles.__icon}>{stat.icon}</div>
          <div className={styles.__content}>
            <div className={styles.__value} style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className={styles.__label}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
