import validator from "validator";
import Response from "../domain/response.js";
import httpStatus from "../domain/httpstatus.js";

export const checkPassword = (req, res, next) => {
    if (!validator.isStrongPassword(req.body.password, [{ minLength: 12 }])) {
        res.status(httpStatus.BAD_REQUEST.code).send(
            new Response(
                httpStatus.BAD_REQUEST.code,
                httpStatus.BAD_REQUEST.status,
                `Wrong pattern`
            )
        );
        return;
    }
    next();
};
