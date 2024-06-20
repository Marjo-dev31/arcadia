import express from 'express'
import { addAnimalOnMongo, addCount, deleteAnimalOnMongo, getAnimalByFirstname, getAnimals } from '../controller/click.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';



const clickRoutes = express.Router()

clickRoutes.route('/:firstname')
// .get(getAnimalByFirstname)
.put(addCount)

clickRoutes.route('/')
.get(authenticateToken, verifyRoles('Admin', 'Vétérinaire'), getAnimals)
.post(authenticateToken, verifyRoles('Admin'), addAnimalOnMongo)

clickRoutes.route('/:id')
.delete(authenticateToken,verifyRoles('Admin'), deleteAnimalOnMongo)

export default clickRoutes