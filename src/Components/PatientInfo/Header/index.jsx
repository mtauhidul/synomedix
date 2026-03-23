import Chip from "@mui/material/Chip";
import React from "react";
import { useUser } from "../../../context/UserContext";
import { calculateLOS } from "../../../utils/calculateLOS";
import { formatDate } from "../../../utils/formatDate";
import LevelChip from "../../LevelChip";
import Diagram from "./Diagram";
import styles from "./Header.module.scss";

const Header = ({
  admitted,
  age,
  bed,
  firstName,
  flags,
  id,
  lastName,
  risk,
  room,
  sex,
  vitals,
  CBC_fishbone,
  BMP_fishbone,
}) => {
  const { dismissedCards } = useUser().userState;

  const levelColor = (risk) => {
    switch (risk?.toUpperCase()) {
      case "LOW":
        return "var(--low-border-color)";
      case "MEDIUM":
      case "MODERATE":
        return "var(--medium-border-color)";
      case "HIGH":
      case "CRITICAL":
        return "var(--high-border-color)";
      default:
        return "var(--low-border-color)";
    }
  };

  const flagChipColor = (flagRisk) => {
    const r = flagRisk?.toUpperCase();
    if (r === "HIGH" || r === "CRITICAL") return { bg: "var(--critical-red-soft)", border: "var(--high-border-color)", color: "var(--critical-red)" };
    if (r === "MEDIUM" || r === "MODERATE") return { bg: "var(--warning-amber-soft)", border: "var(--warning-amber-border)", color: "var(--warning-amber)" };
    return { bg: "var(--success-green-soft)", border: "var(--low-border-color)", color: "var(--success-green)" };
  };

  return (
    <header className={styles.__wrapper}>
      <div className={styles.__patientInfo}>
        <div className={styles.__patient_identity}>
          <h1>
            {lastName}, {firstName}
          </h1>
          <div className={styles.dot} />
          <h1>
            {age} {sex}
          </h1>
        </div>

        <div className={styles.__patient_details}>
          <LevelChip risk={risk} bgColor={levelColor(risk)} />
          <p>{id.slice(0, 5).toUpperCase()}</p>
          <div className={styles.dot} />
          <p>
            Rm {room} · Bed {bed}
          </p>
        </div>

        <div className={styles.admission}>
          <p>LOS {calculateLOS(admitted)}</p>
          <div className={styles.dot} />
          <p>{formatDate(admitted)}</p>
        </div>

        {flags?.length > 0 && (
          <div className={styles.flags}>
            {flags.map(({ type, risk: flagRisk }, index) => {
              const colors = flagChipColor(flagRisk);
              return (
                <Chip
                  key={index}
                  label={`${type} (${flagRisk?.charAt(0)})`}
                  size="small"
                  sx={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    height: "22px",
                    backgroundColor: colors.bg,
                    color: colors.color,
                    border: `1px solid ${colors.border}`,
                    "& .MuiChip-label": { px: "8px" },
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.__diagram}>
        <Diagram
          vitals={vitals}
          CBC_fishbone={CBC_fishbone}
          BMP_fishbone={BMP_fishbone}
        />
      </div>
    </header>
  );
};

export default Header;
