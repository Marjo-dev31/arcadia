import express from "express";
import {
    addHabitatImage,
    addServiceImage,
    deleteImage,
    addAnimalImage,
} from "../controller/image.controller.js";
import fileupload from "../middleware/fileupload.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";

const imageRoutes = express.Router();

imageRoutes
    .route("/service/:id")
    .post(
        authenticateToken,
        verifyRoles("Admin", "Employé"),
        fileupload,
        addServiceImage
    );

imageRoutes
    .route("/habitat/:id")
    .post(authenticateToken, verifyRoles("Admin"), fileupload, addHabitatImage);

imageRoutes
    .route("/animal/:id")
    .post(authenticateToken, verifyRoles("Admin"), fileupload, addAnimalImage);

imageRoutes
    .route("/:id")
    .delete(authenticateToken, verifyRoles("Admin", "Employé"), deleteImage);

export default imageRoutes;
