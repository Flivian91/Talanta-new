import mongoose from "mongoose";

const FollowingSchema = new mongoose.Schema(
  {
    followerID: {
      type: String,
      required: true,
    },
    followingID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Follow =
  mongoose.models.Following || mongoose.model("Following", FollowingSchema);
export default Follow;
