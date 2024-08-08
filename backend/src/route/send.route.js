import express from "express";
import {
    sendEmail,
    sendEmailToNewPassword,
} from "../controller/mail.controller.js";

const sendRoutes = express.Router();

sendRoutes.route("/").post(sendEmail);

sendRoutes.route("/forgotpassword").post(sendEmailToNewPassword);

export default sendRoutes;
