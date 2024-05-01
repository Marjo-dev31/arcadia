import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYEMPLOYEES from "../query/employee.query.js";
import httpStatus from "../domain/httpstatus.js";


export const getEmployeeReports = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching reports`);
    database.query(QUERYEMPLOYEES.SELECT_REPORTS, [req.params.id], (error, results) => {
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
}

export const addEmployeeReport = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating report`);
  database.query(QUERYEMPLOYEES.CREATE_REPORT, Object.values(req.body),(error, results) => {
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