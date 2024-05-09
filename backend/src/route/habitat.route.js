import express from 'express';
import {getHabitats, addHabitat, getHabitat, updateHabitat, deleteHabitat, addComment, deleteComment} from '../controller/habitat.controller.js';
import authenticateToken from '../middleware/auth.js';


const habitatRoutes = express.Router();

habitatRoutes.route('/')
.get(getHabitats)
.post(authenticateToken, addHabitat);

habitatRoutes.route('/:id')
.get(getHabitat)
.put(authenticateToken, updateHabitat)
.delete(authenticateToken, deleteHabitat)

habitatRoutes.route('/:id/comment')
.put(authenticateToken, addComment)
.delete(authenticateToken, deleteComment)



export default habitatRoutes;