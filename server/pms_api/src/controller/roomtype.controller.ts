import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { RoomType } from "../model/room.type.model";

const createRoomType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bedType, roomSize, user } = req.body;

        const newroomtype = await RoomType.create({ bedType, roomSize, user });
        // const updateuser = await newroomtype.populate('user').execPopulate();

        res.status(201).json({
            status: "success",
            error: false,
            message: "Room Registered SuccessFully",
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


const updateRoomtype = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const roomtypeid = req.params.id;
    const updatRoomtype = {
        $set: req.body
    }
    const latestroomtype = await RoomType.findByIdAndUpdate(roomtypeid, updatRoomtype, {
        new: true,
        runValidators: true,
    })
    console.log(latestroomtype)
    res.status(200).json({
        status: "success",
        error: false,
        message: "Room Type update",
        data: latestroomtype
    })
})

const getMyRoomType = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        const properties = await RoomType.find({
            user_id: user,

        });


        res.status(200).json({
            status: "success",
            error: "false",
            message: "Data fetched successfully",
            data: {
                properties,

            },
        });
    }
);



const deleteRoomType = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const RoomtypeInfoId = req.params.id;
  
      const Roomtype = await RoomType.findById(RoomtypeInfoId);
  
      if (!Roomtype) {
        return next(
          new AppError(`No room type found with id ${RoomtypeInfoId}`, 404)
        );
      }
  
      
      await RoomType.findByIdAndDelete(RoomtypeInfoId);
  
      res.status(200).json({
        status: "success",
        error: false,
        message: "Room type deleted successfully",
        data: null,
      });
    }
);




export { createRoomType, updateRoomtype ,getMyRoomType,deleteRoomType}