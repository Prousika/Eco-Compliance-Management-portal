import mongoose from "mongoose";

const awarenessContentSchema = new mongoose.Schema(
  {
    tips: { type: String, default: "" },
    policies: { type: String, default: "" },
    announcement: { type: String, default: "" },
    complianceFormula: { type: String, default: "(Resolved Issues / Total Issues) x 100" },
  },
  { timestamps: true }
);

export default mongoose.model("AwarenessContent", awarenessContentSchema);
