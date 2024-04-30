import express from 'express'
import { addVeterinaryReport, getVeterinaryReports } from '../controller/veterinay.controller.js'

const veterinaryRoutes = express.Router()

veterinaryRoutes.route('/')
.get(getVeterinaryReports)
.post(addVeterinaryReport)


export default veterinaryRoutes