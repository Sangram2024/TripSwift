import { NextFunction, Response } from "express";
import { Request, catchAsync } from "../utils/catchAsync";
import { Role } from "../utils/jwtHelper";
import { AppError } from "../utils/appError";
import PropertyType from "../model/propertytype.model";

const createPropertyType = catchAsync(
  async (req: Request<{}, Role>, res: Response, next: NextFunction) => {
    if (req.role != "superadmin") {
      return next(
        new AppError("You'r not authorized to perform this operation", 401)
      );
    }

    if (!req.body) {
      return next(new AppError("Please provide all the required data", 400));
    }

    const newPropertyType = new PropertyType({
      ...req.body,
    });

    await newPropertyType.save();

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property type created successfully",
      data: {
        newPropertyType,
      },
    });
  }
);

export { createPropertyType };
