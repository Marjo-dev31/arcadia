import express from 'express'
import { addVeterinaryReport, deleteVeterinaryReport, getVeterinaryReports, updateVeterinaryReport } from '../controller/veterinay.controller.js'

const veterinaryRoutes = express.Router()

veterinaryRoutes.route('/')
.post(addVeterinaryReport)

veterinaryRoutes.route('/animal/:id')
.get(getVeterinaryReports)

veterinaryRoutes.route('/:id')
.delete(deleteVeterinaryReport)
.put(updateVeterinaryReport)

export default veterinaryRoutes