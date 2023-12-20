import { Router } from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  getRooms,
} from "../controller/room.controller";

const router = Router();

router
  .route("/")
  .get(getRooms as any)
  .post(createRoom as any);

router
  .route("/:id")
  .get(getRoomById as any)
  .put(updateRoom as any)
  .delete(deleteRoom as any);

export default router;
