import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { PropertyAminite } from "../model/property.aminites.model";
import { PropertyInfo } from "../model/property.info.model";

const createPropertyAminite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      propertyInfo,
      destination_type,
      property_type,
      no_of_rooms_available,
      wifi,
      swimming_pool,
      fitness_center,
      spa_and_wellness,
      restaurant,
      room_service,
      bar_and_lounge,
      parking,
      concierge_services,
      pet_friendly,
      business_facilities,
      laundry_services,
      child_friendly_facilities,
    } = req.body;

    if (!req.body) {
      next(new AppError("Please fill all the required fields", 400));
    }

    const newPropertyAminite = await PropertyAminite.create({
      propertyInfo,
      destination_type,
      property_type,
      no_of_rooms_available: parseInt(no_of_rooms_available),
      wifi,
      swimming_pool,
      fitness_center,
      spa_and_wellness,
      restaurant,
      room_service,
      bar_and_lounge,
      parking,
      concierge_services,
      pet_friendly,
      business_facilities,
      laundry_services,
      child_friendly_facilities,
    });

    await PropertyInfo.findByIdAndUpdate(propertyInfo, {
      property_aminite: newPropertyAminite._id,
    });

    res.status(201).json({
      status: "success",
      error: false,
      message: "Property Aminites added successfully",
      data: newPropertyAminite,
    });
  }
);

const getPropertyAminiteById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;
    const property = await PropertyAminite.findById(propertyId);

    if (!property) {
      return next(
        new AppError(`No property found with this id ${propertyId}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property aminite fetched successfully",
      data: property,
    });
  }
);

const getPropertyAminites = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyAminites = await PropertyAminite.find();

    if (!propertyAminites) {
      return next(new AppError(`No property found with this id `, 404));
    }

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property aminite fetched successfully",
      data: propertyAminites,
    });
  }
);

const getDestinationType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const uniqueDestinationTypes =
      await PropertyAminite.distinct("destination_type");

    if (!uniqueDestinationTypes) {
      return next(new AppError(`No destination type found  `, 404));
    }

    res.status(200).json({
      status: "success",
      error: false,
      message: "Destination type  fetched successfully",
      data: uniqueDestinationTypes,
    });
  }
);
export {
  createPropertyAminite,
  getPropertyAminiteById,
  getPropertyAminites,
  getDestinationType,
};
