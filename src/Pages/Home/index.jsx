import { useLocation } from "react-router-dom";
import PatientInfo from "../../Components/PatientInfo";
import { usePatientsData } from "../../context/PatientsContext";
import styles from "./Home.module.scss";

const Home = () => {
  const { patients } = usePatientsData();
  const patientId = useLocation().pathname?.split("/")[1];
  const patient = patients.find((patient) => patient.id === patientId);

  return (
    <section className={styles.__wrapper}>
      {patient ? (
        <PatientInfo {...patient} />
      ) : (
        <div className={styles.__noPatient}>
          <div className={styles.icon}>🏥</div>
          <h2>Select a patient to view details</h2>
          <p>Choose a patient from the list on the left to view<br />their clinical flags, interventions, and risk analysis.</p>
        </div>
      )}
    </section>
  );
};

export default Home;
