import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    receiverID: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
      required: true,
    }, // Who triggered the notification
    type: {
      type: String,
      enum: ["like", "comment", "follow", "share"],
      required: true,
    }, // Type of notification
    message: { type: String, required: true }, // Notification message
    read: { type: Boolean, default: false }, // Read status
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
export default Notification;
