import mysql from "mysql";
import dotenv from "dotenv";
import secrets from '../util/secretmanager.js'

dotenv.config();

const secretsValues = await secrets()

const pool = mysql.createPool({
    host: secretsValues.DB_HOST,
    port: secretsValues.DB_PORT,
    user: secretsValues.DB_USER,
    password: secretsValues.DB_PASSWORD,
    database: secretsValues.DB_NAME,
    connectionLimit: secretsValues.DB_CONNECTION_LIMIT,
});

export default pool;
