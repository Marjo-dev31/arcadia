import express from "express";
import { addServiceImage, getImage, getImages, getServicesImages, updateServiceImage } from "../controller/image.controller.js";


const imageRoutes = express.Router();

imageRoutes.route('/')
.get(getImages)

imageRoutes.route('/services')
.get(getServicesImages)
.post(addServiceImage)

imageRoutes.route('/service/:id')
.put(updateServiceImage)

imageRoutes.route('/:id')
.get(getImage)


export default imageRoutes
