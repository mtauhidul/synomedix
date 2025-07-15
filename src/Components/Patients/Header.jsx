import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import arrowDownIcon from "../../assets/arrow_down.svg";
import arrowUpIcon from "../../assets/arrow_up.svg";
import { usePatientsData } from "../../context/PatientsContext";
import styles from "./Header.module.scss";

const Header = () => {
  const { data } = usePatientsData();
  const { filterByCategory, filterByConditionsArray } = usePatientsData();
  const [open, setOpen] = useState(false);
  const [riskOpen, setRiskOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [categoryName, setCategoryName] = useState("All");

  useEffect(() => {
    const patientsData = sessionStorage.getItem("patients");
    if (!patientsData) return;

    try {
      const reservedData = JSON.parse(patientsData);
      if (!reservedData || !Array.isArray(reservedData)) return;

      const options = reservedData.map((patient) =>
        patient.flags?.map((flag) => flag.type)
      );
      const flatArray = options.flat();
      const uniqueOptions = [...new Set(flatArray)];
      const selectedOptions = uniqueOptions.map((option) => ({
        value: option,
        checked: false,
      }));

      setSelectedOption(selectedOptions);
    } catch (error) {
      console.error("Error parsing patients data from sessionStorage:", error);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
      setRiskOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const risks = data?.map((patient) => patient.risk) || [];
  const uniqueRisks = ["All", ...new Set(risks)];

  // It will filter the data based on the selected condition
  const handleSelect = (e) => {
    const { checked, value } = e.target;

    const updatedOptions = selectedOption.map((option) => {
      if (option.value === value) {
        return {
          ...option,
          checked,
        };
      }
      return option;
    });

    setSelectedOption(updatedOptions);

    const selectedConditions = updatedOptions
      .filter((option) => option.checked)
      .map((option) => option.value);

    filterByConditionsArray(selectedConditions);
    // setOpen(false);
  };

  return (
    <>
      <header className={styles.__wrapper}>
        <div
          className={`${styles.dropdown} ${styles.risk__dropdown} ${
            riskOpen ? styles.active : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            setRiskOpen((pre) => !pre);
          }}
        >
          <span className={styles.dropdown__label}>Risk Level</span>
          <div className={styles.dropdown__value}>
            <span>{categoryName}</span>
          </div>
          <img
            className={`${styles.dropdown__arrow} ${riskOpen ? styles.up : ""}`}
            src={riskOpen ? arrowUpIcon : arrowDownIcon}
            alt="dropdown arrow"
          />
          {riskOpen && (
            <ul className={`${styles.list} ${styles["risk-list"]}`}>
              {uniqueRisks.map((value, idx) => {
                return (
                  <li key={idx} onClick={(e) => e.stopPropagation()}>
                    <input
                      type="radio"
                      id={value}
                      name="riskLevel"
                      value={value}
                      checked={categoryName === value}
                      onChange={(e) => {
                        setOpen(false);
                        filterByCategory(e.target.value);
                        setCategoryName(e.target.value);
                        setRiskOpen(false);
                      }}
                    />
                    <label htmlFor={value} className={styles.label}>
                      {value}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div
          className={`${styles.dropdown} ${styles.condition__dropdown} ${
            open ? styles.active : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setRiskOpen(false);
            setOpen((pre) => !pre);
          }}
        >
          <span className={styles.dropdown__label}>Condition</span>
          <div className={styles.dropdown__value}>
            <span>
              {selectedOption.filter((option) => option.checked).length === 0
                ? "All"
                : selectedOption.filter((option) => option.checked).length > 2
                ? `${
                    selectedOption.filter((option) => option.checked).length
                  } Selected`
                : selectedOption
                    .filter((option) => option.checked)
                    .map((option) => option.value.slice(0, 8))
                    .join(", ")}
            </span>
          </div>
          <img
            className={`${styles.dropdown__arrow} ${open ? styles.up : ""}`}
            src={open ? arrowUpIcon : arrowDownIcon}
            alt="dropdown arrow"
          />
          {open && (
            <ul className={`${styles.list} ${styles["condition-list"]}`}>
              {selectedOption.map(({ value, checked }, idx) => {
                return (
                  <li key={idx} onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      id={`condition_${idx}`}
                      name={`condition_${idx}`}
                      value={value}
                      checked={checked}
                      onChange={handleSelect}
                    />
                    <label
                      htmlFor={`condition_${idx}`}
                      className={styles.label}
                    >
                      {value}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </header>
      <Divider />
    </>
  );
};

export default Header;
