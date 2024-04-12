import express from 'express';
import {getServices, getService, addService, updateService, deleteService} from '../controller/serviceController.controller.js';

const serviceRoutes = express.Router();

serviceRoutes.route('/')
.get(getServices)
.post(addService);

serviceRoutes.route('/:id')
.get(getService)
.put(updateService)
.delete(deleteService);