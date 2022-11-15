import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chat", chatSchema);

export const Chat = chatModel;
