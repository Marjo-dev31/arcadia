import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import Response from './domain/response.js';
import httpStatus from './domain/httpstatus.js';
import logger from './util/logger.js';
import serviceRoutes from "./route/service.route.js";
import imageRoutes from "./route/image.route.js";
import habitatRoutes from "./route/habitat.route.js";
import reviewRoutes from "./route/review.route.js";
import animalsRoutes from "./route/animal.route.js";
import breedRoutes from "./route/breed.route.js";
import veterinaryRoutes from "./route/veterinary.route.js";
import userRoutes from "./route/user.route.js";
import employeeRoutes from "./route/employee.route.js";
import roleRoutes from "./route/role.route.js";
import loginRoutes from "./route/login.route.js";
import connectDB from "./config/mongodb.config.js";
import clickRoutes from "./route/click.route.js";
import openingRoutes from "./route/opening.route.js";
import sendRoutes from "./route/send.route.js";



dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

app.use(cors({ origin: ['http://localhost:4200', 'http://myangularbucket31.s3-website.eu-north-1.amazonaws.com' ]}));
app.use(express.json());
app.use(fileUpload());

app.use('/upload', express.static('src/upload'))


app.use('/services', serviceRoutes);
app.use('/images', imageRoutes);
app.use('/habitats', habitatRoutes);
app.use('/reviews', reviewRoutes);
app.use('/animals', animalsRoutes);
app.use('/breeds', breedRoutes);
app.use('/veterinaries', veterinaryRoutes);
app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);
app.use('/roles', roleRoutes);
app.use('/login', loginRoutes);
app.use('/click', clickRoutes);
app.use('/opening', openingRoutes);
app.use('/send', sendRoutes);

// app.use(require('body-parser').json());


app.get('/', (req, res)=> res.send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'Test API, all Systems Go')));
// app.all('*', (req, res)=> res.send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, 'Route does not exist on server')));


app.listen(PORT, () => {
    connectDB().then(()=> {
        logger.info(`It's alive on port: ${PORT}`);
    });
});