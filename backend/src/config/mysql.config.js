import mysql from "mysql";
import dotenv from "dotenv";
import secrets from '../util/secretmanager.js'

dotenv.config();

const secretsValues = await secrets()
console.log('toto', secretsValues)

const pool = mysql.createPool({
    host: secretsValues.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

export default pool;
