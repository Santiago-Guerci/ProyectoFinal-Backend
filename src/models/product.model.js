import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productModel = mongoose.model("product", productSchema);

export const Product = productModel;
