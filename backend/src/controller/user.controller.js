import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYUSERS from "../query/user.query.js";
import httpStatus from "../domain/httpstatus.js";


export const getUsers = (req, res)=> {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    database.query(QUERYUSERS.SELECT_USERS, (error, results) => {
      if (!results[0]) {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `No users found`
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Users retrieved`,
              { users: results }
            )
          );
      }
    });
}