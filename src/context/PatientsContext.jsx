import * as React from "react";

export const PatientsContext = React.createContext();

const PatientsProvider = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  const [allPatients, setAllPatients] = React.useState([]);
  const [filterOn, setFilterOn] = React.useState(false);
  const [showLowRisk, setShowLowRisk] = React.useState(true);
  const [category, setCategory] = React.useState("All");
  const [cons, setCons] = React.useState([]);
  const [sort, setSort] = React.useState("");
  const [reservedData, setReservedData] = React.useState([]);

  React.useEffect(() => {
    setData(patients);
    setAllPatients(patients);
  }, [patients]);

  React.useEffect(() => {
    const localData = JSON.parse(sessionStorage.getItem("patients"));

    if (localData) {
      setReservedData(localData);
    }
  }, []);

  const toggleFilter = () => {
    setShowLowRisk((prev) => !prev);
    localStorage.setItem("showLowRisk", !showLowRisk);
  };

  // This Hook works for the "Show Low Risk Patients" toggle button which is in the Setting page
  React.useEffect(() => {
    if (showLowRisk) {
      setPatients(allPatients);
    } else {
      const filtered = allPatients.filter((patient) => patient.risk !== "LOW");
      setPatients(filtered);
    }
  }, [showLowRisk]);

  // This Hook also works for the "Show Low Risk Patients" toggle button which is in the Setting page
  React.useEffect(() => {
    const localShowLowRisk = localStorage.getItem("showLowRisk");
    if (localShowLowRisk === "false") {
      setShowLowRisk(false);
    } else {
      setShowLowRisk(true);
    }
  }, []);

  // This function is working for refresh Data
  const refreshData = () => {
    setPatients(data);
    setShowLowRisk(true);
  };

  // This function is working for category Search
  const filterByCategory = (cat) => {
    setCategory(cat);
    setFilterOn((prev) => !prev);
    if (cat === "All") {
      if (cons.length === 0) {
        setPatients(reservedData);
        if (sort === "risk_high_to_low") {
          const sortedByRiskHighToLow = data.sort((a, b) => {
            if (a.risk === "HIGH") return -1;
            if (a.risk === "MEDIUM" && b.risk === "LOW") return -1;
            if (a.risk === "MEDIUM" && b.risk === "HIGH") return 1;
            if (a.risk === "LOW") return 1;

            return 0;
          });

          const sortedByRiskHighToLowArray = [...sortedByRiskHighToLow];

          setPatients(sortedByRiskHighToLowArray);
        } else if (sort === "risk_low_to_high") {
          const sortedByRiskLowToHigh = data.sort((a, b) => {
            if (a.risk === "LOW") return -1;
            if (a.risk === "MEDIUM" && b.risk === "High") return -1;
            if (a.risk === "MEDIUM" && b.risk === "Low") return 1;
            if (a.risk === "HIGH") return 1;

            return 0;
          });

          const sortedByRiskLowToHighArray = [...sortedByRiskLowToHigh];

          setPatients(sortedByRiskLowToHighArray);
        } else if (sort === "admitted_high_to_low") {
          const sortedByAdmittedHighToLow = data.sort((a, b) => {
            if (a.admitted < b.admitted) return 1;
            if (a.admitted > b.admitted) return -1;

            return 0;
          });

          const sortedByAdmittedHighToLowArray = [...sortedByAdmittedHighToLow];

          setPatients(sortedByAdmittedHighToLowArray);
        } else if (sort === "admitted_low_to_high") {
          const sortedByAdmittedLowToHigh = data.sort((a, b) => {
            if (a.admitted < b.admitted) return -1;
            if (a.admitted > b.admitted) return 1;

            return 0;
          });

          const sortedByAdmittedLowToHighArray = [...sortedByAdmittedLowToHigh];

          setPatients(sortedByAdmittedLowToHighArray);
        }
      } else {
        const filtered = data.filter((patient) => {
          const flags = patient.flags.map((flag) => flag.type);
          return cons.every((con) => flags.includes(con));
        });
        setPatients(filtered);
      }
    } else {
      if (cons.length === 0) {
        const filtered = data.filter((patient) => patient.risk === cat);
        setPatients(filtered);
      } else {
        const filtered = data.filter((patient) => {
          const flags = patient.flags.map((flag) => flag.type);
          return cons.every((con) => flags.includes(con));
        });
        const filtered2 = filtered.filter((patient) => patient.risk === cat);
        setPatients(filtered2);
      }
    }
  };

  // This function is working for Condition / section Search
  const filterByConditionsArray = (conditions) => {
    setCons(conditions);
    if (conditions.length === 0) {
      if (category === "All") {
        setPatients(reservedData);
      } else {
        const filtered = reservedData.filter(
          (patient) => patient.risk === category
        );
        setPatients(filtered);
      }
    } else {
      if (category === "All") {
        const filtered = reservedData.filter((patient) => {
          const flags = patient.flags.map((flag) => flag.type);
          return conditions.every((condition) => flags.includes(condition));
        });
        setPatients(filtered);
      } else {
        const filtered = reservedData.filter((patient) => {
          const flags = patient.flags.map((flag) => flag.type);

          return conditions.every((condition) => flags.includes(condition));
        });

        const filteredByCategory = filtered.filter(
          (patient) => patient.risk === category
        );
        setPatients(filteredByCategory);
      }
    }
  };

  // This one is working for name and id search
  const filterByNameAndId = (name) => {
    console.log(reservedData.length);
    if (name === "") {
      setPatients(reservedData);
    } else {
      const filtered = reservedData.filter((patient) => {
        const fullName = `${patient.firstName} ${patient.lastName}`;
        const id = patient.id;

        return (
          fullName.toLowerCase().includes(name.toLowerCase()) ||
          id.toLowerCase().includes(name.toLowerCase())
        );
      });
      setPatients(filtered);
    }
  };

  // This function is working for remove patient
  const removePatient = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    if (patient.flags.length === 0) {
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
    }
  };

  // This function is working for remove flag
  const removeFlag = (id, patientId) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id !== patientId) {
        return patient;
      } else {
        const updatedFlags = patient.flags.filter((flag) => flag.id !== id);
        patient.flags = updatedFlags;

        return patient;
      }
    });
    setPatients(updatedPatients);
    removePatient(patientId);
  };

  // This function is working for complete test
  const completeTest = ({ id, complete, patientId }) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id !== patientId) {
        return patient;
      } else {
        const updatedFlags = patient.flags.map((flag) => {
          const updatedInterventions = flag.interventions.map(
            (intervention) => {
              if (intervention.id === id) {
                intervention.isCompleted = complete;
              }
              return intervention;
            }
          );
          flag.interventions = updatedInterventions;
          return flag;
        });
        patient.flags = updatedFlags;
        return patient;
      }
    });

    setPatients(updatedPatients);
  };

  // This function is working for sort data
  const sortPatientData = (sortedType) => {
    setSort(sortedType);
    if (sortedType === "risk_high_to_low") {
      const sortedByRiskHighToLow = patients.sort((a, b) => {
        if (a.risk === "HIGH") return -1;
        if (a.risk === "MEDIUM" && b.risk === "LOW") return -1;
        if (a.risk === "MEDIUM" && b.risk === "HIGH") return 1;
        if (a.risk === "LOW") return 1;

        return 0;
      });

      const sortedByRiskHighToLowArray = [...sortedByRiskHighToLow];

      setPatients(sortedByRiskHighToLowArray);
    } else if (sortedType === "risk_low_to_high") {
      const sortedByRiskLowToHigh = patients.sort((a, b) => {
        if (a.risk === "LOW") return -1;
        if (a.risk === "MEDIUM" && b.risk === "High") return -1;
        if (a.risk === "MEDIUM" && b.risk === "Low") return 1;
        if (a.risk === "HIGH") return 1;

        return 0;
      });

      const sortedByRiskLowToHighArray = [...sortedByRiskLowToHigh];

      setPatients(sortedByRiskLowToHighArray);
    } else if (sortedType === "admitted_high_to_low") {
      const sortedByAdmittedHighToLow = patients.sort((a, b) => {
        if (a.admitted < b.admitted) return 1;
        if (a.admitted > b.admitted) return -1;

        return 0;
      });

      const sortedByAdmittedHighToLowArray = [...sortedByAdmittedHighToLow];

      setPatients(sortedByAdmittedHighToLowArray);
    } else if (sortedType === "admitted_low_to_high") {
      const sortedByAdmittedLowToHigh = patients.sort((a, b) => {
        if (a.admitted < b.admitted) return -1;
        if (a.admitted > b.admitted) return 1;

        return 0;
      });

      const sortedByAdmittedLowToHighArray = [...sortedByAdmittedLowToHigh];

      setPatients(sortedByAdmittedLowToHighArray);
    }
  };

  React.useEffect(() => {
    setPatients(data);
    setAllPatients(data);
  }, []);

  const updatePatientsData = (patient) => {
    const temporaryPatients = [...patients];
    const index = temporaryPatients.findIndex((p) => p.id === patient.id);
    temporaryPatients[index] = patient;
    setPatients(temporaryPatients);
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        setPatients,
        data,
        updatePatientsData,
        filterByConditionsArray,
        filterByCategory,
        filterByNameAndId,
        refreshData,
        completeTest,
        removeFlag,
        sortPatientData,
        filterOn,
        toggleFilter,
        showLowRisk,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatientsData = () => React.useContext(PatientsContext);

export default PatientsProvider;
