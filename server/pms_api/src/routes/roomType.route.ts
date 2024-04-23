import { Router } from "express";
import {createRoomType,updateRoomtype,getMyRoomType,deleteRoomType} from "../controller/roomtype.controller";


const router = Router();

router.route("/roomstype").post(createRoomType as any);
router.route("/:id").put(updateRoomtype as any).delete(deleteRoomType as any)
router.route("/getroomtype").get(getMyRoomType as any)



export default router;