import express from 'express';
import { addAnimal, deleteAnimal, getAnimal, getAnimals, getAnimalsByHabitat, updateAnimal } from '../controller/animal.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';

const animalsRoutes = express.Router();

animalsRoutes.route('/')
.get(getAnimals)
.post(authenticateToken, verifyRoles('Admin'), addAnimal)

animalsRoutes.route('/:id')
.get(getAnimal)
.delete(authenticateToken, verifyRoles('Admin'), deleteAnimal)
.put(authenticateToken, verifyRoles('Admin'), updateAnimal)

animalsRoutes.route('/habitats/:id')
.get(getAnimalsByHabitat)

export default animalsRoutes