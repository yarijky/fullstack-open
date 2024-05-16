export interface Diagnose {
  code: string
  name: string
  latin?: string
}

export interface Entry {}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
  entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id' | 'entries'>
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
