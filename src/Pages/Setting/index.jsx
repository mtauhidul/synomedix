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
  const { toggleFilter, showLowRisk } = usePatientsData();
  const [loading, setLoading] = React.useState(false);

  const resetAllData = async () => {
    setLoading(true);
    const response = await resetData();
    if (response) {
      setLoading(false);
      showSnackbar("Data reset successfully");

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

  const settingsConfig = [
    {
      id: "fishbone",
      title: "Fishbone Diagrams",
      description:
        "Enable visual cause-and-effect diagrams for patient analysis",
      checked: state.show,
      onChange: toggleView,
      icon: "📊",
      category: "visualization",
    },
    {
      id: "lowRisk",
      title: "Low Risk Patients",
      description: "Include low-risk patients in the main patient list",
      checked: showLowRisk,
      onChange: toggleFilter,
      icon: "👥",
      category: "filtering",
    },
    {
      id: "vitals",
      title: "Vital Signs Display",
      description: "Show detailed vital signs information in patient cards",
      checked: vitalState.show,
      onChange: toggleVitalView,
      icon: "💓",
      category: "monitoring",
    },
  ];

  return (
    <div className={styles.__wrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>System Settings</h1>
          <p className={styles.subtitle}>Configure your Synomedix experience</p>
        </div>
      </header>

      <div className={styles.settingsGrid}>
        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>⚙️</span>
            Display Preferences
          </h2>

          <div className={styles.settingsCards}>
            {settingsConfig.map((setting) => (
              <div key={setting.id} className={styles.settingCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>{setting.icon}</div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{setting.title}</h3>
                    <p className={styles.cardDescription}>
                      {setting.description}
                    </p>
                  </div>
                  <div className={styles.switchContainer}>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={setting.checked}
                        onChange={setting.onChange}
                        className={styles.switchInput}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🔄</span>
            Data Management
          </h2>

          <div className={styles.actionCard}>
            <div className={styles.actionHeader}>
              <div className={styles.actionIcon}>⚠️</div>
              <div className={styles.actionContent}>
                <h3 className={styles.actionTitle}>Reset All Data</h3>
                <p className={styles.actionDescription}>
                  This will permanently delete all patient data and restore
                  default settings. This action cannot be undone.
                </p>
              </div>
            </div>
            <button
              className={`${styles.resetButton} ${
                loading ? styles.loading : ""
              }`}
              onClick={resetAllData}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.spinner}></div>
              ) : (
                <>
                  <span className={styles.buttonIcon}>🗑️</span>
                  Reset All Data
                </>
              )}
            </button>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>ℹ️</span>
            System Information
          </h2>

          <div className={styles.infoCard}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Version</span>
                <span className={styles.infoValue}>1.0.0</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Environment</span>
                <span className={styles.infoValue}>Production</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Last Updated</span>
                <span className={styles.infoValue}>Jul 15, 2025</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Support</span>
                <span className={styles.infoValue}>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomSnackbar
        message={message}
        open={snackbarOpen}
        handleClose={hideSnackbar}
      />
    </div>
  );
};

export default Setting;
