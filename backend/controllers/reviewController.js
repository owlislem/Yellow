import {
  findOne,
  createOne,
  findAll,
  updateOne,
  deleteOne,
} from "./factoryController.js";

import Review from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";

export const setTourUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

export const getReview = findOne("review", Review);
export const getReviews = findAll("reviews", Review);
export const createReview = createOne("review", Review);
export const updateReview = updateOne("review", Review);
export const deleteReview = deleteOne(Review);
