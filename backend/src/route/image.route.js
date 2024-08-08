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

imageRoutes.route("/");
// .get(getImages)
// imageRoutes.route('/services')
// .get(getServicesImages)

imageRoutes
    .route("/service/:id")
    // .put(updateServiceImage)
    .post(
        authenticateToken,
        verifyRoles("Admin", "Employé"),
        fileupload,
        addServiceImage
    );

// imageRoutes.route('/habitats')
// .get(getHabitatsImages)

imageRoutes
    .route("/habitat/:id")
    .post(authenticateToken, verifyRoles("Admin"), fileupload, addHabitatImage);

// imageRoutes.route('/animals')
// .get(getAnimalsImages)

imageRoutes
    .route("/animal/:id")
    .post(authenticateToken, verifyRoles("Admin"), fileupload, addAnimalImage);

imageRoutes
    .route("/:id")
    // .get(getImage)
    .delete(authenticateToken, verifyRoles("Admin", "Employé"), deleteImage);

export default imageRoutes;
