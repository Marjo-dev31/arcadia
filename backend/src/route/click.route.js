import express from 'express'
import { addAnimalOnMongo, addCount, deleteAnimalOnMongo, getAnimalByFirstname, getAnimals } from '../controller/click.controller.js';
import authenticateToken from '../middleware/auth.js';

const clickRoutes = express.Router()

clickRoutes.route('/:firstname')
.get(getAnimalByFirstname)
.put(addCount)

clickRoutes.route('/')
.get(getAnimals)
.post(authenticateToken, addAnimalOnMongo)

clickRoutes.route('/:id')
.delete(authenticateToken, deleteAnimalOnMongo)

export default clickRoutes