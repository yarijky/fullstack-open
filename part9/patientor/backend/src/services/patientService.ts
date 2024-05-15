import data from '../../data/patients'
import { PatientWithoutSsn, Patient, NewPatient } from '../types'
import { v4 as uuidv4 } from 'uuid';


const patients: Array<PatientWithoutSsn> = data.map(
  ({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

const getAll = (): Array<PatientWithoutSsn> => {
  return patients
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};


export default {
  getAll,
  addPatient
}
