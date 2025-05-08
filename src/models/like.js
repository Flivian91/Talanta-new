import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    talentID: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  },
  { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default Like;
