import mongoose from "mongoose";

const TalentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String }, // ✅ was broken here due to stray comma + object
    categories: [String], // Max 3 categories
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    userInfo: {
      userID: { type: String, required: true },
      userName: { type: String, required: true }, // ✅ fixed typo `typr` → `type`
      role: { type: String, required: true },
      userProfileUrl: { type: String },
    },
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    approved: { type: Boolean, default: false }, // Admin approval
  },
  { timestamps: true }
);

const Talent = mongoose.models.Talent || mongoose.model("Talent", TalentSchema);

export default Talent;
