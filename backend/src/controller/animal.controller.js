import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYANIMALS from "../query/animal.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getAnimals = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching animals`);
    database.query(QUERYANIMALS.SELECT_ANIMALS, (error, results) => {
      if (!results[0]) {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `No animals found`,
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Animals retrieved`,
              { animals: results }
            )
            
          );
      }
    });
}

export const addAnimal = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating animal`);
    database.query(QUERYANIMALS.CREATE_ANIMAL, Object.values(req.body),(error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              httpStatus.INTERNAL_SERVER_ERROR.code,
              httpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occured`
            )
          );
      } else {
        const animal = {...req.body};
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Animal created`,
              { animal }
            )
          );
      }
    });
}