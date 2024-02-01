import mongoose, { Schema, Document, Types } from "mongoose";




interface BaseRoomPrice extends Document {
  BasePrice: number;
  PerAdult: number;
  PerChild: number;
 // user: Types.ObjectId;
}




const BaseRoomPriceSchema: Schema = new Schema({
  BasePrice: {
    type: Number,
    required: true,
  },
  PerAdult: {
    type: Number,
    required: true,
  },
  PerChild: {
    type: Number,
    required: true,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});




const BaseRoomPrice = mongoose.model<BaseRoomPrice>(
  "BaseRoomPrice",
  BaseRoomPriceSchema
);
export default BaseRoomPrice;
