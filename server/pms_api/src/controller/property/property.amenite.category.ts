import { NextFunction, Response }from 'express'
import { AppError } from "../../utils/appError";
import { Request, catchAsync } from "../../utils/catchAsync";
import {PropertyAmeniteCategory} from  '../../model/property.amenites.category.model'
import { PropertyInfo } from '../../model/property.info.model';

const createPropertyAmeniteCategory = catchAsync (
    async (req:Request, res:Response, next:NextFunction) =>{
        const {
            propertyInfo,
            amenite_type,
            amenite_type_code,
            is_amenite_type
            
    } = req.body;

    if (!req.body) {
        next(new AppError("Please fill all the required fields", 400));
      }

      const newPropertyAminiteCategory = await PropertyAmeniteCategory.create({
        propertyInfo,
        amenite_type,
        amenite_type_code,
        is_amenite_type
        
      });

      await PropertyInfo.findByIdAndUpdate(propertyInfo, {
        property_amenite_category: newPropertyAminiteCategory._id,
      });
  
      await PropertyInfo.findByIdAndUpdate(propertyInfo, {
        isDraft: false,
      });

      res.status(201).json({
        status: "success",
        error: false,
        message: "Property Aminites Category added successfully",
        data: newPropertyAminiteCategory,
      });
        
    }
);


const getPropertyAmeniteCategory = catchAsync (
    async (req: Request, res: Response, next:NextFunction) =>{
        const propertyId = req.params.id;
        const propertyAmeniteCategory = await PropertyAmeniteCategory.findById(propertyId);  
        

        if (!propertyAmeniteCategory) {
            return next(
              new AppError(`No property found with this id ${propertyId}`, 404)
            );
          }

          res.status(200).json({
            status: "success",
            error: false,
            message: "Property aminite category fetched successfully",
            data: propertyAmeniteCategory,
          });
    }
);


const getPropertyAminitesategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const propertyAminitesCategories = await PropertyAmeniteCategory.find();
  
      if (!propertyAminitesCategories) {
        return next(new AppError(`No property amenites category found  `, 404));
      }
  
      res.status(200).json({
        status: "success",
        error: false,
        message: "Property aminite category fetched successfully",
        data: propertyAminitesCategories,
      });
    }
  );

  const getDestinationType = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const uniqueDestinationTypes =
        await PropertyAmeniteCategory.distinct("destination_type");
  
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
    createPropertyAmeniteCategory,
    getPropertyAmeniteCategory,
    getPropertyAminitesategories,
    getDestinationType


}