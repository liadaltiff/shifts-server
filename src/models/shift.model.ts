import { Document, Schema, model } from "mongoose";

export interface IShift extends Document {
  _id: String;
  fullName: String;
  role: String;
  password: String;
}

const user: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model<IShift>("Shift", shift);
