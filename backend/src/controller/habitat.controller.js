import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERYHABITATS from "../query/habitat.query.js";
import httpStatus from "../domain/httpstatus.js";

export const getHabitats = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching habitats`);
  database.query(QUERYHABITATS.SELECT_HABITATS, (error, results) => {
    if (!results) {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `No habitats found`,
          )
        );
    } else {
      res
        .status(httpStatus.OK.code)
        .send(
          new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            `Habitats retrieved`,
            { habitats: results }
          )
          
        );
    }
  });
};

// export const getHabitat = (req, res) => {
//     logger.info(`${req.method} ${req.originalUrl}, fetching habitat`);
//     database.query(QUERYHABITATS.SELECT_HABITAT, [req.params.id], (error, results) => {
//       if (!results[0]) {
//         res
//           .status(httpStatus.NOT_FOUND.code)
//           .send(
//             new Response(
//               httpStatus.NOT_FOUND.code,
//               httpStatus.NOT_FOUND.status,
//               `Habitat by id ${req.params.id} was not found !`
//             )
//           );
//       } else {
//         res
//           .status(httpStatus.OK.code)
//           .send(
//             new Response(
//               httpStatus.OK.code,
//               httpStatus.OK.status,
//               `Habitat retrieved`,
//               results[0]
//             )
//           );
//       }
//     });
// };

export const addHabitat = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating habitat`);
    database.query(QUERYHABITATS.CREATE_HABITAT, Object.values(req.body),(error, results) => {
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
        const habitat = {...req.body};
        res
          .status(httpStatus.CREATED.code)
          .send(
            new Response(
              httpStatus.CREATED.code,
              httpStatus.CREATED.status,
              `Habitat created`,
              { habitat }
            )
          );
      }
    });
};

export const updateHabitat = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching habitat`);
    database.query(QUERYHABITATS.SELECT_HABITAT, [req.params.id], (error, results) => {
      if (!results[0]) {
        res
        .status(httpStatus.NOT_FOUND.code)
        .send(
          new Response(
            httpStatus.NOT_FOUND.code,
            httpStatus.NOT_FOUND.status,
            `Habitat by id ${req.params.id} was not found !`
          )
        );
      } else {
        logger.info(`${req.method} ${req.originalUrl}, updating habitat`);
        database.query(QUERYHABITATS.UPDATE_HABITAT, [...Object.values(req.body), req.params.id], (error, results) => {
    
      if(!error) {
            res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Habitat updated`,
              {...req.body}))
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
  }})
};

export const deleteHabitat = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting habitat`);
    database.query(QUERYHABITATS.DELETE_HABITAT, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) { 
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Habitat deleted`,
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
              `Habitat by id ${req.params.id} was not found !`
            )
          );
      }
    });
};


export const addComment = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching habitat`);
    database.query(QUERYHABITATS.SELECT_HABITAT, [req.params.id], (error, results) => {
      if (!results[0]) {
        res
        .status(httpStatus.NOT_FOUND.code)
        .send(
          new Response(
            httpStatus.NOT_FOUND.code,
            httpStatus.NOT_FOUND.status,
            `Habitat by id ${req.params.id} was not found !`
          )
        );
      } else {
        logger.info(`${req.method} ${req.originalUrl}, creating comment`);
        database.query(QUERYHABITATS.CREATE_COMMENT_HABITAT, [...Object.values(req.body), req.params.id], (error, results) => {
    
      if(!error) {
            res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Comment created`,
              {...req.body}))
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
  }})
}

export const deleteComment = (req, res)=> {
  logger.info(`${req.method} ${req.originalUrl}, deleting, comment`);
    database.query(QUERYHABITATS.DELETE_COMMENT_HABITAT, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) { 
        res
          .status(httpStatus.OK.code)
          .send(
            new Response(
              httpStatus.OK.code,
              httpStatus.OK.status,
              `Comment deleted`,
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
              `Habitat by id ${req.params.id} was not found !`
            )
          );
      }
    });
}
