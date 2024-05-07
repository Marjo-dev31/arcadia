import express from 'express'
import { addAnimalOnMongo, addCount, deleteAnimalOnMongo, getAnimalByFirstname, getAnimals } from '../controller/click.controller.js';
import authenticateToken from '../middleware/auth.js';


const clickRoutes = express.Router()

clickRoutes.route('/:firstname')
.get(getAnimalByFirstname)
.put(addCount)

clickRoutes.route('/')
.get(authenticateToken, getAnimals)
.post(addAnimalOnMongo)

clickRoutes.route('/:id')
.delete(deleteAnimalOnMongo)

export default clickRoutes