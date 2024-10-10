import { Box, Button, CircularProgress } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
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
          console.log("Patient updated successfully");
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

  return (
    <>
      <Link
        onClick={toggleDrawer("left", false)}
        onKeyDown={toggleDrawer("left", false)}
        to={`/${id}`}
        className={styles.__wrapper}
        style={{
          backgroundColor: location === id ? "#b8dadf4d" : "",
          borderColor: location === id ? "var(--sidebar-bg)" : "#fff",
        }}
      >
        <div className={styles.__condition}>
          <h2
            style={{
              borderColor:
                risk?.toLowerCase() === "high"
                  ? "var(--high-border-color)"
                  : risk?.toLowerCase() === "medium" ||
                    risk?.toLowerCase() === "moderate"
                  ? "var(--medium-border-color)"
                  : "var(--low-border-color)",
            }}
          >
            {risk?.toLowerCase() === "high"
              ? "HIGH"
              : risk?.toLowerCase() === "medium" ||
                risk?.toLowerCase() === "moderate"
              ? "MED"
              : risk?.toLowerCase() === "low"
              ? "LOW"
              : ""}
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
            <Button
              onClick={() => diagnose(id)}
              variant="outlined"
              size="small"
              disabled={flags[0]?.topRiskFactors[0] !== "Test One"}
            >
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size="24px" />
                </Box>
              ) : (
                "Diagnose"
              )}
            </Button>
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

          <Stack direction="row" spacing={1}>
            {flags?.slice(0, 3)?.map(({ type, risk }, index) => (
              <Chip
                key={index}
                label={`${type} (${risk.at(0)})`}
                size="small"
                variant="outlined"
                sx={{
                  textTransform: "uppercase",
                  border: "1px solid var(--low-border-color)",
                  color: "#303E65",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
              />
            ))}
            {restRenderFlags?.length !== 0 && (
              <Chip
                label={`+${restRenderFlags?.length} FLAGS`}
                size="small"
                sx={{
                  textTransform: "uppercase",
                  border: "1px solid var(--low-border-color)",
                  color: "#303E65",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
                variant="outlined"
              />
            )}
          </Stack>
        </div>
      </Link>
      <Divider
        sx={{
          width: "85%",
          height: "1px",
          margin: "0 auto",
          backgroundColor: "var(--primary-border-color)",
        }}
      />
      <CustomSnackbar
        message={message}
        open={snackbarOpen}
        handleClose={hideSnackbar}
      />
    </>
  );
};

export default ShortInfoCard;
