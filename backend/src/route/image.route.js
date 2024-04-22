import express from "express";
import { addImage } from "../controller/image.controller.js";


const imageRoutes = express.Router();

imageRoutes.route('/')
.post(addImage);


export default imageRoutes
