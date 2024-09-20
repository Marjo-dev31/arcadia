import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYROLES from "../query/role.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getRolesWithoutAdmin = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching roles`);
    database.query(QUERYROLES.SELECT_ROLES_WITHOUT_ADMIN, (results) => {
        if (!results[0]) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `No roles found`
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Roles retrieved`,
                    results
                )
            );
        }
    });
};
