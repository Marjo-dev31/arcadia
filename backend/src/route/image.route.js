import express from "express";
import { addImage, getImage, getImages } from "../controller/image.controller.js";


const imageRoutes = express.Router();

imageRoutes.route('/')
.get(getImages)
.post(addImage);

imageRoutes.route('/:id')
.get(getImage)


export default imageRoutes
