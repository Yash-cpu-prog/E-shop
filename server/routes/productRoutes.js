import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET SINGLE PRODUCT (🔥 IMPORTANT)
router.get("/:id", async (req, res) => {
  try {
    console.log("ID:", req.params.id);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ message: "Invalid ID" });
  }
});

// ✅ ADD PRODUCT
router.post("/", protect, isAdmin, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// ✅ UPDATE PRODUCT
router.put("/:id", protect, isAdmin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});

// ✅ DELETE PRODUCT
router.delete("/:id", protect, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;

