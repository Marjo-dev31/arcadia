import express from "express";
import { addHabitatImage, addServiceImage, getImage, getImages, deleteImage, addAnimalImage } from "../controller/image.controller.js";



const imageRoutes = express.Router();

imageRoutes.route('/')
.get(getImages)

// imageRoutes.route('/services')
// .get(getServicesImages)

imageRoutes.route('/service/:id')
// .put(updateServiceImage)
.post(addServiceImage)

// imageRoutes.route('/habitats')
// .get(getHabitatsImages)

imageRoutes.route('/habitat/:id')
.post(addHabitatImage)

// imageRoutes.route('/animals')
// .get(getAnimalsImages)

imageRoutes.route('/animal/:id')
.post(addAnimalImage)

imageRoutes.route('/:id')
.get(getImage)
.delete(deleteImage)

export default imageRoutes
