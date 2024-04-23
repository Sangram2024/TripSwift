import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { PropertyInfo } from "../model/property.info.model";
import { decodeToken } from "../utils/jwtHelper";
import { UserType } from "../model/user.model";
import { Category, PropertyCategory } from "../model/propertycategory.model";

const getMyProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const properties = await PropertyInfo.find({
      user_id: user,
      isDraft: false,
    });

    const draftProperties = await PropertyInfo.find({
      user_id: user,
      isDraft: true,
    });

    res.status(200).json({
      status: "success",
      error: "false",
      message: "Data fetched successfully",
      data: {
        properties,
        draftProperties,
      },
    });
  }
);

const createpropertyInfo = catchAsync(
  async (
    req: Request<UserType["userId"]>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.role === "user") {
      return next(
        new AppError("You are not allowed to perform this  action", 401)
      );
    }

    const user = req.user;

    let isHotelFlow = false;
    let isHomestayFlow = false;

    const {
      property_name,
      property_email,
      property_contact,
      star_rating,
      property_code,
      image,
      description,
      property_category,
      property_type,
    } = req.body;

    const propertyCategory = property_category as Category;

    if (propertyCategory === Category.HOTEL) isHotelFlow = true;
    if (propertyCategory === Category.HOMESTAY) isHomestayFlow = true;

    if (!req.body) {
      next(new AppError("Please fill all the required fields", 400));
    }

    const property = await PropertyInfo.find({
      property_email,
    });

    if (property.length) {
      next(new AppError("A property is already exits with this email", 400));
    }

    const newProperty = new PropertyInfo({
      user_id: user,
      property_name,
      property_email,
      property_contact,
      star_rating,
      property_code,
      image,
      property_category,
      property_type,
      description,
    });

    await newProperty.save();

    res.status(201).json({
      status: "success",
      error: false,
      message: "Property registered successfully",
      data: {
        isHomestayFlow,
        isHotelFlow,
        property: newProperty,
      },
    });
  }
);

const updatePropertyInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertInfoId = req.params.id;

    const {
      property_name,
      property_email,
      property_contact,
      star_rating,
      property_code,
      image,
      description,
    } = req.body;

    const property = await PropertyInfo.findById(propertInfoId);

    if (!property) {
      return next(
        new AppError(`No property found with this id ${propertInfoId}`, 404)
      );
    }

    const updateProperty = await PropertyInfo.findByIdAndUpdate(
      propertInfoId,
      {
        property_name,
        property_email,
        property_contact,
        star_rating,
        property_code,
        image,
        description,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      error: false,
      message: "Property updated successfully",
      data: updateProperty,
    });
  }
);

const deleteProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyInfoId = req.params.id;

    const property = await PropertyInfo.findById(propertyInfoId);

    if (!property) {
      return next(
        new AppError(`No property found with this id ${property}`, 404)
      );
    }

    await PropertyInfo.findByIdAndDelete(propertyInfoId);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property deleted successfully",
      data: null,
    });
  }
);

const getPropertyInfoById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;
    const property = await PropertyInfo.findById(propertyId)
      .populate({ path: "property_address" })
      .populate({ path: "property_aminite" })
      .populate({ path: "property_room" })
      .lean();
    console.log(property);

    if (!property) {
      return next(
        new AppError(`No property found with this id ${propertyId}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property fetched successfully",
      data: property,
    });
  }
);

const getAllProperty = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  const deToken = await decodeToken(
    token as any,
    process.env.JWT_SECRET_KEY as any
  );

  const properties = await PropertyInfo.find({ user_Id: deToken.id });

  res.status(200).json({
    status: "success",
    error: false,
    message: "Property fetched successfully",
    totalProperty: properties.length,
    data: properties,
  });
});

const getProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const property = await PropertyInfo.find();

    if (!property) {
      return next(new AppError(`No property found with this id `, 404));
    }

    res.status(200).json({
      status: "success",
      error: false,
      message: "Property  fetched successfully",
      data: property,
    });
  }
);

export {
  createpropertyInfo,
  updatePropertyInfo,
  deleteProperty,
  getPropertyInfoById,
  getAllProperty,
  getMyProperties,
  getProperties,
};
