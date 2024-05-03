// import Response from "../domain/response.js";
import logger from "../util/logger.js";
// import httpStatus from "../domain/httpstatus.js";
import animalModel from "../models/animals.js"


export const getAnimalByFirstname = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching animal`);
    try {
    const animal = await animalModel.findOne({firstname: req.params.firstname});
    console.log('Animal retrieve', req.params.firstname, animal)
    res.send(animal)
} catch (error) {
    res.status(500).send({error})
}
}

export const addCount = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, update count`);
    try {
        const animal = await animalModel.updateOne({firstname: req.params.firstname},{$inc: {"clickCount": 1}})
    } catch(error) {
        res.status(500).send({error})
    }
}

export const getAnimals= async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching animals`);
    try {
    const animals = await animalModel.find();
    console.log('Animals retrieved')
    res.send(animals)
} catch (error) {
    res.status(500).send({error})
}
}