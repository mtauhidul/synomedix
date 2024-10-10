import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

// Get all patients data
export const getPatients = async function () {
  const allPatients = [];
  const querySnapshot = await getDocs(collection(db, "patients"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    allPatients.push(data);
  });
  return allPatients;
};

// Get a specific patient by ID
export const getPatient = async function (id) {
  const patientRef = doc(db, "patients", id);
  const docSnap = await getDoc(patientRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such patient exists!");
    return null;
  }
};

// Create a new patient record
export const createPatient = async (patientData) => {
  try {
    const docRef = await addDoc(collection(db, "patients"), patientData);
    return { id: docRef.id, status: "Patient created successfully" };
  } catch (error) {
    console.error("Error adding patient: ", error);
    return { status: "Error creating patient", error };
  }
};

// Update an existing patient record by ID
export const updatePatient = async (id, updatedData) => {
  const patientRef = doc(db, "patients", id);
  try {
    const response = await updateDoc(patientRef, updatedData);
    if (!response) {
      return updatedData;
    }
    return { updatedPatient: response, status: "Patient updated successfully" };
  } catch (error) {
    console.error("Error updating patient: ", error);
    return { status: "Error updating patient", error };
  }
};

// Delete a patient record by ID
export const deletePatient = async (id) => {
  try {
    await deleteDoc(doc(db, "patients", id));
    return { id: id, status: "Patient deleted successfully" };
  } catch (error) {
    console.error("Error deleting patient: ", error);
    return { status: "Error deleting patient", error };
  }
};

const initialData = [
  {
    firstName: "Bryan",
    lastName: "Kim",
    age: 70,
    sex: "M",
    risk: "HIGH",
    section: "ICU",
    id: "3UGSRF",
    room: 2,
    bed: 29,
    admitted: "2022-12-11T11:20:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "1",
        type: "MRSA",
        risk: "HIGH",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "7",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "8",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "9",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "10",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "11",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "12",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "13",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "14",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "15",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "16",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "17",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "18",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "19",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "20",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "2",
        type: "Sepsis",
        risk: "MEDIUM",
        interventions: [
          {
            id: "21",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "22",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "23",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "24",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "25",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "26",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "3",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "27",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "28",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "29",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "30",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "31",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "32",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "33",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "27",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "28",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "29",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "30",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "31",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "32",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "John",
    lastName: "Smith",
    age: 45,
    sex: "M",
    risk: "HIGH",
    section: "Emergency",
    id: "4GUICS",
    room: 3,
    bed: 4,
    admitted: "2022-12-09T00:00:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "4",
        type: "CLABSI",
        risk: "HIGH",
        interventions: [
          {
            id: "33",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "34",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "35",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "36",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "37",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "38",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "4",
        type: "Fall",
        risk: "MEDIUM",
        interventions: [
          {
            id: "39",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "40",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "41",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "42",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "43",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "44",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "5",
        type: "CLABSI",
        risk: "HIGH",
        interventions: [
          {
            id: "45",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "46",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "47",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "48",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "49",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "50",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "5",
        type: "Fall",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "6",
        type: "CLABSI",
        risk: "HIGH",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "7",
        type: "Fall",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Helen",
    lastName: "Brown",
    age: 62,
    sex: "F",
    risk: "LOW",
    section: "Elective",
    id: "C7FJS",
    room: 3,
    bed: 16,
    admitted: "2022-12-08T00:00:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "3",
        type: "MRSA",
        risk: "LOW",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Lucas",
    lastName: "Adam",
    age: 54,
    sex: "M",
    risk: "MEDIUM",
    section: "Urgent",
    id: "4UKLAS",
    room: 3,
    bed: 18,
    admitted: "2022-12-10T00:05:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "4",
        type: "Sepsis",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Timothi",
    lastName: "Wang",
    age: 62,
    sex: "F",
    risk: "LOW",
    section: "Elective",
    id: "8JH89U",
    room: 3,
    bed: 9,
    admitted: "2022-12-07T00:00:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "5",
        type: "CDIFF",
        risk: "HIGH",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "6",
        type: "Sepsis",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "7",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Bryan",
    lastName: "Kim",
    age: 70,
    sex: "M",
    risk: "HIGH",
    section: "ICU",
    id: "3UGSRE",
    room: 2,
    bed: 29,
    admitted: "2022-12-11T01:20:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "6",
        type: "CDIFF",
        risk: "HIGH",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "7",
        type: "Sepsis",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "24",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "8",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "12",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "22",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "33",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "42",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "9",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "John",
    lastName: "Smith",
    age: 45,
    sex: "M",
    risk: "HIGH",
    section: "Emergency",
    id: "4GUICC",
    room: 3,
    bed: 4,
    admitted: "2022-12-09T00:00:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "7",
        type: "CLABSI",
        risk: "HIGH",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "5",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "6",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "8",
        type: "Fall",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "15",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "25",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "32",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "44",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Helen",
    lastName: "Brown",
    age: 62,
    sex: "F",
    risk: "LOW",
    section: "Elective",
    id: "C7FJT",
    room: 3,
    bed: 16,
    admitted: "2022-12-08T00:00:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "8",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "19",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "20",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "36",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "46",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Lucas",
    lastName: "Adam",
    age: 54,
    sex: "M",
    risk: "MEDIUM",
    section: "Urgent",
    id: "4UKLAT",
    room: 3,
    bed: 18,
    admitted: "2022-12-10T00:05:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "9",
        type: "Sepsis",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "1",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
  {
    firstName: "Timothi",
    lastName: "Wang",
    age: 62,
    sex: "F",
    risk: "LOW",
    section: "Elective",
    id: "8JH89R",
    room: 3,
    bed: 9,
    admitted: "2022-12-07T00:00:00.000Z",

    CBC_fishbone: {
      wbc: 10.2,
      hgb: 12.3,
      hct: 37,
      plts: 223,
    },
    BMP_fishbone: {
      na: 140,
      k: 4,
      cl: 100,
      hco3: 27,
      bun: 15,
      creatinine: 0.9,
      glucose: 100,
    },
    vitals: {
      t: 101.3,
      p: 67,
      bp: "117/68",
      rr: 17,
      pox: 99,
    },
    flags: [
      {
        id: "10",
        type: "CDIFF",
        risk: "HIGH",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "1",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "11",
        type: "Sepsis",
        risk: "MEDIUM",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "1",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
      {
        id: "12",
        type: "Fall",
        risk: "LOW",
        interventions: [
          {
            id: "1",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: true,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "1",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "2",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "3",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
          {
            id: "4",
            name: "Test One",
            isCompleted: false,
            date: "2022-12-11T11:20:00.000Z",
          },
        ],
        topRiskFactors: [
          "Test One",
          "Test Longer",
          "Test Even Longer Risk Factor",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
          "Test One",
        ],
      },
    ],
  },
];

// Create a function that will delete all patients data from the database collection "patients" and again add the initial data to the collection "patients" when the "Reset Data" button is clicked. The initial data is stored in the "initialData" array. The function should return a message "Data reset successfully" when the data is reset successfully. Otherwise, it should return an error message "Error resetting data". The function should be exported as "resetData". It's firestore function.

export const resetData = async () => {
  try {
    const collectionRef = collection(db, "patients");

    const querySnapshot = await getDocs(collectionRef);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    const addPromises = initialData.map((patientData) =>
      addDoc(collectionRef, patientData)
    );
    await Promise.all(addPromises);

    return "Data reset successfully";
  } catch (error) {
    console.error("Error resetting data: ", error);
    return "Error resetting data";
  }
};
