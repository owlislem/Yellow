import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { Email } from "../utils/email.js";
import crypto from "crypto";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECR, { expiresIn: "1d" });
};
const factoryAuthResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  console.log(token);
  user.password = undefined;
  const cookieOptions = {
    expires: new Date(Date.now() + 9000000000000),
    secure: false,
    httpOnly: true,
  };
  res.cookie(
    "jwt",
    token,
    process.env.NODE_ENV === "production"
      ? (cookieOptions.secure = true)
      : cookieOptions
  );
  return res.status(statusCode).json({
    status: "Succes",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  factoryAuthResponse(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError(
        "Please provide both your email and password for login.",
        400
      )
    );
  const currentUser = await User.findOne({ email }).select("+password");
  console.log(currentUser);
  if (!currentUser)
    return next(
      new AppError("Email not found. Please check your email or sign up.", 401)
    );
  if (!(await currentUser.isPasswordCorrect(password, currentUser.password)))
    return next(new AppError("Authentication failed. Please try again.", 401));
  factoryAuthResponse(currentUser, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(
      new AppError("Unauthorized access. Please sign in to continue.", 401)
    );
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECR);
  console.log(decoded);
  const freshUser = await User.findById(decoded.userId);
  if (!freshUser) {
    return next(
      new AppError(
        "Token has expired or cannot be found. Please request a new token to continue.",
        401
      )
    );
  }
  if (freshUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        "Password has been changed since token generation. Please request a new token.",
        401
      )
    );
  }
  req.user = freshUser;
  console.log(req.user.id);
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Unauthorized. Please request access from your administrator.",
          403
        )
      );
    }
    next();
  };
};

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("There is no user with this email", 404));
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // 3 send it to user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: "Your password resset token ( valid for 10 min )",
    //   message,
    // });
    await new Email(user, resetURL).sendResetPassword();
    res.status(200).json({
      status: "sucess",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return next(
      new AppError(
        "there was an error sending the email. Try again later !",
        500
      )
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("token is invalid or expired", 400));
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  factoryAuthResponse(user, 200, res);
});
