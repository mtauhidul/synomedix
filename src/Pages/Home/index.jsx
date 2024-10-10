import React from "react";
import { useLocation } from "react-router-dom";
import PatientInfo from "../../Components/PatientInfo";
import { usePatientsData } from "../../context/PatientsContext";
import { getPatients } from "../../services";
import styles from "./Home.module.scss";

const Home = () => {
  const { patients, setPatients } = usePatientsData();
  const patientId = useLocation().pathname?.split("/")[1];
  const patient = patients.find((patient) => patient.id === patientId);

  const fetchData = async () => {
    try {
      const response = await getPatients();

      setPatients(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles.__wrapper}>
      {patient ? (
        <PatientInfo {...patient} />
      ) : (
        <div className={styles.__noPatient}>
          <h2>No patient selected</h2>
        </div>
      )}
    </section>
  );
};

export default Home;
