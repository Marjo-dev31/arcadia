import express from 'express';
import { addUser, getUsers } from '../controller/user.controller.js';
import authenticateToken from '../middleware/auth.js';
import verifyRoles from '../middleware/verifyroles.js';

const userRoutes = express.Router()

userRoutes.route('/')
.get(getUsers)
.post(authenticateToken, verifyRoles('Admin'), addUser);

export default userRoutes;