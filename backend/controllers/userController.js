import {
  findOne,
  createOne,
  findAll,
  updateOne,
  deleteOne,
} from "./factoryController.js";
import User from "../models/userModel.js";

export const findUser = findOne("user", User);
export const createUser = createOne("user", User);
export const findUsers = findAll("users", User);
export const updateUser = updateOne("user", User);
export const deleteUser = deleteOne(User);
