import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: String, required: true },
  phone: { type: String, required: true },
  imageUrl: { type: String, required: true },
  role: { type: String, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, required: true },
  // cartId: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);

export const User = userModel;
