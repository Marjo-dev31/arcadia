import express from 'express';
import {getServices, getService, addService, updateService, deleteService} from '../controller/service.controller.js';
import authenticateToken from '../middleware/auth.js';

const serviceRoutes = express.Router();

serviceRoutes.route('/')
.get(getServices)
.post(authenticateToken, addService);

serviceRoutes.route('/:id')
.get(getService)
.put(authenticateToken, updateService)
.delete(authenticateToken, deleteService);

export default serviceRoutes;