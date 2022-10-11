import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  products: { type: Array, required: true },
});

const cartModel = mongoose.model("cart", cartSchema);

export const Cart = cartModel;
