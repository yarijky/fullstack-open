import data from '../../data/diagnoses'
import { Diagnose } from '../types'

const diagnoses: Array<Diagnose> = data

const getAll = (): Array<Diagnose> => {
  return diagnoses
}

export default {
  getAll
}
