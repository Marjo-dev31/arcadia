import Response from "../domain/response.js";
import logger from "../util/logger.js";
import httpStatus from "../domain/httpstatus.js";
import animalModel from "../models/animals.js";

// export const getAnimalByFirstname = async (req, res) => {
//   logger.info(`${req.method} ${req.originalUrl}, fetching animal`);
//   try {
//     const animal = await animalModel.findOne({
//       firstname: req.params.firstname,
//     });
//     res
//         .status(httpStatus.OK.code)
//         .send(
//             new Response(
//                 httpStatus.OK.code,
//                 httpStatus.OK.status,
//                 `Animal retrieved`,
//                 { animal: animal}
//             )
//         );
//   } catch (error) {
//     logger.error(error.message);
//         res
//           .status(httpStatus.INTERNAL_SERVER_ERROR.code)
//           .send(
//             new Response(
//               httpStatus.INTERNAL_SERVER_ERROR.code,
//               httpStatus.INTERNAL_SERVER_ERROR.status,
//               `Error occured`
//             )
//           );
//   }
// };

export const addCount = async (req, res) => {
    const firstname = req.params.firstname
    const query =  { firstname: { $eq: firstname} }
    logger.info(`${req.method} ${req.originalUrl}, updating count`);
    try {
        const animal = await animalModel.updateOne(
            query,
            { $inc: { clickCount: 1 } }
        );
        res.status(httpStatus.OK.code).send(
            new Response(
                httpStatus.OK.code,
                httpStatus.OK.status,
                `Animal updated`,
                { animal: animal }
            )
        );
    } catch (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(
                httpStatus.INTERNAL_SERVER_ERROR.code,
                httpStatus.INTERNAL_SERVER_ERROR.status,
                `Error occured`
            )
        );
    }
};

export const getAnimals = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching animals`);
    try {
        const animals = await animalModel.find();
        if (!animals[0]) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `No animal found`
                )
            );
        }
        res.status(httpStatus.OK.code).send(
            new Response(
                httpStatus.OK.code,
                httpStatus.OK.status,
                `Animals retrieved`,
                animals
            )
        );
    } catch (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(
                httpStatus.INTERNAL_SERVER_ERROR.code,
                httpStatus.INTERNAL_SERVER_ERROR.status,
                `Error occured`
            )
        );
    }
};

export const addAnimalOnMongo = async (req, res) => {
    const firstname = req.body.firstname
    logger.info(`${req.method} ${req.originalUrl}, creating animal`);
    try {
        const animal = await animalModel.create({
            firstname: firstname,
            clickCount: 0,
        });
        res.status(httpStatus.OK.code).send(
            new Response(
                httpStatus.OK.code,
                httpStatus.OK.status,
                `Animal created`,
                { animal: animal }
            )
        );
    } catch (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(
                httpStatus.INTERNAL_SERVER_ERROR.code,
                httpStatus.INTERNAL_SERVER_ERROR.status,
                `Error occured`
            )
        );
    }
};

export const deleteAnimalOnMongo = async (req, res) => {
    const id = req.params.id
    logger.info(`${req.method} ${req.originalUrl}, deleting animal`);
    try {
        const animal = await animalModel.findByIdAndDelete({
            _id: id,
        })
        res.status(httpStatus.OK.code).send(
            new Response(
                httpStatus.OK.code,
                httpStatus.OK.status,
                `Animal deleted`
            )
        );
    } catch (error) {
        logger.error(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(
                httpStatus.INTERNAL_SERVER_ERROR.code,
                httpStatus.INTERNAL_SERVER_ERROR.status,
                `Error occured`
            )
        );
    }
};
