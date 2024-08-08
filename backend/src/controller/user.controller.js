import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYUSERS from "../query/user.query.js";
import httpStatus from "../domain/httpstatus.js";
import bcrypt from "bcrypt";

export const getUsers = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    database.query(QUERYUSERS.SELECT_USERS, (error, results) => {
        if (!results) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `No users found`
                )
            );
        } else {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Users retrieved`,
                    results
                )
            );
        }
    });
};

export const addUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, searching user`);
    database.query(
        QUERYUSERS.SELECT_USER,
        [req.body.email],
        (error, results) => {
            if (error) {
                logger.error(error.message);
                res.status(httpStatus.INTERNAL_SERVER_ERROR.code).send(
                    new Response(
                        httpStatus.INTERNAL_SERVER_ERROR.code,
                        httpStatus.INTERNAL_SERVER_ERROR.status,
                        `Error occured`
                    )
                );
            }
            if (results[0]) {
                res.status(httpStatus.OK.code).send(
                    new Response(
                        httpStatus.OK.code,
                        httpStatus.OK.status,
                        "User already exist"
                    )
                );
            } else {
                logger.info(`${req.method} ${req.originalUrl}, creating user`);
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    database.query(
                        QUERYUSERS.CREATE_USER,
                        [
                            req.body.firstname,
                            req.body.lastname,
                            req.body.email,
                            hash,
                            req.body.id_role,
                        ],
                        (error, results) => {
                            if (!results) {
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
                            } else {
                                const user = { ...req.body };
                                res.status(httpStatus.CREATED.code).send(
                                    new Response(
                                        httpStatus.CREATED.code,
                                        httpStatus.CREATED.status,
                                        `User created`,
                                        user
                                    )
                                );
                            }
                        }
                    );
                });
            }
        }
    );
};

export const updatePassword = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`);
    database.query(
        QUERYUSERS.SELECT_USER,
        [req.body.email],
        (error, results) => {
            if (!results) {
                res.status(httpStatus.NOT_FOUND.code).send(
                    new Response(
                        httpStatus.NOT_FOUND.code,
                        httpStatus.NOT_FOUND.status,
                        `User was not found !`
                    )
                );
            } else {
                logger.info(`${req.method} ${req.originalUrl}, updating user`);
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    database.query(
                        QUERYUSERS.UPDATE_USER_PASSWORD,
                        [hash, req.body.email],
                        (error, results) => {
                            if (!error) {
                                res.status(httpStatus.OK.code).send(
                                    new Response(
                                        httpStatus.OK.code,
                                        httpStatus.OK.status,
                                        `User updated`
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
                });
            }
        }
    );
};
