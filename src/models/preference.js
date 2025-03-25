import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    // User preferences
    language: { type: String, enum: ["en", "sw", "fr"], default: "en" }, // Default language
    darkMode: { type: Boolean, default: false }, // UI preference
    categories: [{ type: String }], // Preferred talent categories (e.g., Music, Sports)

    // Notification settings
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },

    // Privacy settings
    allowMessages: { type: Boolean, default: true }, // Can other users message them?
    showProfilePublic: { type: Boolean, default: true }, // Is profile public?

  },
  { timestamps: true }
);

export default mongoose.models.Preference || mongoose.model("Preference", PreferenceSchema);
