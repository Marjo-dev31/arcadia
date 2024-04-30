import express from 'express';
import { addAnimal, deleteAnimal, getAnimal, getAnimals, getAnimalsByHabitat, updateAnimal } from '../controller/animal.controller.js';

const animalsRoutes = express.Router();

animalsRoutes.route('/')
.get(getAnimals)
.post(addAnimal)

animalsRoutes.route('/:id')
.get(getAnimal)
.delete(deleteAnimal)
.put(updateAnimal)

animalsRoutes.route('/habitats/:id')
.get(getAnimalsByHabitat)

export default animalsRoutes