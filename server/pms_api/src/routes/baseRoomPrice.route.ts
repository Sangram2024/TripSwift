import { Router } from "express";
import {createbaseRoomPrice} from "../controller/baseroomPrice.controller";


const router = Router();

router.route("/Baseprice").post(createbaseRoomPrice as any);

export default router