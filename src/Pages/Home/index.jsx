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
          <h2>No patient selected</h2>
        </div>
      )}
    </section>
  );
};

export default Home;
