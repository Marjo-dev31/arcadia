import express from "express";
import dotenv from "dotenv";
import ip from 'ip';
import cors from 'cors';
import uuidv4 from 'uuidv4';
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



dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(fileUpload());

app.use('/upload', express.static('src/upload'))


app.use('/services', serviceRoutes);
app.use('/images', imageRoutes);
app.use('/habitats', habitatRoutes);
app.use('/reviews', reviewRoutes);
app.use('/animals', animalsRoutes);
app.use('/breeds', breedRoutes);
app.use('/veterinaries', veterinaryRoutes)
app.use('/users', userRoutes)

// app.use(require('body-parser').json());


// const animals = [
//   {
//     id: 1,
//     firstname: "animal1",
//     condition: "bon",
//     race: "gazelle",
//     image: "",
//     veterinarycomments: [],
//     employeecomments: []
//   },
//   {
//     id:2,
//     firstname: "animal2",
//     condition: "mauvais",
//     race: "lion",
//     rapport: "chichi",
//     image: "",
//     veterinarycomments: [],
//     employeecomments: []
//   },
// ];

// app.get("/animal", (req, res) => {
//   res.json(animals);
// });



app.get('/', (req, res)=> res.send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'Test API, all Systems Go')));
// app.all('*', (req, res)=> res.send(new Response(httpStatus.NOT_FOUND.code, httpStatus.NOT_FOUND.status, 'Route does not exist on server')));


app.listen(PORT, () => logger.info(`It's alive on: ${ip.address()}: ${PORT}`));
