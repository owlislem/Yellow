import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [
        4,
        "The first name provided is too short. Please enter a longer first name.",
      ],
      maxlength: [
        20,
        "The first name provided is too long. Please enter a shorter first name.",
      ],
    },
    lastName: {
      type: String,
      minlength: [
        4,
        "The last name provided is too short. Please enter a longer first name.",
      ],
      maxlength: [
        20,
        "The last name provided is too long. Please enter a shorter first name.",
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [
        4,
        "The username provided is too short. Please enter a longer first name.",
      ],
      maxlength: [
        20,
        "The username provided is too long. Please enter a shorter first name.",
      ],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message:
          "Please enter either 'male' or 'female' for the user's gender.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 15,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (passInput) {
          return this.password === passInput;
        },
        message:
          "Password confirmation does not match. Please ensure both passwords match.",
      },
    },
    passswordChangedAt: {
      type: Date,
    },
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=826&t=st=1709744312~exp=1709744912~hmac=af70492b622d7b4e3e79d98065acc13dbe4f7d60ee5b3c68c4ff0ac387978fb6",
    },
    points: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "User",
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    Status: String,
    NumberPhone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! It should be 10 digits.`,
      },
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 16);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  inputPassword
) {
  return await bcrypt.compare(candidatePassword, inputPassword);
};

userSchema.methods.passwordChangedAfter = function (jwtTimeTemp) {
  if (this.passswordChangedAt) {
    const changedTime = parseInt(this.passswordChangedAt.getTime() / 1000, 10);
    console.log(changedTime);
    return jwtTimeTemp < changedTime;
  }
  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 1000 * 60 * 5;
  return resetToken;
};

const User = mongoose.model("UserModell", userSchema);
export default User;
