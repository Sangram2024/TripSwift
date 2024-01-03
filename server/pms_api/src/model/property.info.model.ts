import mongoose, { Document, Schema, Types } from "mongoose";
import {
  PropertyAddress,
  PropertyAddressType,
} from "../model/property.address.model";
import {
  PropertyAmeniteCategory,
  PropertyAmeniteCategoryType
} from "../model/property.amenites.category.model";

import {
  Room,
  RoomType
} from '../model/room.model'
import { UserType } from "./user.model";

interface PropertyInfoType extends Document {
  user_id: Types.ObjectId | UserType;
  property_name: string;
  property_email: string;
  property_contact: number;
  star_rating: mongoose.Types.Decimal128;
  property_code: string;
  property_address: Types.ObjectId | PropertyAddressType;
  property_amenite_category: Types.ObjectId | PropertyAmeniteCategoryType;
  property_room: Types.ObjectId | RoomType;
  image: string[];
  description: string;
  isDraft: boolean;
}

const propertyInfoSchema = new Schema<PropertyInfoType>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  property_name: { type: String, required: true },
  property_email: { type: String, required: true },
  property_contact: { type: Number, required: true },
  star_rating: { type: String, required: true },
  property_code: { type: String, required: true },
  property_address: { type: Schema.Types.ObjectId, ref: "PropertyAddress" },
  property_amenite_category: { type: Schema.Types.ObjectId, ref: "PropertyAmeniteCategory" },
  property_room: { type: Schema.Types.ObjectId, ref: "Room" },

  image: [{ type: String }],
  description: { type: String },
  isDraft: {
    type: Boolean,
    default: true,
  },
});

const PropertyInfo = mongoose.model<PropertyInfoType>(
  "PropertyInfo",
  propertyInfoSchema
);

export { PropertyInfo, PropertyInfoType };
