import { Request, Response, NextFunction } from "express";
import Bookings from "../models/booking.model";
import { validateBookingDates } from "../utils/booking.validator.dates";
import mongoose, { Types } from "mongoose";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

export const createReservation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      room,
      user,
      propery,
      amount,
      booking_dates,
      payment,
      status,
      checkInDate,
      checkOutDate,
    } = req.body;
    const newReservation = new Bookings({
      room,
      user,
      propery,
      amount,
      booking_dates,
      payment,
      status,
      checkInDate,
      checkOutDate,
    });
    try {
      const savedBooking = await newReservation.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      next(error);
    }
  }
);

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const updateFields = req.body;

    const updatedReservation = await Bookings.findByIdAndUpdate(
      reservationId,
      updateFields,
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
