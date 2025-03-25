import mongoose from "mongoose";

const UnLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    talentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Like || mongoose.model("Like", UnLikeSchema);
