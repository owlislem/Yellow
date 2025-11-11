import mongoose from "mongoose";
import User from "./userModel.js";
import Tour from "./tourModel.js";

const reviewSchema = new mongoose.Schema(
  {
    reviewContent: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "UserModell",
      required: [true, "Review must belong to a user"],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "tourModell",
      required: [true, "Review must belong to a tour"],
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username profileImage",
  }).populate({
    path: "tour",
    select: "Destination DressCode",
  });
  next();
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Review = mongoose.model("ReviewModel", reviewSchema);
export default Review;
