import express from 'express'
import { addVeterinaryReport, deleteVeterinaryReports, getVeterinaryReports } from '../controller/veterinay.controller.js'

const veterinaryRoutes = express.Router()

veterinaryRoutes.route('/')
.post(addVeterinaryReport)

veterinaryRoutes.route('/animal/:id')
.get(getVeterinaryReports)

veterinaryRoutes.route('/:id')
.delete(deleteVeterinaryReports)

export default veterinaryRoutes