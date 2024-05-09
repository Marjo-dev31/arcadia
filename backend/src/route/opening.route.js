import express from 'express'
import { getOpening, updateOpening } from '../controller/opening.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';

const openingRoutes = express.Router();

openingRoutes.route('/')
.get(getOpening)

openingRoutes.route('/:id')
.put(authenticateToken, verifyRoles('Admin'), updateOpening)


export default openingRoutes
