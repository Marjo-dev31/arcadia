import express from 'express';
import { getUsers } from '../controller/user.controller.js';

const userRoutes = express.Router()

userRoutes.route('/')
.get(getUsers)

export default userRoutes