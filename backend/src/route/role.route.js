import express from 'express';
import { getRolesWithoutAdmin } from '../controller/role.controller.js';
import authenticateToken from '../middleware/auth.js';

const roleRoutes = express.Router();

roleRoutes.route('/')
.get(authenticateToken, getRolesWithoutAdmin)


export default roleRoutes;