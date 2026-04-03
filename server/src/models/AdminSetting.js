import mongoose from "mongoose";

const adminSettingSchema = new mongoose.Schema(
  {
    categories: { type: String, default: "" },
    zones: { type: String, default: "" },
    adminName: { type: String, default: "Admin" },
    adminEmail: { type: String, default: "admin@ecoportal.com" },
    passwordHint: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("AdminSetting", adminSettingSchema);
