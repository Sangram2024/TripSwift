import { Types } from "mongoose";

export type BookingsType = {
  property: Types.ObjectId;
  room: Types.ObjectId;
  user: Types.ObjectId;
  amount: Number;
  payment: Types.ObjectId;
  booking_dates: Dates;
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  reviews: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
