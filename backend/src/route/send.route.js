import express from 'express';
import { sendEmail } from '../controller/mail.controller.js';

const sendRoutes = express.Router();

sendRoutes.route('/')
.post(sendEmail)


export default sendRoutes;