import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import CustomSnackbar from "../../Components/CustomSnackbar/CustomSnackbar";
import { useFishbone } from "../../context/FishboneContext";
import { usePatientsData } from "../../context/PatientsContext";
import { useVital } from "../../context/VitalContext";
import { resetData } from "../../services";
import styles from "./Setting.module.scss";

const Setting = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (msg) => {
    setMessage(msg);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  const { toggleView, state } = useFishbone();
  const { toggleVitalView, vitalState } = useVital();
  const { filterByCategory, filterOn, toggleFilter, showLowRisk } =
    usePatientsData();
  const [loading, setLoading] = React.useState(false);

  const resetAllData = async () => {
    setLoading(true);
    const response = await resetData();
    if (response) {
      setLoading(false);
      showSnackbar("Data reset successfully");
      console.log("Data reset successfully");

      setTimeout(() => {
        hideSnackbar();
      }, 3000);
    } else {
      setLoading(false);
      showSnackbar("Error resetting data");
      console.error("Error resetting data");

      setTimeout(() => {
        hideSnackbar();
      }, 3000);
    }
  };

  return (
    <div className={styles.__wrapper}>
      <h2>Settings</h2>
      <br />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.show} />}
          onChange={toggleView}
          label="Show Fishbone Diagrams"
        />
        <FormControlLabel
          control={<Switch checked={showLowRisk} />}
          onChange={toggleFilter}
          label="Show Low Risk Patients"
        />
        <FormControlLabel
          control={<Switch checked={vitalState.show} />}
          onChange={toggleVitalView}
          label="Show Vitals"
        />
      </FormGroup>
      <br />
      <br />
      <Button variant="contained" color="error" onClick={resetAllData}>
        {loading ? (
          <CircularProgress size="24px" color="inherit" />
        ) : (
          "Reset All Data"
        )}
      </Button>
      <CustomSnackbar
        message={message}
        open={snackbarOpen}
        handleClose={hideSnackbar}
      />
    </div>
  );
};

export default Setting;
