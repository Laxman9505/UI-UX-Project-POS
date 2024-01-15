/** @format */

import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/authInterfaces";

// Define the User schema
const UserSchema: Schema = new Schema({
  FullName: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  ConfirmPassword: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  UserImage: {
    type: String,
  },
});

const userModel = mongoose.model<IUser>("Users", UserSchema);

export default userModel;
