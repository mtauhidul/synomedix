import IconButton from "@mui/material/IconButton";
import * as React from "react";

import menuBar from "../../assets/burger-bar.png";
import refreshIcon from "../../assets/refresh.png";
import searchIcon from "../../assets/Search.svg";
import { usePatientsData } from "../../context/PatientsContext";
import { useSidebar } from "../../context/SidebarContext";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const { filterByNameAndId, refreshData, sortPatientData } = usePatientsData();
  const { toggleDrawer } = useSidebar();
  const [search, setSearch] = React.useState("");

  return (
    <div className={styles.__wrapper}>
      {/* Left side: menu + search */}
      <div className={styles.leftSide}>
        <div className={styles.menuBtn}>
          <IconButton onClick={toggleDrawer("left", true)} size="small">
            <img src={menuBar} alt="menu" className={styles.menuBar} />
          </IconButton>
        </div>

        <div className={styles.searchBar}>
          <img src={searchIcon} alt="" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or ID…"
            className={styles.searchInput}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filterByNameAndId(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Right side: sort + refresh */}
      <div className={styles.rightSide}>
        <select
          className={styles.sortSelect}
          onChange={(e) => sortPatientData(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Sort By</option>
          <option value="admitted_low_to_high">LOS — High to Low</option>
          <option value="admitted_high_to_low">LOS — Low to High</option>
          <option value="risk_high_to_low">Risk — High to Low</option>
          <option value="risk_low_to_high">Risk — Low to High</option>
        </select>

        <div className={styles.divider} />

        <div className={styles.refreshBtn} onClick={refreshData} title="Refresh patient data">
          <img className={styles.refreshIcon} src={refreshIcon} alt="Refresh" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
