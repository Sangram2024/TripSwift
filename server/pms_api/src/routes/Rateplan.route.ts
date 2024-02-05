import { Router } from "express";
import {createrateplan} from "../controller/rateplan.controller";


const router = Router();

router.route("/Cplan").post(createrateplan as any);
// router.route("/:id").put(updateRatePlan as any)
// router.route("/getroomtype").get(getMyRoomType as any)



export default router;