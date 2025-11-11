import mongoose from "mongoose";

const tourModel = new mongoose.Schema(
  {
    Destination: {
      type: String,
      required: true,
    },
    DepartureDate: {
      type: Date,
      required: true,
    },
    ReturnDate: {
      type: Date,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Tags: [String],
    DeparturePlace: String,
    ReturnPlace: String,
    DTime: String,
    RTime: String,
    DressCode: String,
    Includes: [[String]],
    Program: [String],
    Image: [String],
    Price: String,
    Deadline: Date,
    Notes: String,
    NTickets: Number,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// tourModel.virtual("reviews", {
//   ref: "Review",
//   foreignField: "tour",
//   localField: "_id",
// });
const Tour = mongoose.model("tourModell", tourModel);
export default Tour;
