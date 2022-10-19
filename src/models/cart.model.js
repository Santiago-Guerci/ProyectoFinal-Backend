import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  { products: { type: Array, required: true } },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

export const Cart = cartModel;
