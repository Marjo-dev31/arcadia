import jwt from "jsonwebtoken";
import httpStatus from "../domain/httpstatus.js";
import Response from "../domain/response.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // get accesstoken in headers - authorization and split to get only token char
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res
      .status(httpStatus.BAD_REQUEST.code)
      .send(
        new Response(
          httpStatus.BAD_REQUEST.code,
          httpStatus.BAD_REQUEST.status,
          `Access denied! No token`
        )
      );
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, response) => {
    if (err) {
      res
        .status(httpStatus.BAD_REQUEST.code)
        .send(
          new Response(
            httpStatus.BAD_REQUEST.code,
            httpStatus.BAD_REQUEST.status,
            `Access denied! Wrong token`
          )
        );
        return
    }

    // res.send({success: true, response})
    //   .status(httpStatus.OK.code)
    //   .send(
    //     new Response(
    //       httpStatus.OK.code,
    //       httpStatus.OK.status,
    //       "Access authorized",
    //       { success: true, response}
    //     )
    //   );
    


    next()
  });

};

export default authenticateToken;
