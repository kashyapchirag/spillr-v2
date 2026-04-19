import mongoose from "mongoose";

export const dbConnecttion = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("mongodb connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
