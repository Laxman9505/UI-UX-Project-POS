/** @format */

import express, { Router } from "express";
import {
  changeOrderStatus,
  getAllOrders,
  placeOrder,
} from "../contollers/orderController";

const router: Router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/getAllOrders", getAllOrders);
router.post("/changeOrderStatus", changeOrderStatus);

export default router;
