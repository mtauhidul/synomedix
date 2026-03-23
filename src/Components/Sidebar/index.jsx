import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "../../assets/dashboard.svg";
import Logo from "../../assets/med.png";
import SettingIcon from "../../assets/setting.svg";

import useWindowSize from "../../hooks/useWindowSize";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { height } = useWindowSize();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || (location.pathname !== "/dashboard" && location.pathname !== "/setting");
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      as="div"
      className={styles.__wrapper}
      sx={{ height: `${height}px` }}
    >
      <Link to="/" className={styles.logo} title="SynoMedix — Patient List">
        <img src={Logo} alt="SynoMedix logo" />
      </Link>

      <div className={styles.divider} />

      <Link
        to="/"
        className={`${isActive("/") && !isActive("/dashboard") && !isActive("/setting") ? styles["active-link"] : ""}`}
        title="Patients"
      >
        <img src={DashboardIcon} alt="" />
        <span className={styles["nav-label"]}>Patients</span>
      </Link>

      <Link
        to="/dashboard"
        className={isActive("/dashboard") ? styles["active-link"] : ""}
        title="Analytics Dashboard"
      >
        <img src={DashboardIcon} alt="" />
        <span className={styles["nav-label"]}>Analytics</span>
      </Link>

      <div className={styles["bottom-nav"]}>
        <Link
          to="/setting"
          className={isActive("/setting") ? styles["active-link"] : ""}
          title="Settings"
        >
          <img src={SettingIcon} alt="" />
          <span className={styles["nav-label"]}>Settings</span>
        </Link>
      </div>
    </Box>
  );
};

export default Sidebar;
