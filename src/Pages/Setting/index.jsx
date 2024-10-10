import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import React from "react";
import { useFishbone } from "../../context/FishboneContext";
import { usePatientsData } from "../../context/PatientsContext";
import { useVital } from "../../context/VitalContext";
import { resetData } from "../../services";
import styles from "./Setting.module.scss";

const Setting = () => {
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
      console.log("Data reset successfully");
    } else {
      console.error("Error resetting data");
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
      {/* Reset all data button */}
      <Button variant="contained" color="error" onClick={resetAllData}>
        {loading ? (
          <CircularProgress size="24px" color="inherit" />
        ) : (
          "Reset All Data"
        )}
      </Button>
    </div>
  );
};

export default Setting;
