import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then(console.log("Conectado a la base Mongo"));
};

export default mongoConnection;
