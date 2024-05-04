// import Response from "../domain/response.js";
import logger from "../util/logger.js";
// import httpStatus from "../domain/httpstatus.js";
import openingModel from '../models/opening.js'



export const getOpening = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching`)
    try {
        const openingToPublic = await openingModel.find()
        console.log(openingToPublic)
        res.send(openingToPublic)
    } catch(error) {
        console.log('An error occured!')
        res.status(500).send({error})
    }
}


export const updateOpening = async (req, res) =>{
    logger.info(`${req.method} ${req.originalUrl}, updating`)
    try {
        const opening = await openingModel.findByIdAndUpdate(req.params.id, req.body)
        res.send(req.body)
    } catch(error) {
        res.status(500).send({error})
    }
}

// export const getOne = async (req, res) => {
//     try {
//         const opening = await openingModel.findById(req.params.id)
//         res.send(opening)
//     } catch (error) {
//         res.status(500).send({error})
//     }
// }
