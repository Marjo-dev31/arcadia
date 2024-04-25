import express from 'express';
import {getHabitats, addHabitat, getHabitat, updateHabitat, deleteHabitat} from '../controller/habitat.controller.js';

const habitatRoutes = express.Router();

habitatRoutes.route('/')
.get(getHabitats)
.post(addHabitat);

habitatRoutes.route('/:id')
.get(getHabitat)
.put(updateHabitat)
.delete(deleteHabitat);

export default habitatRoutes;