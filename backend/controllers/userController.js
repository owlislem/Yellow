import {
  findOne,
  createOne,
  findAll,
  updateOne,
  deleteOne,
} from "./factoryController.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

export const findUser = findOne("user", User);
export const createUser = createOne("user", User);
export const findUsers = findAll("users", User);
export const updateUser = updateOne("user", User);
export const deleteUser = deleteOne(User);

export const userStats = catchAsync(async (req, res, next) => {
  const userCount = await User.countDocuments({}).exec();
  res.status(200).json({
    status: "succes",
    data: {
      userCount,
    },
  });
});
