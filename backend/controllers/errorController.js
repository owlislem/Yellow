import AppError from "./../utils/appError.js";
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const propDuplicated = (obj) => {
  const duplicatedArray = ["username", "email"];
  for (let prop of duplicatedArray) {
    if (obj.hasOwnProperty(prop)) {
      return prop;
    }
  }
};
const handleDuplicateFieldsDB = (err) => {
  // const value = err.errmsg.match(/"((?:\\.|[^"\\])*)"/);
  const propDuplicatedObj = propDuplicated(err.keyPattern);

  const message = `Duplicate field value ${err.keyValue[propDuplicatedObj]}`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJwtError = () =>
  new AppError("Invalid Token , please log in again!", 401);
const handleJwtExpiredError = () =>
  new AppError("Your token has expired , please log in again!", 401);

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error", err);
    return res.status(500).json({
      status: "error",
      message: "somthing went very wrong!",
    });
  }
};

export default function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: err.message,
  // });
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    } else if (err.name === "JsonWebTokenError") {
      error = handleJwtError();
    } else if (err.name === "TokenExpiredError") {
      error = handleJwtExpiredError();
    }
    sendErrorProd(error, res);
  }
}
