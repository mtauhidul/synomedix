import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomSnackbar from "../../../Components/CustomSnackbar/CustomSnackbar";
import { usePatientsData } from "../../../context/PatientsContext";
import { useSidebar } from "../../../context/SidebarContext";
import { updatePatient } from "../../../services";
import { handlePatientDataUpdate } from "../../../services/openai";
import { calculateLOS } from "../../../utils/calculateLOS";
import styles from "./ShortInfoCard.module.scss";

const ShortInfoCard = ({
  admitted,
  age,
  bed,
  firstName,
  flags,
  id,
  lastName,
  risk,
  room,
  section,
  sex,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (msg) => {
    setMessage(msg);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };
  const location = useLocation().pathname?.split("/")[1];
  const { toggleDrawer } = useSidebar();
  const { patients, updatePatientsData } = usePatientsData();
  const [loading, setLoading] = React.useState(false);

  const actualFLagLength = flags?.length;
  const restRenderFlags = flags?.slice(3, actualFLagLength);

  const diagnose = async (id) => {
    setLoading(true);
    const patientData = patients.find((patient) => patient.id === id);

    try {
      const response = await handlePatientDataUpdate(patientData);
      if (response) {
        const updatedPatient = await updatePatient(id, response);

        if (updatedPatient) {
          showSnackbar("Patient diagnosed successfully");
          updatePatientsData(updatedPatient);
          // console.log("Patient updated successfully");
        }
      }

      setTimeout(() => {
        hideSnackbar();
      }, 3000);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      showSnackbar("Error diagnosing patient");
      console.error("Error updating patient:", error);

      setTimeout(() => {
        hideSnackbar();
      }, 3000);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getRiskClass = (riskLevel) => {
    const risk_lower = riskLevel?.toLowerCase();
    if (risk_lower === "high" || risk_lower === "critical") return "high";
    if (risk_lower === "medium" || risk_lower === "moderate") return "medium";
    if (risk_lower === "low" || risk_lower === "mild") return "low";
    return "medium";
  };

  const getBorderColor = (riskLevel) => {
    const risk_lower = riskLevel?.toLowerCase();
    if (risk_lower === "high" || risk_lower === "critical")
      return "var(--critical-red)";
    if (risk_lower === "medium" || risk_lower === "moderate")
      return "var(--warning-amber)";
    if (risk_lower === "low" || risk_lower === "mild")
      return "var(--success-green)";
    return "var(--warning-amber)";
  };

  const getRiskText = (riskLevel) => {
    const risk_lower = riskLevel?.toLowerCase();
    if (risk_lower === "high" || risk_lower === "critical") return "HIGH";
    if (risk_lower === "medium" || risk_lower === "moderate") return "MED";
    if (risk_lower === "low" || risk_lower === "mild") return "LOW";
    return "MED";
  };

  return (
    <>
      <Link
        onClick={toggleDrawer("left", false)}
        onKeyDown={toggleDrawer("left", false)}
        to={`/${id}`}
        className={`${styles.__wrapper} ${getRiskClass(risk)} ${
          location === id ? styles.active : ""
        }`}
      >
        <div className={styles.__condition}>
          <h2 style={{ borderColor: getBorderColor(risk) }}>
            {getRiskText(risk)}
          </h2>
        </div>

        <div className={styles.__info}>
          <div className={styles.patient__details}>
            <h2 className={styles.__patient_id}>
              {id.slice(0, 5).toUpperCase()}
            </h2>
            <div className={styles.dot} />
            <h2 className={styles.__patient_name}>
              {lastName}, {firstName?.at(0)}
            </h2>
            <div className={styles.dot} />
            <h2 className={styles.__patient_range}>
              {age} {sex}
            </h2>
            <div className={styles.dot} />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                diagnose(id);
              }}
              className={styles.diagnose__btn}
              disabled={flags[0]?.topRiskFactors[0] !== "Test One" || loading}
            >
              {loading ? (
                <div className={styles.loading__spinner}></div>
              ) : (
                "Diagnose"
              )}
            </button>
          </div>

          <div className={styles.__patient_info}>
            <h2 className={styles.__patient_room}>
              RM{room} Bed {bed}
            </h2>
            <div className={styles.dot} />
            <h2 className={styles.__patient_condition}>{section}</h2>
            <div className={styles.dot} />
            <h2 className={styles.__patient_admitted}>
              LOS {calculateLOS(admitted)}
            </h2>
          </div>

          <div className={styles.flags__container}>
            {flags?.slice(0, 3)?.map(({ type, risk: flagRisk }, index) => (
              <span key={index} className={styles.flag__chip}>
                {type} ({flagRisk?.charAt(0)})
              </span>
            ))}
            {restRenderFlags?.length > 0 && (
              <span className={styles.more__flags}>
                +{restRenderFlags?.length} FLAGS
              </span>
            )}
          </div>
        </div>
      </Link>

      <CustomSnackbar
        message={message}
        open={snackbarOpen}
        handleClose={hideSnackbar}
      />
    </>
  );
};

export default ShortInfoCard;
