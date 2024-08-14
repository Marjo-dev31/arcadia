import mongoose from 'mongoose';
import logger from '../util/logger.js';

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {dbName: "arcadia"})
        logger.info(`MongoDb is connected! on ${MONGODB_URI}`)
    } catch(error) {
        logger.info(error);
        process.exit(1)
    }
};

export default connectDB;

