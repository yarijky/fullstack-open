import express from 'express'
import patientService from '../services/patientService'
import toNewPatient from '../utils'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
  console.log('someone calls for patients')
  res.send(patientService.getAll())
})

patientRouter.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e : any) {
    res.status(400).send({ error: e.message });
  }
});

export default patientRouter
