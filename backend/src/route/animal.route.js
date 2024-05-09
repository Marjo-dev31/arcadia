import express from 'express';
import { addAnimal, deleteAnimal, getAnimal, getAnimals, getAnimalsByHabitat, updateAnimal } from '../controller/animal.controller.js';
import authenticateToken from '../middleware/auth.js';

const animalsRoutes = express.Router();

animalsRoutes.route('/')
.get(getAnimals)
.post(authenticateToken, addAnimal)

animalsRoutes.route('/:id')
.get(getAnimal)
.delete(authenticateToken, deleteAnimal)
.put(authenticateToken, updateAnimal)

animalsRoutes.route('/habitats/:id')
.get(getAnimalsByHabitat)

export default animalsRoutes