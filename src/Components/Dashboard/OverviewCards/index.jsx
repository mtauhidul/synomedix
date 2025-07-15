import Box from "@mui/material/Box";
import styles from "./OverviewCards.module.scss";

const OverviewCards = ({ patients }) => {
  const totalPatients = patients?.length || 0;
  const highRiskCount = patients?.filter((p) => p.risk === "HIGH").length || 0;
  const mediumRiskCount =
    patients?.filter((p) => p.risk === "MEDIUM").length || 0;
  const lowRiskCount = patients?.filter((p) => p.risk === "LOW").length || 0;

  const averageAge = patients?.length
    ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)
    : 0;

  const cards = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: "👥",
      color: "#3498db",
      description: "Active patients in system",
    },
    {
      title: "High Risk",
      value: highRiskCount,
      icon: "🚨",
      color: "#e74c3c",
      description: "Requires immediate attention",
    },
    {
      title: "Medium Risk",
      value: mediumRiskCount,
      icon: "⚠️",
      color: "#f39c12",
      description: "Monitor closely",
    },
    {
      title: "Low Risk",
      value: lowRiskCount,
      icon: "✅",
      color: "#27ae60",
      description: "Stable condition",
    },
    {
      title: "Average Age",
      value: `${averageAge} yrs`,
      icon: "📊",
      color: "#9b59b6",
      description: "Patient demographic",
    },
  ];

  return (
    <div className={styles.__wrapper}>
      {cards.map((card, index) => (
        <Box key={index} className={styles.__card}>
          <div className={styles.__cardHeader}>
            <div className={styles.__icon}>{card.icon}</div>
            <div className={styles.__cardInfo}>
              <h3 className={styles.__title}>{card.title}</h3>
              <p className={styles.__description}>{card.description}</p>
            </div>
          </div>
          <div className={styles.__value} style={{ color: card.color }}>
            {card.value}
          </div>
        </Box>
      ))}
    </div>
  );
};

export default OverviewCards;
