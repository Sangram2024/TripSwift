import { Router } from "express";
import {createRoomOccupancy} from "../controller/roomoccupancy.controller";


const router = Router();

router.route("/RoomOccupancy").post(createRoomOccupancy as any);


export default router;  