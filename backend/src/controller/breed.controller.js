import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYBREEDS from "../query/breed.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getBreed = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching breeds`);
    database.query(QUERYBREEDS.SELECT_BREEDS, (error, results) => {
      if (!results[0]) {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `No breed found`,
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Breeds retrieved`,
              results
            )
            
          );
      }
    });
}

export const addBreed = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating breed`);
  database.query(QUERYBREEDS.CREATE_BREED, Object.values(req.body), (error, results) => {
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
      const breed = {...req.body};
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Breed created`,
              breed
            )
          );
      }
  })
}