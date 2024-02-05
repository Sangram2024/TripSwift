import mongoose, { Schema, Document ,Types} from "mongoose";


interface IRoomType extends Document {
  bedType: "Single" | "Double" | "classic";
  roomSize: string;
  user: Types.ObjectId;
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
);


const RoomType = mongoose.model<IRoomType>("RoomType", RoomTypeSchema);
export { RoomType};


