import express from 'express';
import { addUser, getUsers } from '../controller/user.controller.js';

const userRoutes = express.Router()

userRoutes.route('/')
.get(getUsers)
.post(addUser);

export default userRoutes;