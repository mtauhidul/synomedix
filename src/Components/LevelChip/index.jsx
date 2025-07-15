import styles from "./LevelChip.module.scss";

const LevelChip = ({ risk, bgColor }) => {
  // Determine the risk level class for proper styling
  const getRiskClass = (riskLevel) => {
    const risk_lower = riskLevel?.toLowerCase();
    if (risk_lower?.includes("high") || risk_lower?.includes("critical"))
      return "high";
    if (risk_lower?.includes("medium") || risk_lower?.includes("moderate"))
      return "medium";
    if (risk_lower?.includes("low") || risk_lower?.includes("mild"))
      return "low";
    return "medium"; // default
  };

  const riskClass = getRiskClass(risk);

  return (
    <div
      className={`${styles.__risk_level} ${styles[riskClass]}`}
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <p>{risk} Risk</p>
    </div>
  );
};

export default LevelChip;
