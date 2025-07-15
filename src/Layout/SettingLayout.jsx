import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/Sidebar";

const SettingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          padding: 0,
        }}
      >
        <SearchBar />

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default SettingLayout;
