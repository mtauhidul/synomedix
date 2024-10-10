import * as React from "react";
// material ui
import Box from "@mui/material/Box";

import { Link, useNavigate } from "react-router-dom";

// logo
import SettingIcon from "../../assets/setting.svg";
import Logo from "../../assets/synomedix.png";

// styles
import useWindowSize from "../../hooks/useWindowSize";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { height } = useWindowSize();

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

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

      {/* <HomeRoundedIcon
        sx={{
          fontSize: "2.5rem",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={goBack}
      /> */}

      <Link to="/setting">
        <img src={SettingIcon} alt="setting" />
      </Link>
    </Box>
  );
};

export default Sidebar;
