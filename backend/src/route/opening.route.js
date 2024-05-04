import express from 'express'
import { getOne, getOpening, updateOpening } from '../controller/opening.controller.js';

const openingRoutes = express.Router();

openingRoutes.route('/')
.get(getOpening)

openingRoutes.route('/:id')
.put(updateOpening)
.get(getOne)


export default openingRoutes
