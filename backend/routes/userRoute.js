import express from "express";
import {
  findUser,
  createUser,
  findUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import {
  login,
  signup,
  logout,
  protect,
  forgetPassword,
  resetPassword,
} from "../controllers/authController.js";
import { doMe } from "../controllers/factoryController.js";

export const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:token", resetPassword);

router.route("/:id").get(findUser).delete(deleteUser).patch(updateUser);
router.route("/").get(findUsers).post(createUser);
