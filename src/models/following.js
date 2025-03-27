import mongoose from "mongoose";

const FollowingSchema = new mongoose.Schema(
  {
    followerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Follow =
  mongoose.models.Following || mongoose.model("Following", FollowingSchema);
export default Follow;
