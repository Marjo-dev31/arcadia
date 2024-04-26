import express from "express";
import { getReviews, addReview, updateReview } from "../controller/review.controller.js";

const reviewRoutes = express.Router();

reviewRoutes.route('/')
.get(getReviews)
.post(addReview)


reviewRoutes.route('/:id')
.put(updateReview)

export default reviewRoutes