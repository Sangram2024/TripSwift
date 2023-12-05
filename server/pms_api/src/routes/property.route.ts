import { Router } from "express";
import {
  createpropertyInfo,
  getAllProperty,
  getPropertyInfoById,
  updatePropertyInfo,
  deleteProperty,
  getMyProperties,
} from "../controller/propertyInfo.controller";
import {
  createPropertyAddress,
  updatePropertyAddress,
  deletePropertyAddress,
  getPropertyAddressById,
} from "../controller/propertyaddress.controller";
import {
  createPropertyAminite,
  getPropertyAminiteById,
} from "../controller/propertyaminite.controller";

import { createPaymentMethod } from "../controller/property/paymentmethod.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.route("/me").get(protect as any, getMyProperties as any);

// property payment router
router.route("/payment_method").post(createPaymentMethod as any);

// property address router
router.route("/address").post(createPropertyAddress as any);
router
  .route("/address/:id")
  .get(getPropertyAddressById as any)
  .patch(updatePropertyAddress as any)
  .delete(deletePropertyAddress as any);

// property aminites router
router.route("/amenities").post(createPropertyAminite as any);
router.route("/amenities/:id").get(getPropertyAminiteById as any);

// property router
router
  .route("/")
  .get(getAllProperty as any)
  .post(protect as any, createpropertyInfo as any);
router
  .route("/:id")
  .get(getPropertyInfoById as any)
  .patch(updatePropertyInfo as any)
  .delete(deleteProperty as any);

export default router;
