import database from "../config/mysql.config.js";
import QUERYIMAGES from "../query/image.query.js";
import logger from "../util/logger.js";
import Response from "../domain/response.js";
import httpStatus from "../domain/httpstatus.js";




// read delete images

// export const getImages = (req, res) => {
//   logger.info(`${req.method} ${req.originalUrl}, fetching images `);
//   database.query(QUERYIMAGES.SELECT_IMAGES, (error, results) => {
//     if (!results[0]) {
//       res
//         .status(httpStatus.OK.code)
//         .send(
//           new Response(
//             httpStatus.OK.code,
//             httpStatus.OK.status,
//             `No images found`
//           )
//         );
//     } else {
//       res
//         .status(httpStatus.OK.code)
//         .send(
//           new Response(
//             httpStatus.OK.code,
//             httpStatus.OK.status,
//             `Images retrieved`,
//             { images: results }
//           )
//         );
//     }
//   });
// };

// export const getImage = (req, res) => {
//   logger.info(`${req.method} ${req.originalUrl}, fetching image `);
//   database.query(
//     QUERYIMAGES.SELECT_IMAGE,
//     [req.params.id],
//     (error, results) => {
//       if (!results[0]) {
//         res
//           .status(httpStatus.NOT_FOUND.code)
//           .send(
//             new Response(
//               httpStatus.NOT_FOUND.code,
//               httpStatus.NOT_FOUND.status,
//               `Image by id ${req.params.id} was not found !`
//             )
//           );
//       } else {
//         res
//           .status(httpStatus.OK.code)
//           .send(
//             new Response(
//               httpStatus.OK.code,
//               httpStatus.OK.status,
//               `Image retrieved`,
//               results
//             )
//           );
//       }
//     }
//   );
// };

export const deleteImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, deleting image`);
    database.query(QUERYIMAGES.DELETE_IMAGE, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) { 
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Image deleted`,
              results[0]
            )
          );
      } else {
        res
          .status(httpStatus.NOT_FOUND.code)
          .send(
            new Response(
              httpStatus.NOT_FOUND.code,
              httpStatus.NOT_FOUND.status,
              `Image by id ${req.params.id} was not found !`
            )
          );
      }
    });
}


// create, update, read images-services


export const addServiceImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating image `);
  const file = req.files.myImg
  const filename = file.name
  database.query(
    QUERYIMAGES.CREATE_IMAGE_SERVICE,
    [filename, req.params.id],
    (error, results) => {
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
        const image = { 
          imageName: filename,
          serviceId: req.params.id
         };
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Image created`,
              { image }
            )
          );
      }
    }
  );
};

export const addHabitatImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating image `);
  const file = req.files.myImg
  const filename = file.name
  database.query(
    QUERYIMAGES.CREATE_IMAGE_HABITAT,
    [filename, req.params.id],
    (error, results) => {
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
        const image = { 
          imageName: filename,
          habitatId: req.params.id
         };
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Image created`,
              { image }
            )
          );
      }
    }
  );
}

//read create animal image

// export const getAnimalsImages = (req, res) => {
//   logger.info(`${req.method} ${req.originalUrl}, fetching images list `);
//   database.query(QUERYIMAGES.SELECT_ANIMALS_IMAGES, (error, results) => {
//     if (!results[0]) {
//       res
//         .status(httpStatus.OK.code)
//         .send(
//           new Response(
//             httpStatus.OK.code,
//             httpStatus.OK.status,
//             `No images found`
//           )
//         );
//     } else {
//       res
//         .status(httpStatus.OK.code)
//         .send(
//           new Response(
//             httpStatus.OK.code,
//             httpStatus.OK.status,
//             `Images retrieved`,
//             { images: results }
//           )
//         );
//     }
//   });
// };

export const addAnimalImage = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, creating image `);
  const file = req.files.myImg
  const filename = file.name
  database.query(
    QUERYIMAGES.CREATE_IMAGE_ANIMAL,
    [filename, req.params.id],
    (error, results) => {
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
        const image = { 
          imageName: filename,
          animalId: req.params.id
         };
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Image created`,
              { image }
            )
          );
      }
    }
  );
}