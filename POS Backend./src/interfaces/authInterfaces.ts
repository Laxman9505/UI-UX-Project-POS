/** @format */
import { Document } from "mongoose";

export interface IUser extends Document {
  OTP?: string;
  FullName: string;
  Password: string;
  Email: string;
  ConfirmPassword: string;
  PhoneNumber: string;
  CountryId: string;
  CityId: string;
  UserImage?: string;
}

// Interface for the OTP document
export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}
