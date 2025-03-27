import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    recipientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Who receives the notification
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Who triggered the notification
    type: {
      type: String,
      enum: ["like", "comment", "follow", "share"],
      required: true,
    }, // Type of notification
    message: { type: String, required: true }, // Notification message
    relatedID: { type: mongoose.Schema.Types.ObjectId, refPath: "type" }, // Related document (Talent, Comment, etc.)
    read: { type: Boolean, default: false }, // Read status
  },
  { timestamps: true }
);

const Notification =  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
  export default Notification
