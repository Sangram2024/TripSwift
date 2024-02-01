import mongoose, { Schema, Document, Model } from "mongoose";


interface IRoom extends Document {
  roomName: string;
  description: string;
  numberOfRoomsAvailable: number;
  roomType: Schema.Types.ObjectId;
  roomOccupancy: Schema.Types.ObjectId;
  available: Schema.Types.ObjectId;
  baseprice: Schema.Types.ObjectId;
  roomView: string;
  // user: Types.ObjectId;
}


const RoomSchema: Schema<IRoom> = new Schema({
  roomName: { type: String, required: true },
  description: { type: String, required: true },
  numberOfRoomsAvailable: { type: Number, required: true },
  roomType: { type: Schema.Types.ObjectId, ref: "RoomType" },
  roomOccupancy: { type: Schema.Types.ObjectId, ref: "RoomOccupancy" },
  available: { type: Schema.Types.ObjectId, ref: "availability" },
  baseprice: { type: Schema.Types.ObjectId, ref: "BaseRoomPrice" },
  roomView: {
    type: String,
    enum: ["sea", "mountain", "city", "none"],
    default: "none",
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
},{timestamps:true});


const RoomModel: Model<IRoom> = mongoose.model<IRoom>("Room", RoomSchema);


export { IRoom, RoomModel };


