import { NextFunction, Response } from "express";
import {
  AppError,
  Request,
  Role,
  assignToken,
  catchAsync,
  compareHash,
} from "../utils";
import Auth from "../model/auth.model";
import { produceEvent } from "../utils/kafkaHandler";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!req.body) {
      next(new AppError("Please fill all the required fields", 400));
    }

    const user = await Auth.find({
      email,
    });

    if (user.length) {
      next(new AppError("An user is already exits with this email", 400));
    }

    const newUser = await Auth.create({
      firstName,
      lastName,
      email,
      password,
      role: role,
    });

    await produceEvent("auth", "new-registration", newUser);

    res.status(201).json({
      status: "success",
      error: false,
      message: "User registered successfully",
      data: newUser,
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    console.log("1-----------");

    if (!email || !password) {
      return next(
        new AppError("Please provide all the required credentials", 400)
      );
    }

    console.log("2-----------");

    const users = await Auth.find().byEmail(email).select("password");

    console.log("3-----------");

    if (!users.length || !(await compareHash(password, users[0]?.password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    console.log("4-----------");

    const accessToken = assignToken(
      {
        id: users[0]?.id,
        email: users[0]?.email,
        role: users[0]?.role as Role,
      },
      process.env.JWT_SECRET_KEY_DEV!,
      process.env.JWT_EXPIRES_IN_DEV!
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      })
      .json({
        status: "success",
        error: false,
        message: "User login successfully",
        data: {
          accessToken,
        },
      });
  }
);

export { register, login };
