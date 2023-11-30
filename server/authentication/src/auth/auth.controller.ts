import { NextFunction, Response } from "express";
import { AppError, Request, Role, assignToken, catchAsync, compareHash } from "../utils";
import Auth from "../model/auth.model";
import { produceEvent } from "..";
// import { produceEvent } from "../..";
// import { AppError, Request, Role, assignToken, catchAsync, compareHash } from "../../utils";
// import Auth from "../../model/auth.model";

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

    await produceEvent(
      process.env.KAFKA_TOPIC as string,
      "new-registration",
      newUser
    );

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

    if (!email || !password) {
      return next(
        new AppError("Please provide all the required credentials", 400)
      );
    }
    const users = await Auth.find().byEmail(email);

    if (!users.length || !(await compareHash(password, users[0]?.password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    const accessToken = assignToken(
      {
        id: users[0]?.id,
        email: users[0]?.email,
        role: users[0]?.role as Role,
      },
      process.env.JWT_SECRET_KEY!,
      process.env.JWT_EXPIRES_IN!
    );

    return res.status(200).json({
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
