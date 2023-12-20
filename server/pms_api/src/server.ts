import express, { NextFunction, Request, Response } from "express";
import hotelRouter from "./routes/hotel.route";
import propertyRouter from "./routes/property.route";
import uploadRouter from "./routes/upload.route";
import roomRouter from "./routes/room.route";
import cors from "cors";
import morgan from "morgan";
import { AppError } from "./utils/appError";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT;
const DB = process.env.MONGO_URI;

app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1", hotelRouter);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export { app, PORT, DB };
