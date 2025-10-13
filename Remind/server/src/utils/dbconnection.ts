import mongoose from "mongoose";
export const dbconnect = async (): Promise<void> => {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) {
    console.warn("MONGO_URL is not set in environment");
    return;
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};



