import express from 'express';
import {getServices, getService, addService, updateService, deleteService} from '../controller/service.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';

const serviceRoutes = express.Router();

serviceRoutes.route('/')
.get(getServices)
.post(authenticateToken, verifyRoles('Admin', 'Employé'), addService);

serviceRoutes.route('/:id')
.get(getService)
.put(authenticateToken, verifyRoles('Admin', 'Employé'), updateService)
.delete(authenticateToken, verifyRoles('Admin', 'Employé'), deleteService);

export default serviceRoutes;