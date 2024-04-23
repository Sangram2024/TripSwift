import mongoose, { Schema, Document, } from "mongoose";

interface availability extends Document {
  startDate: Date;
  endDate: Date;
  room: Schema.Types.ObjectId;
}

const availabilitySchema: Schema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

const availabilityModel = mongoose.model<availability>(
  "availability",
  availabilitySchema
);

export { availability, availabilityModel };
