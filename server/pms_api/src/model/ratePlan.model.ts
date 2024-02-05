import mongoose, { Schema, Document, Types } from "mongoose";

interface Rateplan extends Document {
  Barplan: number;
  standardplan: number;
  Breakfastplan: number;
  NonRefundable: boolean;
 user: Types.ObjectId;
}

const RateplanSchema: Schema = new Schema({
  Barplan: {
    type: Number,
    required: true,
    // validate: {
    //   validator: function (value: number) {
    //     return value !== 0;
    //   },
    //   message: "Barplan price must be non-zero",
    // },
  },
  standardplan: {
    type: Number,
    required: true,
    // validate: {
    //   validator: function (value: number) {
    //     return value !== 0;
    //   },
    //   message: "Standardplan price must be non-zero",
    // },
  },
  Breakfastplan: {
    type: Number,
    required: true,
    // validate: {
    //   validator: function (value: number) {
    //     return value !== 0;
    //   },
    //   message: "Breakfastplan price must be non-zero",
    // },
  },
  NonRefundable: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


const RateplanModel = mongoose.model<Rateplan>("Rateplan", RateplanSchema);
export { RateplanModel };