import mongoose, { Document, Schema, Types } from 'mongoose';
import {PropertyInfoType, PropertyInfo} from './property.info.model'
import {AmeniteCategoryType,AmeniteCategoryTypeSchema} from './property.amenite.category.type.model'

interface AmeniteCategoryOptionType extends Document {
    propertyInfo: Types.ObjectId | PropertyInfoType,
    ameniteCategoryType: Types.ObjectId | AmeniteCategoryType,
    amenite_type_options: [string],
    


}


const AmeniteCategoryOptionSchema = new Schema<AmeniteCategoryOptionType>({
    propertyInfo: { type: Schema.Types.ObjectId, ref: 'PropertyInfo', required: true },
    ameniteCategoryType: { type: Schema.Types.ObjectId, ref: 'AmeniteCategoryType', required: true },
    amenite_type_options: [
        {
          type: { type: String,},
          values: [{ type: String }]
        }
      ]

    
});


const AmeniteCategoryOptions = mongoose.model<AmeniteCategoryType>('AmeniteCategoryOption', AmeniteCategoryOptionSchema);

export  {AmeniteCategoryOptions,AmeniteCategoryOptionType};