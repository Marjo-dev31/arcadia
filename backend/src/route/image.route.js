import express from "express";
import { addServiceImage, getHabitatsImages, getImage, getImages, getServicesImages, updateServiceImage } from "../controller/image.controller.js";



const imageRoutes = express.Router();

imageRoutes.route('/')
.get(getImages)


imageRoutes.route('/services')
.get(getServicesImages)


imageRoutes.route('/service/:id')
.put(updateServiceImage)
.post(addServiceImage)

imageRoutes.route('/habitats')
.get(getHabitatsImages)

imageRoutes.route('/:id')
.get(getImage)

export default imageRoutes
