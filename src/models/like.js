import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetID: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be a Talent or Comment
    targetType: { type: String, enum: ["Talent", "Comment"], required: true }, // Specifies what is being liked
  },
  { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default Like
