import mongoose from "mongoose";

const TalentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    categories: [String], // Max 3 categories
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clerkID: { type: String, required:true },
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    approved: { type: Boolean, default: false }, // Admin approval
  },
  { timestamps: true }
);
const Talent = mongoose.models.Talent || mongoose.model("Talent", TalentSchema);

export default Talent;
