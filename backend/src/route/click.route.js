import express from 'express'
import { getAnimalByFirstname } from '../controller/click.controller.js'

const clickRoutes = express.Router()

clickRoutes.route('/:firstname')
.get(getAnimalByFirstname)

export default clickRoutes