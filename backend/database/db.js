import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default connectDB;
