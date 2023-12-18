import { Router } from "express";
import {
  createReservation,
  updateReservation,
} from "../controllers/bookings.controller";

const router = Router();

router.route("/createreservation").post(createReservation);
router
  .route("/updateReservation/:bookingId/:userId/:status")
  .put(updateReservation);

export default router;
