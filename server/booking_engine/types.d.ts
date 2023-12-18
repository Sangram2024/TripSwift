import { Types } from "mongoose";

export type BookingsType = {
  hotel: Types.ObjectId;
  propery: Types.ObjectId;
  user: Types.ObjectId;
  amount: Number;
  payment: Types.ObjectId;
  booking_dates: Date[];
  status: string;
  checkInDate: Date;
  checkOutDate: Date;
  reviews: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
