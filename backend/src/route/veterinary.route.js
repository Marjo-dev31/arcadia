import express from 'express'
import { addVeterinaryReport, getVeterinaryReports } from '../controller/veterinay.controller.js'

const veterinaryRoutes = express.Router()

veterinaryRoutes.route('/')
.post(addVeterinaryReport)

veterinaryRoutes.route('/animal/:id')
.get(getVeterinaryReports)

export default veterinaryRoutes