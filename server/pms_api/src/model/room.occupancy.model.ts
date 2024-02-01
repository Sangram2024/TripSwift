import mongoose, { Schema, Document, Types } from "mongoose";
interface RoomOccupancy extends Document {
    Adult: boolean;
    desc: string;
    MaximumAdult: number;
    MaximumChildren: number;
    MaximumOccupancy: number;
    // user: Types.ObjectId;
}

const RoomOccupancySchema: Schema = new Schema({
    Adult: {
        type: Boolean,
        required: true,
        default: true,
    },
    desc: {
        type: String,
        required: true,
    },
    MaximumAdult: {
        type: Number,
        required: true,
    },
    MaximumChildren: {
        type: Number,
        required: true,
    },
    MaximumOccupancy: {
        type: Number,
        required: true,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
});


const RoomOccupancy = mongoose.model<RoomOccupancy>('RoomOccupancy', RoomOccupancySchema);
export default RoomOccupancy;
