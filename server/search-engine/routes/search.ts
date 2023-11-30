import { Router } from "express";
import { search } from "../controllers/search.controllers";

const router: Router = Router();

// Define a route for user registration
router.get("/search", search);

// deleteEquipmentCategory
export default router;