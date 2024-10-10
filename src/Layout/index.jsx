import Box from "@mui/material/Box";
import Patients from "../Components/Patients";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          width: "100%",
          padding: "0 10px",
        }}
      >
        <SearchBar />

        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Patients />

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
