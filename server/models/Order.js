import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    products: Array,

    totalAmount: Number,

    status: {
      type: String,
      default: "pending",
    },

    // 🔥 ADD THIS
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      default: "COD",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
