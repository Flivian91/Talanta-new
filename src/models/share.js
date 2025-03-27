import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who shared
    talentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talent",
      required: true,
    }, // Original talent
    caption: { type: String, maxlength: 300 }, // Optional message
  },
  { timestamps: true }
);

const Share = mongoose.models.Share || mongoose.model("Share", ShareSchema);
export default Share;
