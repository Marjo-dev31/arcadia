import jwt from "jsonwebtoken";
import httpStatus from "../domain/httpstatus.js";
import Response from "../domain/response.js";

const authenticateToken = (req, res, next) => {
    // const authHeader = req.headers["authorization"];
    // get accesstoken in headers - authorization and split to get only token char
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookies.accessToken
    console.log(token)
    if (!token) {
        res.status(httpStatus.BAD_REQUEST.code).send(
            new Response(
                httpStatus.BAD_REQUEST.code,
                httpStatus.BAD_REQUEST.status,
                `Access denied! No token`
            )
        );
        return
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, response) => {
        if (err) {
            res.status(httpStatus.BAD_REQUEST.code).send(
                new Response(
                    httpStatus.BAD_REQUEST.code,
                    httpStatus.BAD_REQUEST.status,
                    `Access denied! Wrong token`
                )
            );
            return;
        }
        const role = response.role;
        req["role"] = role;
        next();
    });
};

export default authenticateToken;
