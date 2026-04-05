import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    disabled: { type: Boolean, default: false },
    volunteer: { type: Boolean, default: false },
    phoneOtpCode: { type: String, default: "", select: false },
    phoneOtpExpiresAt: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
