import express from "express";
const app = express();

import { router as userRouter } from "./routes/userRoute.js";

import cookieParser from "cookie-parser";
import AppError from "./utils/appError.js";
import cors from "cors";

import globalErrorHandler from "./controllers/errorController.js";
const corsOptions = {
  origin: "http://localhost:3000/",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});
app.use(globalErrorHandler);

export default app;
