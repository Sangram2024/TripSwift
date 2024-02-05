import express, { NextFunction, Request, Response } from "express";
import propertyRouter from "./routes/property.route";
import uploadRouter from "./routes/upload.route";
import roomRouter from "./routes/room.route";
import ameniteRouter from "./routes/amenite.route";
import cors from "cors";
import morgan from "morgan";
import { AppError } from "./utils/appError";
import { errorHandler } from "./middlewares/error.middleware";
import roomtype from "./routes/roomType.route"
import rateplan from "./routes/Rateplan.route"
import roomOcc from "./routes/roomOccupancy.route"
import basePriceroom from "./routes/baseRoomPrice.route"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT;
const DB = process.env.MONGO_URI;

app.use("/api/v1/amenite", ameniteRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1",roomtype)
app.use("/api/v1/rateplans",rateplan)
app.use("/api/v1/roomOccupancy",roomOcc)
app.use("/api/v1/basePrice",basePriceroom)


app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.get("/hello/test",(req,res)=>{
  res.send({msg:"Hello world"})
}) 

app.use(errorHandler);

export { app, PORT, DB };
