import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  socketId?: string; // Add this field
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    socketId: { type: String }, // Add this field
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
