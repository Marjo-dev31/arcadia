import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYREVIEWS from "../query/review.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getAllReviews = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching reviews`);
    database.query(QUERYREVIEWS.SELECT_REVIEWS, (error, results) => {
      if (!results) {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `No reviews found`,
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Reviews retrieved`,
              results
            )
          );
      }
    });
  };

  export const getReviews = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching reviews`);
    database.query(QUERYREVIEWS.SELECT_REVIEWS_TRUE, (error, results) => {
      if (!results) {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `No reviews found`,
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Reviews retrieved`,
              results
            )
          );
      }
    });
  };

  export const addReview = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating review`);
    database.query(QUERYREVIEWS.CREATE_REVIEW, Object.values(req.body),(error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              httpStatus.INTERNAL_SERVER_ERROR.code,
              httpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occured`
            )
          );
      } else {
        const review = {...req.body};
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Review created`,
              { review }
            )
          );
      }
    });
};

export const updateReview = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching review`);
  database.query(QUERYREVIEWS.SELECT_REVIEW, [req.params.id], (error, results) => {
    if (!results) {
      res
      .status(httpStatus.NOT_FOUND.code)
      .send(
        new Response(
          httpStatus.NOT_FOUND.code,
          httpStatus.NOT_FOUND.status,
          `Review by id ${req.params.id} was not found !`
        )
      );
    } else {
      logger.info(`${req.method} ${req.originalUrl}, updating review`);
      database.query(QUERYREVIEWS.UPDATE_REVIEW_STATUS, [req.body.status, req.body.id_employee, req.params.id], (error, results) => {
    if(!error) {
          res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Review updated`,
            {result: req.body}))
      } else {
          logger.error(error.message)
          res.status(httpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              httpStatus.INTERNAL_SERVER_ERROR.code,
              httpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occured`
            )
          );
      }   
    })
}})};
