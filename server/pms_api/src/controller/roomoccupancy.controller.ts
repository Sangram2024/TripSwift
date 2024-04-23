import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { RoomOccupancy } from "../model/room.occupancy.model";

const createRoomOccupancy = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Adult, desc, MaximumAdult, MaximumChildren, MaximumOccupancy, user } = req.body;

        const newroomOccupancy = await RoomOccupancy.create({ Adult, desc, MaximumAdult, MaximumChildren, MaximumOccupancy, user });
        console.log(newroomOccupancy)
        res.status(201).json({
            status: "success",
            error: false,
            message: "RoomOccupancy Created  SuccessFully",
            data: newroomOccupancy
        });
         
    } catch (error) {
        res.status(500).json({
            status: "error",
            error: true,
            message: "Internal Server Error"
        });
    }
});


export { createRoomOccupancy }