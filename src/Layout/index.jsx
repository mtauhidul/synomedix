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
      }}
    >
      <Sidebar />

      <Box
        sx={{
          width: "100%",
          padding: "0 10px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <SearchBar />

        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            gap: "1rem",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <Patients />

          <Box
            sx={{
              backgroundColor: "#fff",
              flex: 1,
              padding: "1.5rem 1.5rem 0 1.5rem",
              borderRadius: "12px",
              minWidth: 0,
              overflow: "hidden",
              height: "100%",
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
