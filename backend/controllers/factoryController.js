import catchAsync from "../utils/catchAsync.js";
import mongoose from "mongoose";

export const findOne = (dataName, Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    return res.status(200).json({
      status: "Succes",
      data: {
        [dataName]: data,
      },
    });
  });
};

export const createOne = (dataName, Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);

    return res.status(201).json({
      status: "Succes",
      data: {
        [dataName]: data,
      },
    });
  });
};

export const findAll = (dataName, Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.find();
    return res.status(200).json({
      status: "Succes",
      data: {
        [dataName]: data,
      },
    });
  });
};
export const doMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});
export const updateOne = (dataName, Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(202).json({
      status: "Succes",
      data: {
        [dataName]: data,
      },
    });
  });
};
export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);
    return res.status(204).json({});
  });
};
