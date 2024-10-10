import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { usePatientsData } from "../../context/PatientsContext";
import { useUser } from "../../context/UserContext";
import Header from "./Header";
import InfoCard from "./InfoCard";
import styles from "./PatientInfo.module.scss";

const PatientInfo = (props) => {
  const { userState } = useUser();
  const [xedCards, setXedCards] = useState([]);
  const { patients } = usePatientsData();

  const patient = patients.find((p) => p.id === props.id);
  const {
    admitted,
    age,
    bed,
    firstName,
    flags,
    id,
    lastName,
    risk,
    room,
    sex,
    vitals,
    CBC_fishbone,
    BMP_fishbone,
  } = patient;

  useEffect(() => {
    setXedCards(userState.dismissedCards);
  }, []);

  return (
    <section className={styles.__wrapper}>
      <Header
        admitted={admitted}
        age={age}
        bed={bed}
        firstName={firstName}
        flags={flags}
        id={id}
        lastName={lastName}
        risk={risk}
        room={room}
        sex={sex}
        vitals={vitals}
        CBC_fishbone={CBC_fishbone}
        BMP_fishbone={BMP_fishbone}
      />

      {/* Render all patients info in shorts */}
      <Box className={styles.__list}>
        {flags.map((flag, idx) => (
          <InfoCard flag={flag} patientId={id} key={idx} closed />
        ))}
      </Box>
    </section>
  );
};

export default PatientInfo;
