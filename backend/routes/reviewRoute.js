import mongoose from "mongoose";
import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  setTourUserIds,
  updateReview,
} from "../controllers/reviewController.js";
import { protect, restrictTo } from "../controllers/authController.js";

export const router = express.Router({ mergeParams: true });
router.use(protect);
router
  .route("/")
  .get(setTourUserIds, getReviews)
  .post(setTourUserIds, createReview);
  

router.use(restrictTo("Admin"));
router
  .route("/:id")
  .get(getReview)
  .patch(updateReview)
  .delete(restrictTo("Admin"), deleteReview);
