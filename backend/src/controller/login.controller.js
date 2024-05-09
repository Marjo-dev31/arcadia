import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYUSERS from "../query/user.query.js";
import httpStatus from "../domain/httpstatus.js";
import bcrypt from 'bcrypt'
import generatedAccessToken from "../util/jwt.js";


export const login =  (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}`);
    const { email, password } = req.body;
     database.query(QUERYUSERS.SELECT_USER, [email], async (error, results)=> {
        if (results<1) {
            res
            .status(httpStatus.NOT_FOUND.code)
            .send(
              new Response(
                httpStatus.NOT_FOUND.code,
                httpStatus.NOT_FOUND.status,
                `User doesn't exists`
              )
            );
           
    } else {
        const user = results[0];
        const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
            res
            .status(httpStatus.BAD_REQUEST.code)
            .send(
                new Response(
                    httpStatus.BAD_REQUEST.code,
                    httpStatus.BAD_REQUEST.status,
                    `Email and password does not match!`
                )
            )
          
            } else {
            const accessToken = generatedAccessToken(user.email, user.name)
            res
            .status(httpStatus.OK.code)
            .send(
                new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `User is log in`,
                    {user, accessToken}
                )
            )
        }
       }})
}
