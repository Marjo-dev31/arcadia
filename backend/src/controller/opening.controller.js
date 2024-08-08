import Response from "../domain/response.js";
import logger from "../util/logger.js";
import httpStatus from "../domain/httpstatus.js";
import openingModel from "../models/opening.js";

export const getOpening = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching`);
    try {
        const openingToPublic = await openingModel.find();
        if (openingToPublic[0]) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.status,
                    httpStatus.OK.code,
                    "Opening retrieved",
                    openingToPublic
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `No opening found`
                )
            );
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(
                httpStatus.INTERNAL_SERVER_ERROR.code,
                httpStatus.INTERNAL_SERVER_ERROR.status,
                `Error occured`,
                error
            )
        );
    }
};

export const updateOpening = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating`);
    try {
        const opening = await openingModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(httpStatus.OK.code).send(
            new Response(
                httpStatus.OK.status,
                httpStatus.OK.code,
                "Opening retrieved",
                opening
            )
        );
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(
                httpStatus.INTERNAL_SERVER_ERROR.code,
                httpStatus.INTERNAL_SERVER_ERROR.status,
                `Error occured`
            )
        );
    }
};

// export const getOne = async (req, res) => {
//     try {
//         const opening = await openingModel.findById(req.params.id)
//         res.send(opening)
//     } catch (error) {
//         res.status(500).send({error})
//     }
// }
