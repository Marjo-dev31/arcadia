import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYEMPLOYEES from "../query/habitat.query.js";
import httpStatus from "../domain/httpstatus.js";


export const getEmployeeReports = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching reports`);
    database.query(QUERYEMPLOYEES.SELECT_REPORTS, (error, results) => {
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
