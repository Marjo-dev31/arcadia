import mongoose from "mongoose";

const openingSchema = new mongoose.Schema({
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    openingDay: {
        type: String
    },
    closingDay: {
        type: String
    },
});

const openingModel = mongoose.model('opening', openingSchema, 'opening');

export default openingModel