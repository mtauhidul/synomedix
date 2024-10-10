import { Divider } from "@mui/material";
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

  const levelCOlor = (risk) => {
    switch (risk) {
      case "LOW":
        return "var(--low-border-color)";
      case "MEDIUM":
        return "var(--medium-border-color)";
      case "MODERATE":
        return "var(--medium-border-color)";
      case "HIGH":
        return "var(--high-border-color)";
      default:
        return "var(--low-border-color)";
    }
  };

  return (
    <>
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
            <LevelChip risk={risk} bgColor={levelCOlor(risk)} />
            <p>{id.slice(0, 5).toUpperCase()}</p>
            <div className={styles.dot} />
            <p>
              RM{room} Bed {bed}
            </p>
          </div>
          <div className={styles.admission}>
            <p>LOS {calculateLOS(admitted)}</p>
            <div className={styles.dot} />
            <p>{formatDate(admitted)}</p>
          </div>

          <div className={styles.flags}>
            {flags?.map(({ type, risk }, index) => (
              <Chip
                key={index}
                label={`${type} (${risk.at(0)})`}
                // variant="outlined"
                color="primary"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "13.1864px",
                  lineHeight: "17px",
                  border: "1px solid var(--low-border-color)",
                  fontWeight: "500",
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.__diagram}>
          <Diagram
            vitals={vitals}
            CBC_fishbone={CBC_fishbone}
            BMP_fishbone={BMP_fishbone}
          />
        </div>
      </header>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#DAE5FF",
          marginBottom: "10px",
        }}
      />
    </>
  );
};

export default Header;
