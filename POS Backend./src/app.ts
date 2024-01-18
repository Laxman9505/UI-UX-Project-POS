/** @format */

import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import InventoryModel from "./modal/inventoryModal";
import orderModel from "./modal/orderModal";
import authRouter from "./routes/auth";
import productRouter from "./routes/inventory";
import orderRouter from "./routes/order";
import { CustomError, IErrorResponse } from "./utils/error-handler";

dotenv.config();

// import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());
app.use(express.static("public"));
// Mount the authentication routes
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use("/getDashboardData", async (req: Request, res: Response) => {
  try {
    const recentProducts = await InventoryModel.find()
      .sort({ _id: -1 })
      .limit(5);
    const totalProductsInInventory = await InventoryModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const allOrders = await orderModel.find();

    let totalSales = 0;
    allOrders.forEach((order) => {
      const orderTotal = parseFloat(order.TotalAmount); // Convert to a floating-point number
      if (!isNaN(orderTotal)) {
        totalSales += orderTotal;
      }
    });

    res.status(200).json({
      recentlyAddedProducts: recentProducts,
      dashboardData: {
        totalOrders: totalOrders?.toString(),
        customers: "N/A",
        totalSales: totalSales.toFixed(2),
        totalProducts: totalProductsInInventory?.toString(),
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.use(
  (error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.serializeError());
    }
    next(error);
  }
);

// MongoDB Connection

const mongoURI = process.env.MONGO_URI || ""; // Replace 'mydatabase' with your actual database name
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
// app.use("/users", userRoutes);

export default app;
