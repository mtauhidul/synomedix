import Box from "@mui/material/Box";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const SettingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--primary-bg)",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <SearchBar />

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            background: "var(--primary-bg)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingLayout;
