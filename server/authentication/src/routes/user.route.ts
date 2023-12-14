import { Router } from "express";
import { getMe } from "../controller/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.route("/me").get(protect as any, getMe as any);

export default router;
