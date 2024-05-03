import express from 'express'
import { addCount, getAnimalByFirstname } from '../controller/click.controller.js'

const clickRoutes = express.Router()

clickRoutes.route('/:firstname')
.get(getAnimalByFirstname)
.put(addCount)

clickRoutes.route('/')
// .post(addAnimalOnMongo)

export default clickRoutes