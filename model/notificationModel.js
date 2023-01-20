import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    reciever:[ { type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;