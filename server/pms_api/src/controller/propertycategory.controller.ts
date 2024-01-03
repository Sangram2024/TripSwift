import { NextFunction, Response } from "express";
import { Request, catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import PropertyCategory from "../model/propertycategory.model";
import { Role } from "../utils/jwtHelper";
import PropertyType from "../model/propertytype.model";
import mongoose from "mongoose";

const getAllPropertyCategories = catchAsync(
  async (req: Request<{}, Role>, res: Response, next: NextFunction) => {
    const categories = await PropertyCategory.find({});

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property categories fetched successfully",
      totalPropertyCategories: categories.length,
      data: {
        categories,
      },
    });
  }
);

const getPropertyCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyCategoryID = req.params.propertyCategoryID;

    const propertyCategory = await PropertyCategory.findById(
      propertyCategoryID
    ).populate("propertyTypes", "_id name key");

    return res.status(200).json({
      status: "success",
      error: false,
      message: "Property category fetched successfully",
      data: {
        propertyCategory,
      },
    });
  }
);

const createPropertyCategory = catchAsync(
  async (req: Request<{}, Role>, res: Response, next: NextFunction) => {
    if (req.role != "superadmin") {
      return next(
        new AppError("You'r not authorized to perform this operation", 401)
      );
    }

    const category = req.body.category as string;

    if (!category) {
      return next(
        new AppError("Please provide the category you want to add", 400)
      );
    }

    const propertyCategory = new PropertyCategory({
      category: category.toUpperCase(),
    });

    await propertyCategory.save();

    return res.status(201).json({
      status: "success",
      error: false,
      message: "Property category created successfully",
      data: {
        propertyCategory,
      },
    });
  }
);

export {
  createPropertyCategory,
  getAllPropertyCategories,
  getPropertyCategory,
};
