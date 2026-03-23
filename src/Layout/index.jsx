import Box from "@mui/material/Box";
import Patients from "../Components/Patients";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const Layout = ({ children }) => {
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
            display: "flex",
            alignItems: "stretch",
            gap: "12px",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            padding: "12px 16px 16px",
          }}
        >
          <Patients />

          <Box
            sx={{
              backgroundColor: "#fff",
              flex: 1,
              borderRadius: "14px",
              border: "1px solid var(--primary-border-color)",
              boxShadow: "var(--card-shadow)",
              minWidth: 0,
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
