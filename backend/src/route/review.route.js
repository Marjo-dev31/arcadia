import express from "express";
import { getReviews, addReview, updateReview } from "../controller/review.controller.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";

const reviewRoutes = express.Router();

reviewRoutes.route('/')
.get(getReviews)
.post(addReview)


reviewRoutes.route('/:id')
.put(authenticateToken, verifyRoles('Employé'), updateReview)

export default reviewRoutes