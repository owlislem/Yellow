import express from "express";
import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  tourStats,
  tourSumPrice,
  updateTour,
} from "../controllers/tourController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import { userStats } from "../controllers/userController.js";
import { createReview } from "../controllers/reviewController.js";
import { router as reviewRouter } from "./reviewRoute.js";
import { bookingStats } from "../controllers/bookingController.js";

export const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

router.get("/countUser", userStats);
router.get("/countTour", tourStats);
router.get("/sunPriceTours", tourSumPrice);
router.get("/countBooking", bookingStats);

router.route("/").get(getTours).post(createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(restrictTo("Admin"), updateTour)
  .delete(restrictTo("Admin"), deleteTour);

router.route("/:tourId/reviews").post(createReview);
