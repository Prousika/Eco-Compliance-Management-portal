import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing in environment");
  }
  await mongoose.connect(uri);
  // eslint-disable-next-line no-console
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
};
