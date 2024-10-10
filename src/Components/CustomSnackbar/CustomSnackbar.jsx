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
    />
  );
};

export default CustomSnackbar;
