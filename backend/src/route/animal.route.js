import express from 'express';
import { addAnimal, deleteAnimal, getAnimals, updateAnimal } from '../controller/animal.controller.js';

const animalsRoutes = express.Router();

animalsRoutes.route('/')
.get(getAnimals)
.post(addAnimal)

animalsRoutes.route('/:id')
.delete(deleteAnimal)
.put(updateAnimal)

export default animalsRoutes