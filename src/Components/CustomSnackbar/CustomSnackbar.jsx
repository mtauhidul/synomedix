import Snackbar from "@mui/material/Snackbar";
import React from "react";

const CustomSnackbar = ({ message, open, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      message={message}
      key="top-right"
      ContentProps={{
        sx: {
          background: "var(--icu-primary)",
          color: "#e2e8f0",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          borderRadius: "10px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.08)",
          minWidth: "240px",
        },
      }}
    />
  );
};

export default CustomSnackbar;
