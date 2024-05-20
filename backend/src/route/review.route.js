import express from "express";
import { getReviews, addReview, updateReview, getAllReviews } from "../controller/review.controller.js";
import authenticateToken from "../middleware/auth.js";
import verifyRoles from "../middleware/verifyroles.js";

const reviewRoutes = express.Router();

reviewRoutes.route('/')
.get(getReviews)
.post(addReview)

reviewRoutes.route('/backoffice')
.get(authenticateToken, verifyRoles('Admin', 'Employé'), getAllReviews)

reviewRoutes.route('/:id')
.put(authenticateToken, verifyRoles('Admin', 'Employé'), updateReview)

export default reviewRoutes


