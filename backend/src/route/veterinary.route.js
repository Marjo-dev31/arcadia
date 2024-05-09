import express from 'express'
import { addVeterinaryReport, deleteVeterinaryReport, getVeterinaryReports, updateVeterinaryReport } from '../controller/veterinay.controller.js'
import authenticateToken from '../middleware/auth.js'

const veterinaryRoutes = express.Router()

veterinaryRoutes.route('/')
.post(authenticateToken, addVeterinaryReport)

veterinaryRoutes.route('/animal/:id')
.get(authenticateToken, getVeterinaryReports)

veterinaryRoutes.route('/:id')
.delete(authenticateToken, deleteVeterinaryReport)
.put(authenticateToken, updateVeterinaryReport)

export default veterinaryRoutes