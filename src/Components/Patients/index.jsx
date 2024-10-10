import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

import searchIcon from "../../assets/Search.svg";
import { usePatientsData } from "../../context/PatientsContext";
import { useSidebar } from "../../context/SidebarContext";
import Header from "./Header";
import styles from "./Patients.module.scss";
import ShortInfoCard from "./ShortInfo";

const Patients = () => {
  const { state, toggleDrawer } = useSidebar();
  const [search, setSearch] = React.useState("");
  const { patients, filterByNameAndId } = usePatientsData();

  const list = (anchor) => (
    <Box sx={{ width: 420, padding: "5px" }} role="presentation">
      <div className={styles.searchBar}>
        <img src={searchIcon} alt="search icon" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Patient"
          className={styles.searchInput}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            filterByNameAndId(e.target.value);
          }}
        />
      </div>

      {/* Render patient's information */}
      <section className={styles.__mobile_wrapper}>
        <div className={styles.listOfPatients}>
          {patients.map((info, index) => (
            <ShortInfoCard key={index} {...info} />
          ))}
        </div>
      </section>
    </Box>
  );

  return (
    <>
      <section className={styles.__wrapper}>
        <Header />

        <div className={styles.listOfPatients}>
          {patients.map((info, index) => (
            <ShortInfoCard key={index} {...info} />
          ))}
        </div>
      </section>

      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

export default Patients;
