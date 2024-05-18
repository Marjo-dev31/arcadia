import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYANIMALS from "../query/animal.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getAnimals = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching animals`);
    database.query(QUERYANIMALS.SELECT_ANIMALS, (error, results) => {
      if (!results) {
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

export const getAnimal = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching animal`);
  database.query(QUERYANIMALS.SELECT_ANIMAL, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(httpStatus.NOT_FOUND.code)
        .send(
          new Response(
            httpStatus.NOT_FOUND.code,
            httpStatus.NOT_FOUND.status,
            `Animal by id ${req.params.id} was not found !`
          )
        );
    } else {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Animal retrieved`,
            results[0]
          )
        );
    }
  });
};


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

export const deleteAnimal = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting animal`);
    database.query(QUERYANIMALS.DELETE_ANIMAL, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) { 
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Animal deleted`,
              results[0]
            )
          );
      } else {
        res
          .status(httpStatus.NOT_FOUND.code)
          .send(
            new Response(
              httpStatus.NOT_FOUND.code,
              httpStatus.NOT_FOUND.status,
              `Animal by id ${req.params.id} was not found !`
            )
          );
      }
    });
}

export const updateAnimal = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching animal`);
  database.query(QUERYANIMALS.SELECT_ANIMAL, [req.params.id], (error, results) => {
    if (!results) {
      res
      .status(httpStatus.NOT_FOUND.code)
      .send(
        new Response(
          httpStatus.NOT_FOUND.code,
          httpStatus.NOT_FOUND.status,
          `Animal by id ${req.params.id} was not found !`
        )
      );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating animal`);
      database.query(QUERYANIMALS.UPDATE_ANIMAL, [...Object.values(req.body), req.params.id], (error, results) => {
  
    if(!error) {
          res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Habitat updated`,
            {...req.body}))
      } else {
          logger.error(error.message)
          res.status(httpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              httpStatus.INTERNAL_SERVER_ERROR.code,
              httpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occured`
            )
          );
      }   
    })
}})
};

export const getAnimalsByHabitat = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching animals by habitat`);
    database.query(QUERYANIMALS.SELECT_ANIMALS_HABITAT, [req.params.id], (error, results) => {
      if (!results) {
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