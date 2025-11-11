import {
  findOne,
  createOne,
  findAll,
  updateOne,
  deleteOne,
} from "./factoryController.js";

import Tour from "../models/tourModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getTour = findOne("tour", Tour);
export const createTour = createOne("tour", Tour);
export const getTours = findAll("tours", Tour);
export const updateTour = updateOne("tour", Tour);
export const deleteTour = deleteOne(Tour);

export const tourStats = catchAsync(async (req, res, next) => {
  const tourCount = await Tour.countDocuments({}).exec();
  res.status(200).json({
    status: "succes",
    data: {
      tourCount,
    },
  });
});

export const tourSumPrice = catchAsync(async (req, res, next) => {
  // Calculate the sum of the Price field, converting the price string to an integer
  const result = await Tour.aggregate([
    {
      $group: {
        _id: null,
        totalSum: {
          $sum: {
            $toInt: {
              $arrayElemAt: [{ $split: ["$Price", " "] }, 0],
            },
          },
        },
      },
    },
  ]);

  const totalSum = result[0]?.totalSum || 0;

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      totalSum,
    },
  });
});
