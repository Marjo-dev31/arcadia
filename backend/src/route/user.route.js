import express from "express";
import {
    addUser,
    getUsers,
    updatePassword,
} from "../controller/user.controller.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";
import { sendEmailToNewUser } from "../middleware/send-mail.js";

const userRoutes = express.Router();

userRoutes
    .route("/")
    .get(authenticateToken, getUsers)
    .post(authenticateToken, verifyRoles("Admin"), sendEmailToNewUser, addUser)
    .put(authenticateToken, updatePassword);

export default userRoutes;
