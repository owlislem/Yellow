import {
  findOne,
  createOne,
  findAll,
  updateOne,
  deleteOne,
} from "./factoryController.js";

import Booking from "../models/bookingModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getBooking = findOne("booking", Booking);
export const createBooking = createOne("booking", Booking);
export const getBookings = findAll("booking", Booking);
export const updateBooking = updateOne("booking", Booking);
export const deleteBooking = deleteOne(Booking);

export const bookingStats = catchAsync(async (req, res, next) => {
  const bookingCount = await Booking.countDocuments({}).exec();
  res.status(200).json({
    status: "succes",
    data: {
      bookingCount,
    },
  });
});

export const bookingTotalStat = catchAsync(async (req, res) => {
  const stats = await Booking.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Initialize counts
  let totalBookings = 0;
  let canceledBookings = 0;
  let pendingBookings = 0;
  let confirmedBookings = 0;

  // Assign counts based on the status
  stats.forEach((stat) => {
    totalBookings += stat.count;
    if (stat._id === "Canceled") canceledBookings = stat.count;
    if (stat._id === "Pending") pendingBookings = stat.count;
    if (stat._id === "Confirmed") confirmedBookings = stat.count;
  });

  res.status(200).json({
    status: "Success",
    data: {
      totalBookings,
      canceledBookings,
      pendingBookings,
      confirmedBookings,
    },
  });
});
