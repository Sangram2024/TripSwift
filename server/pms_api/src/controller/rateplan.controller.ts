import { NextFunction, Response } from "express";
import { AppError } from "../utils/appError";
import { Request, catchAsync } from "../utils/catchAsync";
import { RateplanModel } from "../model/ratePlan.model";

const createrateplan = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Barplan,
            standardplan,
            Breakfastplan,
            NonRefundable,
            user
        } = req.body;

        const Rateplan = await RateplanModel.create({
            Barplan,
            standardplan,
            Breakfastplan,
            NonRefundable,
            user
        });
        console.log(Rateplan)
        res.status(201).json({
            status: "success",
            error: false,
            message: "Rate plan create SuccessFully",
            data: Rateplan
        });
    } catch (error) {
        console.error('Error creating rate plan:', error);
        res.status(500).json({
            status: "error",
            error: true,
            message: "Internal Server Error"
        });
    }

});



// const updateRatePlan = async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.params._id;
//     try {
//         const update = { $set: req.body };
//         const updatedRatePlan = await RateplanModel.findOneAndUpdate(
//             { user: userId },
//             update,
//             { new: true, runValidators: true }
//         );

//         if (!updatedRatePlan) {
//             return res.status(404).json({
//                 status: "error",
//                 error: true,
//                 message: "Rate plan not found for the user ID"
//             });
//         }
//         res.status(200).json({
//             status: "success",
//             error: false,
//             message: "Rate plan updated successfully",
//             data: updatedRatePlan
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: "error",
//             error: true,
//             message: "Internal Server Error"
//         });
//     }
// };




// const getMyRoomType = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const user = req.user;

//         const properties = await RoomType.find({
//             user_id: user,

//         });


//         res.status(200).json({
//             status: "success",
//             error: "false",
//             message: "Data fetched successfully",
//             data: {
//                 properties,

//             },
//         });
//     }
// );



// const deleteRoomType = catchAsync(
//     async (req: Request, res: Response, next: NextFunction) => {
//       const RoomtypeInfoId = req.params.id;

//       const Roomtype = await RoomType.findById(RoomtypeInfoId);

//       if (!Roomtype) {
//         return next(
//           new AppError(`No room type found with id ${RoomtypeInfoId}`, 404)
//         );
//       }


//       await RoomType.findByIdAndDelete(RoomtypeInfoId);

//       res.status(200).json({
//         status: "success",
//         error: false,
//         message: "Room type deleted successfully",
//         data: null,
//       });
//     }
// );




export { createrateplan }