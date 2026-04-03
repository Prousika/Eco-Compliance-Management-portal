import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["resolved", "campaign", "broadcast"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
