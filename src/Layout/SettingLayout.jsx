import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const SettingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />

      <Container maxWidth="xl">
        <SearchBar />

        {children}
      </Container>
    </Box>
  );
};

export default SettingLayout;
