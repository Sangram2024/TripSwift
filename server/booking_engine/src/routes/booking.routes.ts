import { Router } from "express";
import {
  createReservation,
  getReservation,
  updateReservation,
} from "../controllers/bookings.controller";

const router = Router();

router.route("/createreservation").post(createReservation);
router.route("/updatereservation/:reservationId").put(updateReservation);
router.route("/getreservation/:reservationId").get(getReservation);

export default router;
