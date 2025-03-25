import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    cleckID: { type: String, required: true}, //Make the CleckID Unique
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

const Preference =
  mongoose.models.Preference || mongoose.model("Preference", PreferenceSchema);
export default Preference;
