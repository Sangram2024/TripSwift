import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { availabilityModel } from "../model/Availability.model";

const createAvailability = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {  } = req.body;

        const newroomtype = await availabilityModel.create({  });
  

        res.status(201).json({
            status: "success",
            error: false,
            message: "RoomAvailability Create SuccessFully",
            data: newroomtype
        });
    } catch (error) {

        res.status(500).json({
            status: "error",
            error: true,
            message: "Internal Server Error"
        });
    }
});


export{createAvailability}