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
      property,
      amount,
      booking_dates,
      payment,
      status,
      checkInDate,
      checkOutDate,
    } = req.body;

    // Validate check-in and check-out dates
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    if (
      new Date(checkInDate).toISOString().split("T")[0] <
        formattedCurrentDate ||
      new Date(checkOutDate).toISOString().split("T")[0] < formattedCurrentDate
    ) {
      return res.status(400).json({
        message: "Check-in and check-out dates must be in the future",
      });
    }

    // Validate check-in date is before check-out date
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res
        .status(400)
        .json({ message: "Check-in date must be before check-out date" });
    }

    // Validate booking dates
    if (
      !booking_dates ||
      new Date(booking_dates).toISOString().split("T")[0] < formattedCurrentDate
    ) {
      return res.status(400).json({
        message: "Booking date must be current or in the future",
      });
    }

    const newReservation = new Bookings({
      room,
      user,
      property,
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
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateReservation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservationId = req.params.reservationId;
      const updateFields = req.body;

      const updatedReservation = await Bookings.findByIdAndUpdate(
        reservationId,
        updateFields,
        { new: true }
      );

      if (!updatedReservation) {
        return next(new ErrorHandler("Reservation not found", 404));
      }

      res.json(updatedReservation);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getReservation = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservationId = req.params.reservationId;
      console.log("Requested Reservation ID:", reservationId);

      const reservation = await Bookings.findById(reservationId);
      console.log("Retrieved Reservation:", reservation);

      if (!reservation) {
        return next(new ErrorHandler("Reservation not found", 404));
      }

      res.json(reservation);
    } catch (error: any) {
      console.error("Error getting reservation:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllReservations = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch all reservations from the database
      const reservations = await Bookings.find();

      // Check if there are no reservations
      if (!reservations || reservations.length === 0) {
        return res.status(404).json({
          message: "No reservations found",
        });
      }

      // Return the list of reservations
      res.json(reservations);
    } catch (error: any) {
      console.error("Error getting all reservations:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
