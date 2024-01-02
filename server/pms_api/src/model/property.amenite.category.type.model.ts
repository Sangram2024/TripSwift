import mongoose, { Document, Schema, Types } from 'mongoose';
import {PropertyInfoType, PropertyInfo} from './property.info.model'
import {PropertyAmeniteCategoryType,PropertyAmeniteCategory} from './property.amenites.category.model'

interface AmeniteCategoryType extends Document {
    propertyInfo: Types.ObjectId | PropertyInfoType,
    ameniteCategory: Types.ObjectId | PropertyAmeniteCategoryType;
    category_type_amenite: String,
    category_type_amenite_code : String,
    amenite_type_options: [string],
    


}


const AmeniteCategoryTypeSchema = new Schema<AmeniteCategoryType>({
    propertyInfo: { type: Schema.Types.ObjectId, ref: 'PropertyInfo', required: true },
    ameniteCategory: { type: Schema.Types.ObjectId, ref: 'PropertyAmeniteCategory', required: true },
    category_type_amenite: { type: String, required: true },
    category_type_amenite_code: { type: String, required: true },
    amenite_type_options: [
        {
          type: { type: String, enum: ['DROPDOWN', 'MULTI_SELECT', 'NONE'] },
          values: [{ type: String }]
        }
      ]

    
});


const AmeniteCategoryType = mongoose.model<AmeniteCategoryType>('AmeniteCategoryType', AmeniteCategoryTypeSchema);

export  {AmeniteCategoryTypeSchema,AmeniteCategoryType};