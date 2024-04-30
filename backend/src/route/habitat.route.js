import express from 'express';
import {getHabitats, addHabitat, getHabitat, updateHabitat, deleteHabitat, addComment, deleteComment} from '../controller/habitat.controller.js';


const habitatRoutes = express.Router();

habitatRoutes.route('/')
.get(getHabitats)
.post(addHabitat);

habitatRoutes.route('/:id')
.get(getHabitat)
.put(updateHabitat)
.delete(deleteHabitat)

habitatRoutes.route('/:id/comment')
.put(addComment)
.delete(deleteComment)



export default habitatRoutes;