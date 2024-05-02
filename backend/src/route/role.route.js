import express from 'express';
import { getRolesWithoutAdmin } from '../controller/role.controller.js';

const roleRoutes = express.Router();

roleRoutes.route('/')
.get(getRolesWithoutAdmin)


export default roleRoutes;