import styles from "./LevelChip.module.scss";

const LevelChip = ({ risk, bgColor }) => {
  return (
    <div className={styles.__risk_level} style={{ backgroundColor: bgColor }}>
      <p>{risk} Risk</p>
    </div>
  );
};

export default LevelChip;
