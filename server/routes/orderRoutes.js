import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

// GET USER ORDERS
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// ADMIN: ALL ORDERS
// ADMIN: ALL ORDERS
router.get("/", protect, isAdmin, async (req, res) => {
  const orders = await Order.find().populate("user", "email");
  res.json(orders);
});


router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      products: req.body.products,
      totalAmount: req.body.totalAmount,

      // 🔥 ADD THIS LINE
      paymentMethod: req.body.paymentMethod,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});
export default router;
