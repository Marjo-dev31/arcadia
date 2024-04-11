const database = require('../config/mysql.config.js');
const Response = require('../domain/response.js');
const logger = require('../util/logger.js');
const QUERY = require('../query/service.query.js');


const httpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATE: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
}

export const getService = (req, res) => {
    
}

module.exports = httpStatus;