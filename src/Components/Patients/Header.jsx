import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
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
    const reservedData = JSON.parse(sessionStorage.getItem("patients"));
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
  }, []);

  const risks = data?.map((patient) => patient.risk);
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
      <header onClick={() => {}} className={styles.__wrapper}>
        <Box
          sx={{
            minWidth: 162,
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "14px",
            lineHeight: "17px",
            color: "rgba(48, 62, 101, 0.7)",
            padding: "3px 0",
            paddingLeft: "5px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              flex: "1",
              maxWidth: "75px",
            }}
          >
            Risk Level
          </span>{" "}
          <div
            style={{
              flex: "1",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "1px",
              }}
              onClick={() => {
                setOpen(false);
                setRiskOpen((pre) => !pre);
              }}
            >
              {categoryName}
              {riskOpen ? (
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                    marginRight: "5px",
                  }}
                  src={arrowUpIcon}
                  alt="arrow down icon"
                />
              ) : (
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                    marginRight: "5px",
                  }}
                  src={arrowDownIcon}
                  alt="arrow down icon"
                />
              )}
            </span>
          </div>
          {riskOpen && (
            <ul className={styles.list}>
              {uniqueRisks.map((value, idx) => {
                return (
                  <li
                    key={idx}
                    style={{
                      cursor: "auto",
                    }}
                  >
                    <input
                      type="radio"
                      id={value}
                      name={value}
                      value={value}
                      checked={categoryName === value}
                      style={{
                        margin: "0",
                        padding: "3px 3px 0px 5px !important",
                      }}
                      onChange={(e) => {
                        setOpen(false);
                        filterByCategory(e.target.value);
                        setCategoryName(e.target.value);
                        setRiskOpen(false);
                      }}
                    />
                    <label
                      style={{
                        paddingTop: "1px",
                        paddingLeft: "6px",
                      }}
                      htmlFor={value}
                      className={styles.label}
                    >
                      {value}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </Box>
        <Box
          onClick={() => {
            setRiskOpen(false);
          }}
          sx={{
            minWidth: 190,
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "14px",
            lineHeight: "17px",
            color: "rgba(48, 62, 101, 0.7)",
            padding: "3px 0",
            paddingLeft: "5px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              flex: "1",
              maxWidth: "70px",
            }}
          >
            Condition
          </span>{" "}
          <div
            style={{
              flex: "1",
            }}
            onClick={() => setOpen((pre) => !pre)}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "1px",
              }}
            >
              {selectedOption.filter((option) => option.checked).length === 0
                ? "All"
                : selectedOption && (
                    <>
                      {selectedOption
                        .filter((option) => option.checked)
                        .map((option) => option.value.slice(0, 2))
                        .join(", ")}
                    </>
                  )}
              {open ? (
                <img
                  onClick={() => setOpen(true)}
                  style={{
                    height: "24px",
                    width: "24px",
                    marginRight: "5px",
                  }}
                  src={arrowUpIcon}
                  alt="arrow down icon"
                />
              ) : (
                <img
                  onClick={() => setOpen(false)}
                  style={{
                    height: "24px",
                    width: "24px",

                    marginRight: "5px",
                  }}
                  src={arrowDownIcon}
                  alt="arrow down icon"
                />
              )}
            </span>
          </div>
          {open && (
            <ul className={styles.list}>
              {selectedOption.map(({ value, checked }, idx) => {
                return (
                  <li
                    key={idx}
                    style={{
                      cursor: "auto",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`condition_${idx}`}
                      name={idx}
                      value={value}
                      checked={checked}
                      onChange={handleSelect}
                      style={{
                        margin: "0",
                        padding: "3px 3px 3px 4px !important",
                      }}
                    />
                    <label
                      style={{
                        paddingTop: "1px",
                        paddingLeft: "6px",
                      }}
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
        </Box>
      </header>
      <Divider />
    </>
  );
};

export default Header;
