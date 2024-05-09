import express from 'express';
import { addUser, getUsers } from '../controller/user.controller.js';
import authenticateToken from '../middleware/auth.js';

const userRoutes = express.Router()

userRoutes.route('/')
.get(getUsers)
.post(authenticateToken, addUser);

export default userRoutes;