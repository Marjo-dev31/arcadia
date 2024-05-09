import express from 'express'
import { addVeterinaryReport, deleteVeterinaryReport, getVeterinaryReports, updateVeterinaryReport } from '../controller/veterinay.controller.js'
import authenticateToken from '../middleware/auth.js'
import verifyRoles from '../middleware/verifyroles.js'

const veterinaryRoutes = express.Router()

veterinaryRoutes.route('/')
.post(authenticateToken, verifyRoles('Vétérinaire'), addVeterinaryReport)

veterinaryRoutes.route('/animal/:id')
.get(authenticateToken, getVeterinaryReports)

veterinaryRoutes.route('/:id')
.delete(authenticateToken, verifyRoles('Vétérinaire'), deleteVeterinaryReport)
.put(authenticateToken, verifyRoles('Vétérinaire'), updateVeterinaryReport)

export default veterinaryRoutes