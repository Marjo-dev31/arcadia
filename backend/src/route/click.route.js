import express from 'express'
import { addAnimalOnMongo, addCount, getAnimalByFirstname, getAnimals } from '../controller/click.controller.js'

const clickRoutes = express.Router()

clickRoutes.route('/:firstname')
.get(getAnimalByFirstname)
.put(addCount)

clickRoutes.route('/')
.get(getAnimals)
.post(addAnimalOnMongo)

export default clickRoutes