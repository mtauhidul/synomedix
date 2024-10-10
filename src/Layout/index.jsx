import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";
import Patients from "../Components/Patients";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/* this component is left sidebar */}
      <Sidebar />

      <Box
        sx={{
          width: "100%",
          padding: "0 10px",
        }}
      >
        {/* This component is the top search bar */}
        <SearchBar />

        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {/* All Patients */}
          <Patients />

          {/* Patient's details */}
          <Box
            sx={{
              marginLeft: {
                xs: 0,
                lg: "1rem",
              },
              backgroundColor: "#fff",
              flex: 1,
              padding: "1.5rem 1.5rem 0 1.5rem",
              borderRadius: "5px",
            }}
          >
            {children}
          </Box>
        </Box>
        <Box />
      </Box>
    </Box>
  );
};

export default Layout;
