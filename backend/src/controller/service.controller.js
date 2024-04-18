import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYSERVICES from "../query/service.query.js";
import httpStatus from "../domain/httpstatus.js";


export const getServices = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching services`);
  database.query(QUERYSERVICES.SELECT_SERVICES, (error, results) => {
    if (!results) {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `No services found`
          )
        );
    } else {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Services retrieved`,
            { services: results }
          )
        );
    }
  });
};


export const getService = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching service`);
    database.query(QUERYSERVICES.SELECT_SERVICE, [req.params.id], (error, results) => {
      if (!results) {
        res
          .status(httpStatus.NOT_FOUND.code)
          .send(
            new Response(
              httpStatus.NOT_FOUND.code,
              httpStatus.NOT_FOUND.status,
              `Service by id ${req.params.id} was not found !`
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Service retrieved`,
              results[0]
            )
          );
      }
    });
  };



export const addService = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating service`);
    database.query(QUERYSERVICES.CREATE_SERVICE, Object.values(req.body),(error, results) => {
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
        const service = {...req.body};
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Services created`,
              { service }
            )
          );
      }
    });
  };


  export const updateService = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching service`);
    database.query(QUERYSERVICES.SELECT_SERVICE, [req.params.id], (error, results) => {
      if (!results[0]) {
        res
        .status(httpStatus.NOT_FOUND.code)
        .send(
          new Response(
            httpStatus.NOT_FOUND.code,
            httpStatus.NOT_FOUND.status,
            `Service by id ${req.params.id} was not found !`
          )
        );
      } else {
        logger.info(`${req.method} ${req.originalUrl}, updating service`);
        console.log(req.body, req.params.id, 'toto');
    database.query(QUERYSERVICES.UPDATE_SERVICE, [...Object.values(req.body), req.params.id], (error, results) => {
        if(!error) {
            res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Service updated`,
              {id: req.params.id, ...req.body}))
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
  }})};


  export const deleteService = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting service`);
    database.query(QUERYSERVICES.DELETE_SERVICE, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) { 
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Service deleted`,
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
              `Service by id ${req.params.id} was not found !`
            )
          );
      }
    });
  };


export default httpStatus;
