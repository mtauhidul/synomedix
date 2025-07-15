import * as React from "react";
// material ui
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

// logo
import DashboardIcon from "../../assets/dashboard.svg";
import SettingIcon from "../../assets/setting.svg";
import Logo from "../../assets/synomedix.png";

// styles
import useWindowSize from "../../hooks/useWindowSize";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { height } = useWindowSize();

  React.useEffect(() => {}, []);

  return (
    <Box
      as="div"
      className={styles.__wrapper}
      sx={{
        height: `${height}px`,
      }}
    >
      <Link to="/">
        <img
          style={{
            height: "2.5rem",
            width: "2.5rem",
          }}
          src={Logo}
          alt="logo"
        />
      </Link>

      <Link to="/dashboard">
        <img src={DashboardIcon} alt="dashboard" />
      </Link>

      <Link to="/setting">
        <img src={SettingIcon} alt="setting" />
      </Link>
    </Box>
  );
};

export default Sidebar;
