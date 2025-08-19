import patients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  return patients.map(({ ssn, ...patient }: Patient): NonSensitivePatient => patient);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export default {
  getAllPatients,
  addPatient,
  getPatientById
};
