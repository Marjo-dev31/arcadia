import express from "express";
import {
    addAnimal,
    deleteAnimal,
    getAnimals,
    getAnimalsByHabitat,
    getAnimalsForFilter,
    updateAnimal,
} from "../controller/animal.controller.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";

const animalsRoutes = express.Router();

animalsRoutes
    .route("/")
    .get(getAnimalsForFilter)
    .post(authenticateToken, verifyRoles("Admin"), addAnimal);

animalsRoutes
    .route("/backoffice")
    .get(authenticateToken, verifyRoles("Admin"), getAnimals);

animalsRoutes
    .route("/:id")
    .delete(authenticateToken, verifyRoles("Admin"), deleteAnimal)
    .put(authenticateToken, verifyRoles("Admin"), updateAnimal);

animalsRoutes.route("/habitats/:id").get(getAnimalsByHabitat);

export default animalsRoutes;
