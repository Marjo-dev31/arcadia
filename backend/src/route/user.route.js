import express from "express";
import {
    addUser,
    getUsersEmployee,
    getUsersVeterinary,
    updatePassword,
} from "../controller/user.controller.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";
import { sendEmailToNewUser } from "../middleware/send-mail.js";

const userRoutes = express.Router();

userRoutes
    .route("/")
    .post(authenticateToken, verifyRoles("Admin"), sendEmailToNewUser, addUser)
    .put(authenticateToken, updatePassword);

userRoutes
.route("/veterinary")
.get(authenticateToken, getUsersVeterinary)

userRoutes
.route("/employee")
.get(authenticateToken, getUsersEmployee)

export default userRoutes;
