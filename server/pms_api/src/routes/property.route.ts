import { Router } from "express";
import {createpropertyInfo,getAllProperty,getPropertyInfoById,updatePropertyInfo,deleteProperty} from '../controller/propertyInfo.controller';
import {createPropertyAddress, updatePropertyAddress, deletePropertyAddress, getPropertyAddressById} from '../controller/propertyaddress.controller';
import {createPropertyAminite, getPropertyAminiteById} from '../controller/propertyaminite.controller';
import {createPaymentMethod} from '../controller/property/paymentmethod.controller'
import {protect} from  "@quotus_packages/auth_middleware"
const router = Router();

// property router

router.route("/createProperty").post(protect as any,createpropertyInfo as any);

router.route("/updateProperty/:id").put(updatePropertyInfo as any);

router.route("/deleteProperty").delete(deleteProperty as any);

router.route("/getAllProperty").get(protect as any, getAllProperty as any);

router.route("/getProperty/:id").get(getPropertyInfoById as any);


// property payment router
router.route("/createPropertyPaymentMethod").post(protect as any, createPaymentMethod as any);




// property address router

router.route("/createPropertyAddress").post(protect as any, createPropertyAddress as any);

router.route("/updatePropertyAddress/:id").put(protect as any, updatePropertyAddress as any);

router.route("/deletePropertyAddress").delete(protect as any, deletePropertyAddress as any);


router.route("/getPropertyAddress/:id").get(getPropertyAddressById as any);



// property aminites router

router.route("/createPropertyAminites").post(protect as any, createPropertyAminite as any);

router.route("/getPropertyAminites/:id").get(getPropertyAminiteById as any);




export default router;