import { Router } from "express";
import { updateUser, deleteUser, getAllUsers, getUserById } from "../controller/user/user.controller";

import {protect} from "@quotus_packages/auth_middleware"
const router = Router();

router.route("/updateUser/:id").put(protect as any,updateUser as any);

router.route("/delete").delete(protect as any, deleteUser as any);

router.route("/getUsers").get(protect as any, getAllUsers as any);

router.route("/getUser/:id").get(protect as any, getUserById as any);



export default router;