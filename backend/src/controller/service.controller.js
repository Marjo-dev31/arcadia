import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/service.query.js";

const httpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export const getServices = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching services`);
  database.query(QUERY.SELECT_SERVICES, (error, results) => {
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
    database.query(QUERY.SELECT_SERVICE, [req.params.id], (error, results) => {
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
    database.query(QUERY.CREATE_SERVICE, Object.values(req.body),(error, results) => {
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
        req.body.id = uuidv4()
        const service = { ...req.body };

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
    database.query(QUERY.SELECT_SERVICE, [req.params.id], (error, results) => {
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
    database.query(QUERY.UPDATE_SERVICE, [...Object.values(req.body),req.params.id], (error, results) => {
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
    database.query(QUERY.DELETE_SERVICE, [req.params.id], (error, results) => {
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
