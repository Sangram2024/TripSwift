import { NextFunction, Response } from "express";
import { Request, catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { PropertyInfo } from "../model/property.info.model";

const updatePropertyAmenity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;
    const body = req.body;

    if (!body) {
      return next(new AppError("Please provide all the required details", 400));
    }

    const property = await PropertyInfo.findById(propertyId);

    if (!property) {
      return next(new AppError("No property found, please try again ...", 400));
    }

    await PropertyInfo.findByIdAndUpdate(propertyId, {
      property_amenities: body.amenities,
    });

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property amenities updated successfully",
    });
  }
);

export { updatePropertyAmenity };
