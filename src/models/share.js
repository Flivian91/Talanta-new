import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    talentId: { type: mongoose.Schema.Types.ObjectId, ref: "Talent", required: true },
    platform: { type: String, enum: ["facebook", "twitter", "instagram", "whatsapp"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Share || mongoose.model("Share", ShareSchema);
