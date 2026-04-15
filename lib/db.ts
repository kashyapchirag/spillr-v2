import mongoose from "mongoose";

export const dbConnecttion = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/spillr-nextJS");
    console.log("mongodb connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
