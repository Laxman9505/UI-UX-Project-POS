/** @format */

import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from "http-status-codes";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { IUser } from "../interfaces/authInterfaces";
import OtpModel from "../modal/otpModal";
import userModel from "../modal/userModal";
import transporter from "../utils/transporter";
// Send OTP code to user's email during registration
export async function sendOtpCodeToEmailOnBoarding(
  req: Request,
  res: Response
) {
  const { Email } = req.body;

  try {
    // Generate a random 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP code to the user's email
    await transporter.sendMail({
      from: process.env.GOOGLE_USER_ID,
      to: Email,
      subject: "Registration OTP",
      html: `<!DOCTYPE html>
<html>
<head>
  <title>OTP Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    h1 {
      color: #333;
      margin-top: 0;
    }
    p {
      margin-bottom: 20px;
    }
    .otp {
      background-color: #007bff;
      color: #fff;
      padding: 10px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      border-radius: 5px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>POS System</h1>
    <p>Dear User,</p>
    <p>Your One-Time Password (OTP) for registration is:</p>
    <div class="otp">${otpCode}</div>
    <p>Please enter this OTP to complete your registration process.</p>
    <div class="footer">
      <p>Thank you!</p>
    </div>
  </div>
</body>
</html>
`,
    });

    // Save the OTP in the database
    const otpData = {
      email: Email,
      otp: otpCode,
      createdAt: new Date(),
    };

    await OtpModel.create(otpData);

    // Return a success response
    return res.status(200).json({ message: "OTP code sent successfully" });
  } catch (error) {
    console.error("Failed to send OTP code:", error);
    return res.status(500).json({ message: "Something Went Wrong !" });
  }
}

// Onboard a user
export async function onBoardUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Validate the request body

  console.log("Request body", req.body.Request);
  console.log("file", req.file);

  const userData: IUser = JSON.parse(req.body.Request);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Retrieve the OTP data from the database
    // const otpData = await OtpModel.findOne({ email: userData.Email });
    // Validate the OTP code (compare with the user-provided OTP code)
    // && otpData.otp == userData.OTP
    if (true) {
      // Create a new user document
      const user = new userModel({
        FullName: userData.FullName,
        Password: await bcrypt.hash(userData.Password, 10),
        Email: userData.Email,
        ConfirmPassword: await bcrypt.hash(userData.ConfirmPassword, 10),
        PhoneNumber: userData.PhoneNumber,
        CountryId: userData.CountryId,
        CityId: userData.CityId,
        UserImage: req.file.filename,
      });

      // Save the user to the database
      await user.save();

      // Returning json web token

      const payload = {
        userId: user._id,
        fullName: user.FullName,
        email: user.Email,
      };

      const token = jwt.sign(payload, process.env.SIGNATURE || "", {
        expiresIn: "1d",
      });

      // await OtpModel.findByIdAndDelete(otpData._id);

      // Return a success response
      return res.status(HTTP_STATUS.CREATED).json({ token, user });
    } else {
    }
  } catch (error) {
    // throw new Error("Something Went Wrong !!");
    console.log("error", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  const { Email, Password } = req.body;
  const foundUser = await userModel.findOne({ Email });
  if (!foundUser) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: "Inavalid Credentials !",
      statusCode: HTTP_STATUS.BAD_REQUEST,
    });
  }
  const isValidPassword = await bcrypt.compare(Password, foundUser.Password);
  if (!isValidPassword) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "error",
      message: "Inavalid Credentials !",
      statusCode: HTTP_STATUS.BAD_REQUEST,
    });
  }

  const payload = {
    userId: foundUser._id,
    fullName: foundUser.FullName,
    email: foundUser.Email,
  };
  const token = jwt.sign(payload, process.env.SIGNATURE || "", {
    expiresIn: "1d",
  });
  const trimmedUser = _.omit(foundUser, [
    "_v",
    "_id",
    "Password",
    "ConfirmPassword",
  ]);
  console.log("trimmed user", trimmedUser);
  return res.status(HTTP_STATUS.OK).json({ token, user: trimmedUser });
}
