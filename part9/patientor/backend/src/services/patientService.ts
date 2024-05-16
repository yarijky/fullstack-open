import data from '../../data/patients'
import { NonSensitivePatient, Patient, NewPatient } from '../types'
import { v4 as uuidv4 } from 'uuid';


const patients: Array<NonSensitivePatient> = data.map(
  ({ id, name, dateOfBirth, ssn, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
  })
);

const getAll = (): Array<NonSensitivePatient> => {
  return patients
}

const getPatient = (id: string): NonSensitivePatient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};


export default {
  getAll,
  getPatient,
  addPatient
}
