import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import dismissIcon from "../../../assets/cancel.svg";
import patientIcon from "../../../assets/patient.png";
import testedIcon from "../../../assets/tested.png";
import { usePatientsData } from "../../../context/PatientsContext";
import LevelChip from "../../LevelChip";
import styles from "./InfoCard.module.scss";

const InfoCard = ({ flag, patientId }) => {
  const { completeTest, removeFlag } = usePatientsData();
  const [completedTest, setCompletedTest] = useState([]);
  const [inCompletedTest, setInCompletedTest] = useState([]);

  useEffect(() => {
    if (flag?.interventions) {
      setCompletedTest(
        flag.interventions.filter((i) => i.isCompleted)
      );
      setInCompletedTest(
        flag.interventions.filter((i) => !i.isCompleted)
      );
    }
  }, [flag?.interventions]);

  const levelColor = (risk) => {
    switch (risk?.toUpperCase()) {
      case "LOW":     return "var(--low-border-color)";
      case "MEDIUM":
      case "MODERATE": return "var(--medium-border-color)";
      case "HIGH":
      case "CRITICAL": return "var(--high-border-color)";
      default:        return "var(--low-border-color)";
    }
  };

  const handleClick = ({ id, complete }) => {
    completeTest({ id, complete, patientId });
  };

  const totalInterventions = (completedTest?.length || 0) + (inCompletedTest?.length || 0);
  const completedCount = completedTest?.length || 0;

  return (
    <div className={styles.__wrapper}>
      <div className={styles.__title}>
        <div className={styles.__flag}>
          <img src={patientIcon} alt="" />
          <p className={styles.type}>{flag.type}</p>
          <LevelChip risk={flag.risk} bgColor={levelColor(flag.risk)} />
        </div>

        <IconButton
          aria-label="dismiss flag"
          size="small"
          onClick={() => removeFlag(flag.id, patientId)}
          title="Dismiss flag"
        >
          <img src={dismissIcon} alt="dismiss" />
        </IconButton>
      </div>

      {/* Interventions section */}
      {totalInterventions > 0 && (
        <>
          <h2 className={styles.title}>
            Interventions — {completedCount}/{totalInterventions} complete
          </h2>

          {completedTest?.length > 0 && (
            <div className={styles.__completed_test}>
              {completedTest.map(({ id, name, isCompleted }, idx) => (
                <TestedChip
                  key={idx}
                  label={name}
                  completed={isCompleted}
                  handleCheck={handleClick}
                  id={id}
                />
              ))}
            </div>
          )}

          {inCompletedTest.length > 0 && (
            <div className={styles.__not_completed_test}>
              {inCompletedTest.map(({ id, name, isCompleted }, idx) => (
                <InCompletedTest
                  key={idx}
                  label={name}
                  id={id}
                  completed={isCompleted}
                  handleCheck={handleClick}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Risk factors */}
      {flag?.topRiskFactors?.length > 0 && (
        <>
          <h2 className={styles.title}>Top Risk Factors</h2>
          {flag.topRiskFactors.map((riskFactor, idx) => (
            <p key={idx} className={styles.riskFactor}>
              {riskFactor}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default InfoCard;

const TestedChip = ({ label, completed, id, handleCheck }) => (
  <div
    className={styles.level}
    onClick={() => handleCheck({ id, complete: !completed })}
  >
    <img src={testedIcon} className={styles.tick} alt="completed" />
    <label className={styles.label}>{label}</label>
  </div>
);

const InCompletedTest = ({ id, label, completed, handleCheck }) => (
  <div
    className={styles.level}
    onClick={() => handleCheck({ id, complete: !completed })}
  >
    <div className={styles.unchecked} />
    <label className={styles.label}>{label}</label>
  </div>
);
