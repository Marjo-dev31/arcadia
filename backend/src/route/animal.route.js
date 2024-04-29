import express from 'express';
import { addAnimal, getAnimals } from '../controller/animal.controller.js';

const animalsRoutes = express.Router();

animalsRoutes.route('/')
.get(getAnimals)
.post(addAnimal)

export default animalsRoutes