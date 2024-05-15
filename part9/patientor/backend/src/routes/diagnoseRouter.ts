import express from 'express'
import diagnoseService from '../services/diagnoseService'

const diagnoseRouter = express.Router()

diagnoseRouter.get('/', (_req, res) => {
  console.log('someone calls for diagnoses')
  res.send(diagnoseService.getAll())
})

export default diagnoseRouter
