// import Response from "../domain/response.js";
import logger from "../util/logger.js";
// import httpStatus from "../domain/httpstatus.js";
import animalModel from "../models/animals.js"


export const getAnimalByFirstname = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching animal`);
    try {
    const animal = await animalModel.findOne({firstname: req.params.firstname});
    console.log('animal trouve', req.params.firstname, animal)
    res.send(animal)
} catch (error) {
    res.status(500).send({error})
}
}