import { NextFunction, Response } from "express";
import { AppError, Request, catchAsync } from "../utils";
import Auth from "../model/auth.model";

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;

    const user = await Auth.findById(userId);

    if (!user) {
      return next(new AppError("No user found", 404));
    }

    res.status(200).json({
      status: "success",
      error: false,
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  }
);
