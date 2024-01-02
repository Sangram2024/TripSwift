import mongoose, { Document, Schema, Types } from 'mongoose';
import {PropertyInfoType, PropertyInfo} from './property.info.model'

interface PropertyAmeniteCategoryType extends Document {
    propertyInfo: Types.ObjectId | PropertyInfoType;
    amenite_type: String,
    amenite_type_code : String,
    is_amenite_type: Boolean,

}


const propertyAmeniteCategorySchema = new Schema<PropertyAmeniteCategoryType>({
    propertyInfo: { type: Schema.Types.ObjectId, ref: 'PropertyInfo', required: true },
    amenite_type: { type: String, required: true },
    amenite_type_code: { type: String, required: true },
    is_amenite_type: { type: Boolean, required: true },
    
});


const PropertyAmeniteCategory = mongoose.model<PropertyAmeniteCategoryType>('PropertyAmeniteCategory', propertyAmeniteCategorySchema);

export  {PropertyAmeniteCategory,PropertyAmeniteCategoryType};