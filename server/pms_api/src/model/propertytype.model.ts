import mongoose, {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Types,
} from "mongoose";
import PropertyCategory from "./propertycategory.model";

export type PropertyType = {
  propertyCategory: any;
  name: string;
  key: string;
};

type PropertyTypeModelType = Model<PropertyType>;

const propertyTypeSchema = new mongoose.Schema<PropertyType>(
  {
    propertyCategory: {
      type: Types.ObjectId,
      ref: "PropertyCategory",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Property type name is required"],
    },
    key: {
      type: String,
      required: [true, "Property type key is required"],
    },
  },
  {
    timestamps: true,
  }
);

propertyTypeSchema.pre("save", async function (next) {
  const propertyCategory = await PropertyCategory.findById(
    this.propertyCategory
  );

  this.key = propertyCategory?.category + `-${this.key}`;

  next();
});

const PropertyType = mongoose.model<PropertyType, PropertyTypeModelType>(
  "PropertyType",
  propertyTypeSchema
);

export default PropertyType;
