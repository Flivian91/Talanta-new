import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: {
      fullName: { type: String, required: true },
      profileUrl: { type: String, required: true },
      userID: { type: String, required: true },
    },
    talentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
    text: { type: String, required: true, maxlength: 300 },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
