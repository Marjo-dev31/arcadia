import database from "../config/mysql.config.js";
import QUERYIMAGES from "../query/image.query.js";
import logger from "../util/logger.js";
import Response from "../domain/response.js";
import httpStatus from "../domain/httpstatus.js";

export const getServicesImages = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching images list `);
  database.query(QUERYIMAGES.SELECT_SERVICES_IMAGES, (error, results) => {
    if (!results) {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `No images found`
          )
        );
    } else {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Images retrieved`,
            { images: results }
          )
        );
    }
  });
};

export const addServiceImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating image `);

  console.log(req.files.myImg)
const file = req.files.myImg;
const uploadPath = '../images.upload/' + file.name;

console.log(file, uploadPath)

file.mv(uploadPath, function(err) {
  if(err){
    return exports.status(500).send(err);
  } else {
    res.send('File uploaded')
  }
})


  logger.info(req.params.id)

  // database.query(
  //   QUERYIMAGES.CREATE_IMAGE_SERVICE,
  //   Object.values(req.body),
  //   (error, results) => {
  //     if (!results) {
  //       logger.error(error.message);
  //       res
  //         .status(httpStatus.INTERNAL_SERVER_ERROR.code)
  //         .send(
  //           new Response(
  //             httpStatus.INTERNAL_SERVER_ERROR.code,
  //             httpStatus.INTERNAL_SERVER_ERROR.status,
  //             `Error occured`
  //           )
  //         );
  //     } else {
  //       const image = { ...req.body };
  //       res
  //         .status(httpStatus.CREATED.code)
  //         .send(
  //           new Response(
  //             httpStatus.CREATED.code,
  //             httpStatus.CREATED.status,
  //             `Image created`,
  //             { image }
  //           )
  //         );
  //     }
  //   }
  // );
};

export const updateServiceImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching image `);
  database.query(
    QUERYIMAGES.SELECT_IMAGE,
    [req.params.id],
    (error, results) => {
      console.log(results);
      if (!results[0]) {
        res
          .status(httpStatus.NOT_FOUND.code)
          .send(
            new Response(
              httpStatus.NOT_FOUND.code,
              httpStatus.NOT_FOUND.status,
              `Image by id ${req.params.id} was not found !`
            )
          );
      } else {
        logger.info(`${req.method} ${req.originalUrl}, updating image`);
        database.query(
          QUERYIMAGES.UPDATE_SERVICE_IMAGE,
          [...Object.values(req.body), req.params.id],
          (error, results) => {
            if (!error) {
              res
                .status(httpStatus.OK.code)
                .send(
                  new Response(
                    httpStatus.OK.code,
                    httpStatus.OK.status,
                    `Image updated`,
                    { ...req.body }
                  )
                );
            } else {
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
            }
          }
        );
      }
    }
  );
};

export const getImages = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching images `);
  database.query(QUERYIMAGES.SELECT_IMAGES, (error, results) => {
    if (!results) {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `No images found`
          )
        );
    } else {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Images retrieved`,
            { images: results }
          )
        );
    }
  });
};

export const getImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching image `);
  database.query(
    QUERYIMAGES.SELECT_IMAGE,
    [req.params.id],
    (error, results) => {
      if (!results) {
        res
          .status(httpStatus.NOT_FOUND.code)
          .send(
            new Response(
              httpStatus.NOT_FOUND.code,
              httpStatus.NOT_FOUND.status,
              `Image by id ${req.params.id} was not found !`
            )
          );
      } else {
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Image retrieved`,
              results[0]
            )
          );
      }
    }
  );
};
