import express from "express";
import {
  bookingTotalStat,
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from "../controllers/bookingController.js";

export const router = express.Router();
router.route("/stats").get(bookingTotalStat);

router.route("/").get(getBookings).post(createBooking);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);
