import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYUSERS from "../query/user.query.js";
import httpStatus from "../domain/httpstatus.js";
import bcrypt from "bcrypt";
import generatedAccessToken from "../util/jwt.js";

export const login = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    const { email, password } = req.body;
    database.query(QUERYUSERS.SELECT_USER, [email], async (results) => {
        if (results < 1) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `User doesn t exists`
                )
            );
            return;
        }

        const user = results;
        const passwordIsValid = await bcrypt.compare(password, user[0].password);
        if (!passwordIsValid) {
            res.status(httpStatus.OK.code).send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Email and password does not match!`
                )
            );
            return;
        }
        const accessToken = generatedAccessToken(user[0].email, user[0].role);
        const currentUser = {
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            role: user[0].role,
            accessToken: accessToken
        }

        res.status(httpStatus.OK.code).send(
            new Response(
                httpStatus.OK.code,
                httpStatus.OK.status,
                `User is log in`,
                [currentUser]
            )
        );
    });
};
