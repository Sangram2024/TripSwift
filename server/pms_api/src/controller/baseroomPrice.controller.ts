import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import {BaseRoomPrice} from "../model/baseroomprice.model";

const createbaseRoomPrice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {BasePrice,PerAdult,PerChild} = req.body;

        const BaseRoom = await BaseRoomPrice.create({
            BasePrice,PerAdult,PerChild
        });
        console.log(BaseRoom)
        res.status(201).json({
            status: "success",
            error: false,
            message: "Rate plan create SuccessFully",
            data: BaseRoom
        });
    } catch (error) {
        console.error('Error creating Base plan:', error);
        res.status(500).json({
            status: "error",
            error: true,
            message: "Internal Server Error"
        });
    }

});


export{createbaseRoomPrice}

