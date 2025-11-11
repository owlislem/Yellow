import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "tourModell", // Ensure this matches the name of your Tour model
    required: [true, "Booking must belong to a Tour!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModell", // Ensure this matches the name of your User model
    required: [true, "Booking must belong to a User"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price"],
  },
  status: {
    type: String,
    enum: ["Confirmed", "Canceled", "Pending"],
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "Destination NTickets",
  });
  next();
});

const Booking = mongoose.model("bookingModel", bookingSchema);
export default Booking;
