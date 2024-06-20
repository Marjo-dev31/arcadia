import express from 'express';
import {getHabitats, addHabitat, getHabitat, updateHabitat, deleteHabitat, addComment, deleteComment} from '../controller/habitat.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';


const habitatRoutes = express.Router();

habitatRoutes.route('/')
.get(getHabitats)
.post(authenticateToken, verifyRoles('Admin'), addHabitat);

habitatRoutes.route('/backoffice')
.get(authenticateToken,verifyRoles('Admin'), getHabitats)

habitatRoutes.route('/:id')
// .get(getHabitat)
.put(authenticateToken, verifyRoles('Admin'), updateHabitat)
.delete(authenticateToken, verifyRoles('Admin'), deleteHabitat)

habitatRoutes.route('/:id/comment')
.put(authenticateToken, verifyRoles('Admin', 'Vétérinaire'), addComment)
.delete(authenticateToken, verifyRoles('Admin', 'Vétérinaire'), deleteComment)



export default habitatRoutes;