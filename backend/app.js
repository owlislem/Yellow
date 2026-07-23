import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router as userRouter } from "./routes/userRoute.js";
import { router as tourRouter } from "./routes/tourRoute.js";
import { router as reviewRouter } from "./routes/reviewRoute.js";
import { router as bookingRouter } from "./routes/bookingRoute.js";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser and cookie parser middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
