import express from 'express';
import { addBreed, getBreed } from '../controller/breed.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';

const breedRoutes = express.Router();

breedRoutes.route('/')
.get(getBreed)
.post(authenticateToken, verifyRoles('Admin'), addBreed)

export default breedRoutes;