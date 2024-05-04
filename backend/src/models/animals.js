import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    clickCount: {
        type: Number,
    }
});

const animalModel = mongoose.model('animals', animalSchema, 'animals');

export default animalModel;