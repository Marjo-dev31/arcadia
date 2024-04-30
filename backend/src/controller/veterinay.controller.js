import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYVETERINARIES from "../query/veterinary.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getVeterinaryReports = (req, res)=> {
    logger.info(`${req.method} ${req.originalUrl}, fetching reports`);
    database.query(QUERYVETERINARIES.SELECT_REPORTS, (error, results) => {
      if (!results) {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `No reports found`,
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Reports retrieved`,
              { reports: results }
            )
            
          );
      }
    });
};

export const addVeterinaryReport = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating report`);
    database.query(QUERYVETERINARIES.CREATE_REPORT, Object.values(req.body),(error, results) => {
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
        const report = {...req.body};
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Habitat created`,
              { report }
            )
          );
      }
    });
}