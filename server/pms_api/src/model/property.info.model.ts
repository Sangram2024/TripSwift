import mongoose, { Document, Schema, Types } from "mongoose";
import { PropertyAddressType } from "../model/property.address.model";

import { Room, RoomType } from "../model/room.model";
import { UserType } from "./user.model";
import { Category } from "./propertycategory.model";

type Attribute = {
  _id: string;
  attributeName: string;
};

type Amenity = {
  _id: string;
  name: string;
  isSelected: boolean;
  template: {
    attributes: null | Attribute[];
  };
};

type PropertyAmenity = {
  _id: string;
  category: string;
  amenities: Amenity[];
};

interface PropertyInfoType extends Document {
  user_id: Types.ObjectId | UserType;
  property_name: string;
  property_email: string;
  property_contact: string;
  star_rating: mongoose.Types.Decimal128;
  property_code: string;
  property_address: Types.ObjectId | PropertyAddressType;
  property_amenities: PropertyAmenity[];
  property_room: Types.ObjectId | RoomType;
  image: string[];
  description: string;
  property_category: Category;
  property_type: string;
  isDraft: boolean;
}

const propertyInfoSchema = new Schema<PropertyInfoType>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  property_name: { type: String, required: true },
  property_email: { type: String, required: true },
  property_contact: { type: String, required: true },
  star_rating: { type: String, required: true },
  property_code: { type: String, required: true },
  property_address: { type: Schema.Types.ObjectId, ref: "PropertyAddress" },
  property_amenities: [
    {
      _id: Types.ObjectId,
      category: String,
      amenities: [
        {
          _id: Types.ObjectId,
          name: String,
          isSelected: Boolean,
          template: {
            attributes: [
              {
                _id: Types.ObjectId,
                attributeName: String,
              },
            ],
          },
        },
      ],
    },
  ],
  property_category: {
    type: String,
    required: [true, "Property category is required"],
  },
  property_type: {
    type: String,
    required: [true, "Property type is required"],
  },
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
