import express from 'express';
import { getBreed } from '../controller/breed.controller.js';

const breedRoutes = express.Router();

breedRoutes.route('/')
.get(getBreed)



export default breedRoutes;