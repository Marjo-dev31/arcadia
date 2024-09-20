import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYEMPLOYEES from "../query/employee.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getEmployeeReportsByAnimal = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching reports`);
    database.query(
        QUERYEMPLOYEES.SELECT_REPORTS,
        [req.params.id],
        (results) => {
            if (!results[0]) {
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.OK.code,
                        httpStatus.OK.status,
                        `No reports found`
                    )
                );
            } else {
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.OK.code,
                        httpStatus.OK.status,
                        `Reports retrieved`,
                        results
                    )
                );
            }
        }
    );
};

export const addEmployeeReport = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating report`);
    database.query(
        QUERYEMPLOYEES.CREATE_REPORT,
        Object.values(req.body),
        (error, results) => {
            if (!results) {
                logger.error(error.message);
                res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
                    new Response(
                        httpStatus.INTERNAL_SERVER_ERROR.code,
                        httpStatus.INTERNAL_SERVER_ERROR.status,
                        `Error occured`
                    )
                );
            } else {
                const report = { ...req.body };
                res.status(httpStatus.CREATED.code).send(
                    new Response(
                        httpStatus.CREATED.code,
                        httpStatus.CREATED.status,
                        `Report created`,
                        report
                    )
                );
            }
        }
    );
};

export const updateEmployeeReport = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching report`);
    database.query(
        QUERYEMPLOYEES.SELECT_REPORT,
        [req.params.id],
        (results) => {
            if (!results) {
                res.status(httpStatus.NOT_FOUND.code).send(
                    new Response(
                        httpStatus.NOT_FOUND.code,
                        httpStatus.NOT_FOUND.status,
                        `Report by id ${req.params.id} was not found !`
                    )
                );
            } else {
                logger.info(
                    `${req.method} ${req.originalUrl}, updating report`
                );
                database.query(
                    QUERYEMPLOYEES.UPDATE_REPORT,
                    [...Object.values(req.body), req.params.id],
                    (error, results) => {
                        if (!error) {
                            res.status(httpStatus.OK.code).send(
                                new Response(
                                    httpStatus.OK.code,
                                    httpStatus.OK.status,
                                    `Report updated`,
                                    { ...req.body }
                                )
                            );
                        } else {
                            logger.error(error.message);
                            res.status(
                                httpStatus.INTERNAL_SERVER_ERROR.code
                            ).send(
                                new Response(
                                    httpStatus.INTERNAL_SERVER_ERROR.code,
                                    httpStatus.INTERNAL_SERVER_ERROR.status,
                                    `Error occured`
                                )
                            );
                        }
                    }
                );
            }
        }
    );
};

export const deleteEmployeeReport = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting report`);
    database.query(
        QUERYEMPLOYEES.DELETE_REPORT,
        [req.params.id],
        (results) => {
            if (results.affectedRows > 0) {
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.OK.code,
                        httpStatus.OK.status,
                        `Report deleted`,
                        results[0]
                    )
                );
            } else {
                res.status(httpStatus.NOT_FOUND.code).send(
                    new Response(
                        httpStatus.NOT_FOUND.code,
                        httpStatus.NOT_FOUND.status,
                        `Report by id ${req.params.id} was not found !`
                    )
                );
            }
        }
    );
};
