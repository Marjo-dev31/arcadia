import express from "express";
import { addHabitatImage, addServiceImage, getImage, getImages, deleteImage, addAnimalImage } from "../controller/image.controller.js";
import fileupload from "../middleware/fileupload.js";
import authenticateToken from "../middleware/auth.js";



const imageRoutes = express.Router();

imageRoutes.route('/')
.get(getImages)

// imageRoutes.route('/services')
// .get(getServicesImages)

imageRoutes.route('/service/:id')
// .put(updateServiceImage)
.post(authenticateToken, fileupload, addServiceImage)

// imageRoutes.route('/habitats')
// .get(getHabitatsImages)

imageRoutes.route('/habitat/:id')
.post(authenticateToken, fileupload, addHabitatImage)

// imageRoutes.route('/animals')
// .get(getAnimalsImages)

imageRoutes.route('/animal/:id')
.post(authenticateToken, fileupload, addAnimalImage)

imageRoutes.route('/:id')
.get(getImage)
.delete(authenticateToken, deleteImage)

export default imageRoutes
