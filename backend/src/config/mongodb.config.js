import mongoose from 'mongoose';
import logger from '../util/logger.js';
import secrets from '../util/secretmanager.js'

const secretsValues = await secrets()


const MONGODB_URI = secretsValues.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {dbName: "arcadia"})
        logger.info(`MongoDb is connected!`)
    } catch(error) {
        logger.info(error);
        process.exit(1)
    }
};

export default connectDB;

