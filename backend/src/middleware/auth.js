import jwt from 'jsonwebtoken';
import httpStatus from '../domain/httpstatus.js';
import Response from "../domain/response.js";



const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // push accesstoken in headers - authorization = Bearer+ ' '+token
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        res
        .status(httpStatus.BAD_REQUEST.code)
        .send(
            new Response(
                httpStatus.BAD_REQUEST.code,
                httpStatus.BAD_REQUEST.status,
                `Access denied!`
            )
        )
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, response) => {
        if(err) {
            return res.sendStatus(401);
        }
        req.user = response
        next()
    } );
    return {success: true, data: req.user}
}

export default authenticateToken