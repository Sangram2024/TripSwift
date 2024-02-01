import mongoose, { Schema, Document } from "mongoose";


interface IRoomType extends Document {
  bedType: "Single" | "Double" | "classic";
  roomSize: string;
}


const RoomTypeSchema: Schema = new Schema(
  {
    bedType: {
      type: String,
      enum: ["Single", "Double", "classic"],
      required: true,
    },
    roomSize: {
      type: String,
      required: true,
    },
  }
);


const RoomType = mongoose.model<IRoomType>("RoomType", RoomTypeSchema);
export default RoomType;


